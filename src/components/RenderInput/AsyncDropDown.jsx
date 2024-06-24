import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { axiosInstance } from "../../utils/axiosIntercepters";

export const AsyncDropDown = ({ element, formik, formValues }) => {
  const theme = useTheme();
  const [asyncOptions, setAsyncOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(element?.path);
        const data = response?.data?.data;
        const options = data?.map((item) => ({
          label: item[element.responseLabel],
          value: item[element.responseId],
          code: item[element.responseCode],
          image: `https://flagcdn.com/16x12/${item.iso2.toLowerCase()}.png`,
        }));
        setAsyncOptions(options);
      } catch (error) {
        console.error("Error fetching async dropdown options:", error);
      }
    };

    if (element.type === "asyncDropDown") {
      fetchData();
    }
  }, [element.path, element.type]);

  return (
    <Autocomplete
      id={element.name}
      name={element.name}
      options={asyncOptions}
      getOptionLabel={(option) => option?.label || ""}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            src={option?.image || ""}
            alt=""
            style={{ width: 24, height: 16 }}
            onError={(e) => (e.target.style.display = "none")}
          />
          {option.label}
        </Box>
      )}
      value={
        asyncOptions?.find((option) => option.value === formValues) || null
      }
      onChange={(event, newValue) => {
        if (element?.hasDoubleValue) {
          formik.setFieldValue(element.name, newValue?.value || "");
          formik.setFieldValue(element.name1, newValue?.label || "");
          formik.setFieldValue(element.name2, newValue?.code || "");
        } else {
          formik.setFieldValue(element.name, newValue?.value || "");
        }
        if (element?.clearField) {
          element.clearField.forEach((field) => {
            formik.setFieldValue(field, "");
          });
        }
      }}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={element.label}
          error={
            formik.touched[element.name] && Boolean(formik.errors[element.name])
          }
          required={element.required}
          helperText={
            formik.touched[element.name] && formik.errors[element.name]
          }
          variant="outlined"
          InputLabelProps={{ shrink: Boolean(formValues) }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {formValues ? (
                  <img
                    src={
                      asyncOptions.find((option) => option.value === formValues)
                        ?.image || ""
                    }
                    alt=""
                    style={{ width: 24, height: 16 }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div style={{ color: theme.palette.button.primary }}>
                    {element?.iconStart}
                  </div>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export const AsyncDropDownCustom = ({ element, formik }) => {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState(
    element?.options.find(
      (option) => option.label === formik.values[element.name1]
    ) || null
  );
  return (
    <>
      <Autocomplete
        id={element.name}
        name={element.name}
        options={element?.options}
        getOptionLabel={(option) => option.label || ""}
        value={selectedValue}
        onChange={(event, newValue) => {
          setSelectedValue(newValue);
          if (element?.hasDoubleValue) {
            formik.setFieldValue(element.name, newValue?.value || "");
            formik.setFieldValue(element.name1, newValue?.label || "");
            formik.setFieldValue(element.name2, newValue?.code || "");
          } else {
            formik.setFieldValue(element.name, newValue?.value || "");
          }
          if (element?.clearField) {
            element.clearField.forEach((field) => {
              formik.setFieldValue(field, "");
            });
          }
        }}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label={element.label}
            error={
              formik.touched[element.name] &&
              Boolean(formik.errors[element.name])
            }
            required={element.required}
            helperText={
              formik.touched[element.name] && formik.errors[element.name]
            }
            variant="outlined"
            InputLabelProps={{ shrink: Boolean(selectedValue) }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  {selectedValue ? (
                    <img
                      src={selectedValue?.flag || ""}
                      alt="flag"
                      style={{ width: 24, height: 16 }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div style={{ color: theme.palette.button.primary }}>
                      {element?.iconStart}
                    </div>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <style>{`
            .css-1xbz73f {
              margin-top: 0px; !important;
            }
           
              `}</style>
    </>
  );
};

export const AsyncDropDownSearchStreet = ({ element, formik, formValues }) => {
  const theme = useTheme();
  const libraries = "places";
  const [inputValue, setInputValue] = useState(formValues || "");
  const [options, setOptions] = useState([]);
  const key = "AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA";

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=${libraries}`;
        script.async = true;
        script.onload = () => {
          console.log("Google Maps script loaded successfully");
        };
        script.onerror = () => {
          console.error("Error loading Google Maps script");
        };
        document.head.appendChild(script);
      }
    };

    loadGoogleMapsScript();
  }, []);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue && window.google) {
      const service = new window.google.maps.places.AutocompleteService();
      const requestType = element.isStreet ? "address" : "(cities)";
      service.getPlacePredictions(
        {
          input: newInputValue,
          componentRestrictions: { country: "AU" },
          types: [requestType],
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setOptions(
              predictions.map((prediction) => ({
                description: prediction.description,
                place: prediction.structured_formatting,
                placeId: prediction.place_id,
              }))
            );
          } else {
            setOptions([]);
          }
        }
      );
    } else {
      setOptions([]);
    }
  };

  const handleOptionChange = (event, newValue) => {
    if (newValue) {
      const { placeId, place } = newValue;
      const fetchPlaceDetails = (placeId) => {
        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.getDetails({ placeId }, (placeResult, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const postalCode =
              placeResult.address_components.find((component) =>
                component.types.includes("postal_code")
              )?.long_name || "";

            const suburb =
              placeResult.address_components.find((component) =>
                component.types.includes("locality")
              )?.long_name || "";

            if (element?.isStreet) {
              const suburbVal = (newValue?.place?.secondary_text).slice(0, -11)
              setInputValue(newValue.place?.main_text);
              formik.setFieldValue(element.name, place.main_text);
              formik.setFieldValue(element.name1, suburbVal);
              formik.setFieldValue(element.name2, postalCode);
            } else {
              setInputValue(newValue.description);
              formik.setFieldValue(element.name, newValue.description);
            }
          } else {
            console.error("Failed to fetch place details", status);
          }
        });
      };

      fetchPlaceDetails(placeId);
    } else {
      setInputValue("");
      formik.setFieldValue(element.name, "");
      formik.setFieldValue(element.name1, "");
      formik.setFieldValue(element.name2, "");
    }
  };

  
  
  return (
    <Autocomplete
      id={element.name}
      name={element.name}
      fullWidth
      inputValue={inputValue}
      value={
        options.find((option) => option.place?.main_text === inputValue) || null
      }
      onInputChange={handleInputChange}
      onChange={handleOptionChange}
      options={options}
      getOptionLabel={(option) => option.place?.main_text || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label={element.label}
          InputLabelProps={{ shrink: Boolean(inputValue) }}
          variant="outlined"
          className="textfield-icon-input"
          disabled={element?.isDisabled}
          error={
            formik.touched[element.name] && Boolean(formik.errors[element.name])
          }
          required={element.required}
          helperText={
            formik.touched[element.name] && formik.errors[element.name]
          }
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <div
                  style={{
                    color: theme.palette.button.primary,
                  }}
                >
                  {element?.iconStart}
                </div>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};


export const AsyncDropDownSearchPlace = ({ element, formik, formValues }) => {
  const theme = useTheme();
  const libraries = "places";
  const [inputValue, setInputValue] = useState(formValues || "");
  const [options, setOptions] = useState([]);
  const key = "AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA";

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=${libraries}`;
        script.async = true;
        script.onload = () => {
          console.log("Google Maps script loaded successfully");
        };
        script.onerror = () => {
          console.error("Error loading Google Maps script");
        };
        document.head.appendChild(script);
      }
    };

    loadGoogleMapsScript();
  }, []);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue && window.google) {
      const service = new window.google.maps.places.AutocompleteService();
      const requestType = element.isStreet ? "address" : "(cities)";
      service.getPlacePredictions(
        {
          input: newInputValue,
          componentRestrictions: { country: "AU" },
          types: [requestType],
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setOptions(
              predictions.map((prediction) => ({
                description: prediction.description,
                place: prediction.structured_formatting,
                placeId: prediction.place_id,
              }))
            );
          } else {
            setOptions([]);
          }
        }
      );
    } else {
      setOptions([]);
    }
  };

  const handleOptionChange = (event, newValue) => {
    if (newValue) {
      const { placeId, place } = newValue;
      const fetchPlaceDetails = (placeId) => {
        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.getDetails({ placeId }, (placeResult, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const postalCode =
              placeResult.address_components.find((component) =>
                component.types.includes("postal_code")
              )?.long_name || "";

            const suburb =
              placeResult.address_components.find((component) =>
                component.types.includes("locality")
              )?.long_name || "";

            if (element?.isStreet) {
              const suburbVal = (newValue?.place?.secondary_text).slice(0, -11)
              setInputValue(newValue.description);
              formik.setFieldValue(element.name, newValue?.description);
              formik.setFieldValue(element.name1, suburbVal);
              formik.setFieldValue(element.name2, postalCode);
            } else {
              setInputValue(newValue.description);
              formik.setFieldValue(element.name, newValue.description);
            }
          } else {
            console.error("Failed to fetch place details", status);
          }
        });
      };

      fetchPlaceDetails(placeId);
    } else {
      setInputValue("");
      formik.setFieldValue(element.name, "");
      formik.setFieldValue(element.name1, "");
      formik.setFieldValue(element.name2, "");
    }
  };

  
  
  return (
    <Autocomplete
      id={element.name}
      name={element.name}
      fullWidth
      inputValue={inputValue}
      value={
        options.find((option) => option.description === inputValue) || null
      }
      onInputChange={handleInputChange}
      onChange={handleOptionChange}
      options={options}
      getOptionLabel={(option) => option.description || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label={element.label}
          InputLabelProps={{ shrink: Boolean(inputValue) }}
          variant="outlined"
          className="textfield-icon-input"
          disabled={element?.isDisabled}
          error={
            formik.touched[element.name] && Boolean(formik.errors[element.name])
          }
          required={element.required}
          helperText={
            formik.touched[element.name] && formik.errors[element.name]
          }
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <div
                  style={{
                    color: theme.palette.button.primary,
                  }}
                >
                  {element?.iconStart}
                </div>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};