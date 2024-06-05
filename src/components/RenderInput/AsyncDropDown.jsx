import React, { useEffect, useState } from "react";
import {
  Autocomplete,
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
