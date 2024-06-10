import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const OptionalRender = ({ element, formik }) => {
    const [showDependent, setShowDependent] = useState(false);

    useEffect(() => {
        if (element.isDependent && element.dependent) {
            const dependency = element.dependent.every(dependency => {
                return formik.values[dependency.field] === dependency.value;
            });
            setShowDependent(dependency);
        }
    }, [element, formik.values]);

    return (
        <>
            {showDependent && (
                <Autocomplete
                    name={element.name}
                    options={element.options}
                    getOptionLabel={(option) => option?.label || ""}
                    value={element?.options?.find((option) => option?.value === formik.values[element.name])}
                    onChange={(event, newValue) => {
                        formik.setFieldValue(element.name, newValue?.value);
                    }}
                    fullWidth
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                label={element.label}
                                error={formik.touched[element.name] && Boolean(formik.errors[element.name])}
                                required={element.required}
                                helperText={formik.touched[element.name] && formik.errors[element.name]}
                                variant="outlined"
                            />
                        );
                    }}
                />
            )}
        </>
    );
};

export default OptionalRender;
