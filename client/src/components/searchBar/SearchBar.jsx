import React, { useState } from "react";

export default function SearchBar(props) {
  const [name, setName] = useState(''); 

  const handleChange = (evento) => {
    const inputValue = evento.target.value;
    // Validar el valor del input utilizando una expresión regular
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      setName(inputValue);
      props.onSearch(inputValue);
    }
  }
  return (
    <div className="searchBar">
      <input type="text" onChange={handleChange} placeholder="Ingrese el nombre del pais" value={name} />
    </div>
  );
}
