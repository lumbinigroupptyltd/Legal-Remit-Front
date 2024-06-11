import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { axiosInstance } from "../../utils/axiosIntercepters";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

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
      getOptionLabel={(option) => option.label || ""}
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

// export const AsyncDropDownSearchCity = ({ element, formik, formValues }) => {
//   const theme = useTheme();
//   const libraries = "places";
//   const [inputValue, setInputValue] = useState("");
//   const [options, setOptions] = useState([]);
//   const key = "AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA";

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=${libraries}`;
//         script.async = true;
//         script.onload = () => {
//           console.log("Google Maps script loaded successfully");
//         };
//         script.onerror = () => {
//           console.error("Error loading Google Maps script");
//         };
//         document.head.appendChild(script);
//       }
//     };

//     loadGoogleMapsScript();
//   }, [options, inputValue]);

//   const handleInputChange = (event, value) => {
//     setInputValue(value);
//     if (value && window.google) {
//       const service = new window.google.maps.places.AutocompleteService();
//       service.getPlacePredictions(
//         {
//           input: value,
//           componentRestrictions: { country: "AU" },
//           types: ["geocode"],
//         },
//         (predictions, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             setOptions(
//               predictions.map((prediction) => ({
//                 description: prediction.description,
//                 label: prediction.description,
//                 value: prediction.description,
//                 placeId: prediction.place_id,
//               }))
//             );
//           } else {
//             setOptions([]);
//           }
//         }
//       );
//     } else {
//       setOptions([]);
//     }
//   };
 
//   return (
//     <>
//       <Autocomplete
//         id={element.name}
//         // key={formValues}
//         name={element.name}
//         fullWidth
//         inputValue={inputValue}
//         value={options && options?.find((option) => option?.description === formValues)}
//         onInputChange={handleInputChange}
//         onChange={(value, newValue) => {
//           if (inputValue) {
//             formik.setFieldValue(element?.name, newValue);
//           }
//         }}
//         options={options && options?.map((option) => option.description)}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={element.label}
//           InputLabelProps={{ shrink: Boolean(formValues) }}
//             variant="outlined"
//             className="textfield-icon-input"
//             disabled={element?.isDisabled}
//             error={
//               formik.touched[element.name] &&
//               Boolean(formik.errors[element.name])
//             }
//             required={element.required}
//             helperText={
//               formik.touched[element.name] && formik.errors[element.name]
//             }
//             InputProps={{
//               ...params.InputProps,
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <div
//                     style={{
//                       color: theme.palette.button.primary,
//                     }}
//                   >
//                     {element?.iconStart}
//                   </div>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         )}
//       />
//       <style>{`
//             .css-1xbz73f {
//               margin-top: 0px; !important;
//             }
           
//               `}</style>
//     </>
//   );
// };



export const AsyncDropDownSearchCity = ({ element, formik, formValues }) => {
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
      service.getPlacePredictions(
        {
          input: newInputValue,
          componentRestrictions: { country: "AU" },
          types: ["address"],
        },
        (predictions, status) => {
          console.log(predictions, "pre")
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setOptions(
              predictions.map((prediction) => ({
                description: prediction.description,
                placeId: prediction.place_id,
                street: prediction?.terms,
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
    console.log(newValue, "new")
    console.log(newValue.street?.[0]?.value, "street")
    if (newValue) {
      setInputValue(newValue.description);
      formik.setFieldValue(element.name, newValue.description);
      formik.setFieldValue(element.name1, newValue.street?.[0]?.value);
    } else {
      setInputValue("");
      formik.setFieldValue(element.name, "");
      formik.setFieldValue(element.name1, "");
    }
  };

  return (
    <Autocomplete
      id={element.name}
      name={element.name}
      fullWidth
      inputValue={inputValue}
      value={
        options.find((option) => option.description === inputValue) || { description: inputValue }
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
            formik.touched[element.name] &&
            Boolean(formik.errors[element.name])
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
      service.getPlacePredictions(
        {
          input: newInputValue,
          componentRestrictions: { country: "AU" },
          types: ["address"],
        },
        (predictions, status) => {
          console.log(predictions, "pre")
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setOptions(
              predictions.map((prediction) => ({
                description: prediction.description,
                placeId: prediction.place_id,
                street: prediction?.terms,
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
    console.log(newValue, "new")
    if (newValue) {
      setInputValue(newValue.description);
      formik.setFieldValue(element.name, newValue.description);
      formik.setFieldValue(element.name, newValue.street);
    } else {
      setInputValue("");
      formik.setFieldValue(element.name, "");
    }
  };

  return (
    <Autocomplete
      id={element.name}
      name={element.name}
      fullWidth
      inputValue={inputValue}
      value={
        options.find((option) => option.description === inputValue) || { description: inputValue }
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
            formik.touched[element.name] &&
            Boolean(formik.errors[element.name])
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
