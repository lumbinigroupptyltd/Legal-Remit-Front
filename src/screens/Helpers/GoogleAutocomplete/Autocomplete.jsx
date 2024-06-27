import React, { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const Autocomplete = () => {
    const inputRef = useRef();

    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 

        } 
    }

    return (
        <LoadScript googleMapsApiKey='AIzaSyDQ2c_pOSOFYSjxGMwkFvCVWKjYOM9siow' libraries={["places"]}>
                <StandaloneSearchBox
                    onLoad={ref => inputRef.current = ref}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Location"
                    />
                </StandaloneSearchBox>
        </LoadScript>
    );
};

export default Autocomplete;