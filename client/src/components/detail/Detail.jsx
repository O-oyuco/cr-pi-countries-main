import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';
import { Link } from 'react-router-dom';
import { URL_COUNTRIES } from '../../URL';
import CreateActivityForm from "../activityForm/ActivityForm";

export default function Detail() {
  
  const { id } = useParams();
  const [countries, setCountries] = useState({});
  const [activities, setActivities] = useState ([]);
  const [openStreetMapsUrl, setOpenStreetMapsUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(false); 
  const [modalFormOpen, setModalFormOpen] = useState(false); 
  const modalRef = useRef(null);

  const generateOpenStreetMapsUrl = (latitude, longitude) => {
    const bbox = `${longitude - 10},${latitude - 10},${longitude + 10},${latitude + 10}`; 
    const openStreetMapsUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
    setOpenStreetMapsUrl(openStreetMapsUrl);
  };

  useEffect(() => {
    axios(`${URL_COUNTRIES}/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCountries(data);
          if (data.Activities){
            setActivities(data.Activities)
          }
          if (data.maps) {
            generateOpenStreetMapsUrl(data.maps[0], data.maps[1]);
          }
        } else {
          window.alert('No se ha encontrado país con ese ID');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del país:', error);
      });
  }, [id]);

  const openModal = () => {
    setModalOpen(true);
  };

  const openFormModal = () => {
    setModalFormOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeFormModal = () => {
    setModalFormOpen(false);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
        setModalFormOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div> 
      <div>
        <Link to="/home" className='fas fa-arrow-left'></Link>
      </div>
      <div className= 'Detail-2' >
        <img className= 'bandera'src={countries.image} alt={countries.name} />
        <img className= 'escudo' src={countries.escudo} alt={countries.name} />
        {openStreetMapsUrl && (
          <div>
            <iframe className='Mapa'
              width="600"
              height="450"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              title="Map"
              src={openStreetMapsUrl}
            />
          </div>
        )}
        <button className= 'modalActi' onClick={openModal} ><i className="fas fa-eye" aria-hidden="true"></i></button>
        <button className= 'modalActi2' onClick={openFormModal} ><i className ="fas fa-file" aria-hidden="true" > </i></button>
        {modalOpen && (
          <div className="modal-detail">
            <span className="closeA" onClick={closeModal}>&times;</span>
            <h2>Actividades en este país</h2>
            <div className="modal-content-detail" ref={modalRef}>
              {activities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-item-content">
                    <h3>{activity.name}</h3>
                    <img className= 'imageAct'src={activity.imageUrl} alt={activity.imageUrl} />
                    <p>Dificultad: {activity.difficult}</p>
                    <p>Duracion: {activity.duration}</p>
                    <p>Temporada: {activity.season}</p>
                    <p>Tipo: {activity.activityType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {modalFormOpen && (
          <div className="modal-detail">
            <span className="closeA" onClick={closeFormModal}>&times;</span>
            <h2>Agregar Actividad</h2>
            
            <div className="modal-content-detail" ref={modalRef}>
              <CreateActivityForm onCloseModal={handleCloseModal}/>
            </div>
          </div>
        )}
      </div>
      <div className='Detail-1'>
        <h1 className='titulo'>{countries.name}</h1>
        <div className="detail-container-card">
          <div className="detail-card-card3">
            {countries.id && <p>CCA3: <span>{countries.id}</span></p>}
            {countries.continent && <p>Continente: <span>{countries.continent}</span></p>}
            {countries.capital && <p>Capital: <span>{countries.capital}</span></p>}
            {countries.subregion && <p>Subcontinente: <span> {countries.subregion}</span></p>}
            {countries.poblacion && (<p>Población: <span> {countries.poblacion} Habitantes</span></p>)}
            {countries.area && (<p>Área: <span>{countries.area} km<sup>2</sup></span></p>)}
          </div>
        </div>
        <div className="detail-container-information">
          {countries.nameO && (<p>Nombre Oficial: <span>{countries.nameO}</span></p>)}
          {countries.languages && (<p> Idioma: <span>{countries.languages}</span> </p>)}
          {countries.timezones && (<p>Zona horaria: <span>{countries.timezones } </span> </p>)}
          {countries.currencies && (
            <div>
              <p> Monedas:  
                {countries.currencies.map((currency, index) => (<span key={index}> {currency.name} ({currency.code}) - {currency.symbol} </span>
                ))}
              </p>
            </div>
          )}
          {countries.idd && (
            <div>
              <p> Identificadores telefónicos:
                {countries.idd.map((idd, index) => (
                  <span key={index}>
                    {idd.root} ({idd.suffixes.join(', ')})
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
      <div
        className="detail-card-background"
        style={{ backgroundImage: `url(${countries.image})` }}
      />
    </div>
  );
}
