import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ActivityForm.css"
import { validateName, validateDifficulty, validateDuration, validateSeason, validateActivityType } from './ValidationForm.js';

const CreateActivityForm = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    difficult: '',
    duration: '',
    season: '',
    activityType: '', // Nuevo campo para almacenar el tipo de actividad seleccionado
    countries: {},
    newCountry: '',
    imageUrl: '', 
  });

  const [errors, setErrors] = useState({
    name: '',
    difficult: '',
    duration: '',
    season: '',
    activityType: '', // Agregar validación para el nuevo campo
  });

  const [formValid, setFormValid] = useState(false);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // Estado para almacenar la vista previa de la imagen

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:3001/countries");
        setAvailableCountries(response.data.map(country => country.name.toLowerCase()));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const isValid = Object.values(errors).every(error => error === '');
    const isFilled = Object.values(formData).every(value => value !== '');
    const isCountryFilled = Object.keys(formData.countries).length > 0;
    const isImageUrlValid = formData.imageUrl.trim() !== '';
    setFormValid(isValid && isFilled && isCountryFilled && isImageUrlValid);
  }, [formData, errors]);

  useEffect(() => {
    if (formData.imageUrl) {
      setImagePreview(formData.imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [formData.imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, newCountry: value });
  };

  const addCountry = async () => {
    const { newCountry, countries } = formData;
    const lowercaseCountry = newCountry.toLowerCase();
    const capitalizedCountry = lowercaseCountry.charAt(0).toUpperCase() + lowercaseCountry.slice(1); 
    if (newCountry.trim() !== '' && !countries[capitalizedCountry]) {
      if (availableCountries.includes(lowercaseCountry)) {
        setFormData({ ...formData, countries: { ...countries, [capitalizedCountry]: true }, newCountry: '' });
      } else {
        alert("El país que intenta ingresar no existe.");
        setFormData({ ...formData, newCountry: '' });
      }
    }
  };

  const removeCountry = (country) => {
    const { countries } = formData;
    const updatedCountries = { ...countries };
    delete updatedCountries[country];
    setFormData({ ...formData, countries: updatedCountries });
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        setErrors({ ...errors, name: validateName(value) });
        break;
      case 'difficult':
        setErrors({ ...errors, difficult: validateDifficulty(value) });
        break;
      case 'duration':
        setErrors({ ...errors, duration: validateDuration(value) });
        break;
      case 'season':
        setErrors({ ...errors, season: validateSeason(value) });
        break;
      case 'activityType': // Agregar validación para el nuevo campo
        setErrors({ ...errors, activityType: validateActivityType(value) });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {
      name: validateName(formData.name),
      difficult: validateDifficulty(formData.difficult),
      duration: validateDuration(formData.duration),
      season: validateSeason(formData.season),
      activityType: validateActivityType(formData.activityType), // Validar el nuevo campo
    };

    setErrors(formErrors);

    if (Object.values(formErrors).some(err => err !== '')) {
      return;
    }

    try {
      const { name, difficult, duration, season, countries, imageUrl, activityType } = formData; // Añadimos activityType
      await axios.post('http://localhost:3001/activities', { name, difficult, duration, season, activityType, countries: Object.keys(countries), imageUrl }); // Pasamos activityType al cuerpo de la solicitud
      alert('Actividad turística creada exitosamente');
      setFormData({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        activityType: '', // Reiniciamos activityType después de enviar la solicitud
        countries: {},
        newCountry: '',
        imageUrl: '', // Reiniciamos imageUrl después de enviar la solicitud
      });
      setErrors({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        activityType: '', // Reiniciamos activityType después de enviar la solicitud
      });
      onCloseModal();
    } catch (error) {
      alert(`Error al crear la actividad turística: ${error.message}`);
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCountry();
    }
  };
  
  return (
    <form className="create-activity-form" onSubmit={handleSubmit}>
      <div>
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
      </div>
      <label>
        Tipo de Actividad: {/* Nuevo selector desplegable */}
        <select name="activityType" value={formData.activityType} onChange={handleChange} >
          <option value="">Seleccione un tipo de actividad</option>
          <option value="Aventura">Aventura</option>
          <option value="Medico">Medico</option>
          <option value="Artístico">Artístico</option>
          <option value="Gastronómico">Gastronómico</option>
          <option value="Religioso">Religioso</option>
          <option value="Negocio">Negocio</option>
          <option value="Rural">Rural</option>
          <option value="Lujo">Lujo</option>
        </select>
        <div className="error">{errors.activityType}</div>
      </label>
      <br/>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.name}</div>
      </label>
      <br />
      <label>
        Dificultad:
        <input
          type="text"
          name="difficult"
          value={formData.difficult}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.difficult}</div>
      </label>
      <br />
      <label>
        Duración:
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.duration}</div>
      </label>
      <br />
      <label>
        Temporada:
        <select name="season" value={formData.season} onChange={handleChange} required>
          <option value="">Seleccione una temporada</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
        </select>
        <div className="error">{errors.season}</div>
      </label>
      <br />
      <label>
        URL de la imagen:
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Países:
        <input
          type="text"
          name="countries"
          value={formData.newCountry}
          onChange={handleCountryChange}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={addCountry}>Agregar País</button>
      </label>
      <br />
      {Object.keys(formData.countries).map((country, index) => (
        <span key={index}>
          {country}{' '}
          <button type="button" onClick={() => removeCountry(country)}>Eliminar</button>
          {index < Object.keys(formData.countries).length - 1 && ', '}
        </span>
      ))}
      <br />
      <button type="submit" disabled={!Object.keys(formData.countries).length }>Crear Actividad Turística</button>
    </form>
  );
};

export default CreateActivityForm;
