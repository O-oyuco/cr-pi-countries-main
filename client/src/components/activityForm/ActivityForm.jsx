import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ActivityForm.css"
import { useDispatch } from 'react-redux'; 
import { validateName, validateDifficulty, validateDuration, validateSeason, validateActivityType } from './ValidationForm.js';
import {URL_ACTIVITIES, URL_COUNTRIES} from '../../URL.js';
import { activitiesSuccess } from '../../ridux/actions'; 


const CreateActivityForm = ({ onCloseModal }) => {

const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    difficult: '',
    duration: '',
    season: '',
    activityType: '',
    countries: {},
    newCountry: '',
    imageUrl: '', 
  });

  const [errors, setErrors] = useState({
    name: '',
    difficult: '',
    duration: '',
    season: '',
    activityType: '',
  });

  const [formValid, setFormValid] = useState(false);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(URL_COUNTRIES);
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
    const isActivityTypeValid = formData.activityType.trim() !== ''; // Validación para el nuevo campo
    const isFormValid = isValid && isFilled && isCountryFilled && isImageUrlValid && isActivityTypeValid;
    setFormValid(isFormValid);
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
      activityType: validateActivityType(formData.activityType), 
    };

    setErrors(formErrors);

    if (Object.values(formErrors).some(err => err !== '')) {
      return;
    }

    try {
      const { name, difficult, duration, season, countries, imageUrl, activityType } = formData; 
      await axios.post(URL_ACTIVITIES, { name, difficult, duration, season, activityType, countries: Object.keys(countries), imageUrl });

      const response = await axios.get(URL_ACTIVITIES); 
      dispatch(activitiesSuccess(response.data)); 

      alert('Actividad turística creada exitosamente');
      setFormData({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        activityType: '', 
        countries: {},
        newCountry: '',
        imageUrl: '', 
      });
      setErrors({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        activityType: '', 
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
  <div className="form-column">
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
    <label>
      URL de la imagen:
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
      />
    </label>
    {imagePreview && (
    <div className="form-column">
      <img src={imagePreview} alt="Preview" />
    </div>
  )}
  </div>
  <div className="form-column">
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
    <label>
      Tipo de Actividad: 
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
      <ul>
        {Object.keys(formData.countries).map((country, index) => (
          <li key={index}>
            {country}{' '}
            <button type="button" onClick={() => removeCountry(country)}>x</button>
          </li>
        ))}
      </ul>
    </label>
  </div>

  <div className="form-column">
    <button type="submit" disabled={!Object.keys(formData.countries).length }>Crear Actividad Turística</button>
  </div>
</form>

  );
};
 
export default CreateActivityForm;
