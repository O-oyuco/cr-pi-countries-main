import React from "react";
import CardCountries from '../card/Card';

export default function Cards(props) {
  const { countries } = props;

  return (
    <div className="cards-container">
      {countries.map((countries) => (
        <CardCountries
          key={countries.id}
          id={countries.id}
          name={countries.name}
          image={countries.image}
          continent={countries.continent}
        />
      ))}
    </div>
  );
}