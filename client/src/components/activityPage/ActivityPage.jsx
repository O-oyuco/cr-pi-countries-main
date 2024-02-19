import React from 'react';
import CreateActivityForm from '../activityForm/ActivityForm';

const ActivityPage = () => {
  const handleCreateActivity = (activityData) => {
    // Lógica para enviar los datos del formulario al servidor
    console.log('Actividad creada:', activityData);
  };

  return (
    <div>
      <h1>FORM PAGE</h1>
      <h2>Crear Actividad Turística</h2>
      <CreateActivityForm onCreateActivity={handleCreateActivity} />
    </div>
  );
};

export default ActivityPage;
