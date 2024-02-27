  
  
  export const validateName = (name) => {
    if (!name) return 'El nombre es requerido';
    if (!/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(name)) return 'El nombre debe tener formato de título, es decir primera letra en mayuscula seguido de alguna minuscula.';
    return '';
  };
  
  export const validateDifficulty = (difficulty) => {
    if (!difficulty) return 'La dificultad es requerida';
    if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) return 'La dificultad debe ser un número entre 1 y 5.';
    return '';
  };
  
  export const validateDuration = (duration) => {
    if (!duration) return 'La duración es requerida';
    if (isNaN(duration)) return 'La duración debe ser un número'; 
    if (duration <= 0 || duration > 24) return 'La duración debe ser un número mayor que 0 y máximo 24 horas.'; 
    return '';
  };
  
  export const validateSeason = (season) => {
    if (!season) return 'La temporada es requerida, porfavor seleccione alguna.';
    return '';
  };
  export const validateActivityType = (activityType) => {
    if (!activityType) return 'El tipo es requerida';
    return '';
  };