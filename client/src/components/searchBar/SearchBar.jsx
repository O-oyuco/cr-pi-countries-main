import React, { useState } from "react";

export default function SearchBar(props) {
  const [name, setName] = useState(''); 

  const handleChange = (evento) => {
    const inputValue = evento.target.value;
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      setName(inputValue);
      props.onSearch(inputValue);
    } else {
      setName('');
    }
  };

  return (
    <div className="searchBar">
      <input type="text" onChange={handleChange} placeholder="Ingrese el nombre del país" value={name} />
    </div>
  );
}
