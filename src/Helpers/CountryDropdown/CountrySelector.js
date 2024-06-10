import React, { Component, useEffect, useState } from "react";
import Select, { components } from "react-select";
import countryList from "react-select-country-list";

export function CountryFlag(props) {
  return (
    <span
      className={"flag-icon flag-icon-" + props.code}
      style={{ fontSize: props.size || "40px" }}
    />
  );
}

export const CountryFlagSelectOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CountryFlag size={props.flagSize} code={props.value.toLowerCase()} />
        <div style={{ paddingLeft: "10px", fontSize: "20px" }}>
          {props.label}
        </div>
      </div>
    </components.Option>
  );
};

export const CountryFlagValueContainer = ({ children, ...props }) => {
  const code = (props.hasValue && props.getValue()[0].value) || false;

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      {(code && <CountryFlag code={code.toLowerCase()} />) || null}
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    </div>
  );
};

const customStyles = {
  valueContainer: (base, state) => ({
    ...base
  })
  // option: () => ({ maxHeight: "100%" })
};

export default function CountrySelector(props) {
  const [country, setCountry] = useState({
    options: countryList().getData(),
    value: null
  });
  const changeHandler = (value) => {
    setCountry({ value });
  };

  return (
    <Select
      styles={customStyles}
      options={countryList().getData()}
      value={country.value}
      onChange={changeHandler}
      components={{
        Option: CountryFlagSelectOption,
        ValueContainer: CountryFlagValueContainer
      }}
    />
  );
}
