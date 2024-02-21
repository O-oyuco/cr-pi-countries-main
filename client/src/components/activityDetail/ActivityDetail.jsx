import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_ACTIVITIES } from '../../URL';
// import './Detail.css';

export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState({});

  useEffect(() => {
    axios(`${URL_ACTIVITIES}/${id}`)
      .then(({ data }) => {
        if (data.name) {
        setActivity(data);
        } else {
          window.alert('No se ha encontrado país con ese ID');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del país:', error);
      });
  }, [id]);


  return (
    <div>
      <div className='detail-container-card'>
        <div className='detail-card-card'>
          <h1>{activity.name}</h1>
          <img src={activity.imageUrl} alt={activity.name} />
          {activity.id && <p>ID: {activity.id}</p>}
          {activity.name && <p>Nombre: {activity.name}</p>}
          {activity.difficult && <p>Dificultad: {activity.difficult}</p>}
          {activity.duration && <p>Duracion: {activity.duration}</p>}
          {activity.season && <p>Temporada: {activity.season} </p>}
          {activity.activityType && <p>Tipo de Actividad: {activity.activityType} </p>}
          
        </div>
      </div>
    </div>
  );
}
