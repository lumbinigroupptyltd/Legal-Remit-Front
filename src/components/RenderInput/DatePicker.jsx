// import React from "react";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the appropriate adapter
// import dayjs from "dayjs";
// import { Grid, useTheme } from "@mui/material";

// export const PickDate = ({ element, formik }) => {
//   const theme = useTheme();
//   const today = dayjs();
//   const eighteenYearsAgo = today.subtract(18, 'year');

//   const handleChange = (e) => {
//     const date = new Date(e);
//     const adjustedDate = new Date(
//       date.getTime() - date.getTimezoneOffset() * 60000
//     );
//     const newDate = adjustedDate.toISOString().substring(0, 10);
//     formik.setFieldValue(element.name, newDate);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Grid display={"flex"} gap={2}>
//         <DatePicker
//           sx={{
//             width: "100%",
//             background: theme.palette.background.field,
//           }}
//           name={element?.name}
//           label={element.label}
//           value={dayjs(formik.values[element.name]) || today || null}
//           onChange={handleChange}
//           required={element.required}
//           disableFuture={element?.disableFuture} // Disable future dates
//           disablePast={element?.disablePast}
//           maxDate={element?.maxDate ? eighteenYearsAgo : false}
//           slotProps={{
//             textField: {
//               error:
//                 formik.touched[element.name] && !!formik.errors[element.name],
//               helperText:
//                 formik.touched[element.name] && formik.errors[element.name],
//             },
//           }}
//         />
//       </Grid>
//     </LocalizationProvider>
//   );
// };



import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Grid, useTheme } from "@mui/material";

export const PickDate = ({ element, formik }) => {
  const theme = useTheme();
  const today = dayjs();
  const eighteenYearsAgo = today.subtract(18, 'year'); // Calculate the date 18 years ago from today

  const handleChange = (e) => {
    const date = dayjs(e);
    formik.setFieldValue(element.name, date.format('YYYY-MM-DD'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid display={"flex"} gap={2}>
        <DatePicker
          sx={{
            width: "100%",
            background: theme.palette.background.field,
          }}
          name={element?.name}
          label={element.label}
          value={formik.values[element.name] ? dayjs(formik.values[element.name]) : null}
          onChange={handleChange}
          required={element.required}
          disableFuture={element?.disableFuture}
          disablePast={element?.disablePast}
          maxDate={element?.maxDate ? eighteenYearsAgo : undefined}
          slotProps={{
            textField: {
              error:
                formik.touched[element.name] && !!formik.errors[element.name],
              helperText:
                formik.touched[element.name] && formik.errors[element.name],
            },
          }}
        />
      </Grid>
    </LocalizationProvider>
  );
};
