import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the appropriate adapter
import dayjs from "dayjs";
import { Grid, useTheme } from "@mui/material";

export const PickDate = ({ element, formik }) => {
  const theme = useTheme();
  const today = dayjs(); 

  const handleChange = (e) => {
    const date = new Date(e);
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const newDate = adjustedDate.toISOString().substring(0, 10);
    formik.setFieldValue(element.name, newDate);
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
          value={dayjs(formik.values[element.name]) || today || null}
          onChange={handleChange}
          required={element.required}
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



// import React from "react";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import { Grid, useTheme } from "@mui/material";
// import { TextField } from "@mui/material";
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// export const PickDate = ({ element, formik }) => {
//   const theme = useTheme();
//   const today = dayjs(); // Get today's date

//   const handleChange = (date) => {
//     const adjustedDate = dayjs(date).startOf('day').toISOString();
//     formik.setFieldValue(element.name, adjustedDate);
//   };

//   return (
//       <Grid display={"flex"} gap={2}>
//         <DatePicker
//           sx={{
//             width: "100%",
//             background: theme.palette.background.field,
//           }}
//           name={element?.name}
//           label={element.label}
//           value={formik.values[element.name] ? dayjs(formik.values[element.name]) : today} // Set default value to today
//           onChange={handleChange}
//           required={element.required}
//           components={{
//             OpenPickerIcon: CalendarTodayIcon, // Use CalendarTodayIcon as the picker icon
//           }}
//           slotProps={{
//             textField: {
//               error:
//                 formik.touched[element.name] && !!formik.errors[element.name],
//               helperText:
//                 formik.touched[element.name] && formik.errors[element.name],
//               InputProps: {
//                 endAdornment: (
//                   <CalendarTodayIcon style={{ cursor: 'pointer', color: theme.palette.text.primary }} />
//                 )
//               }
//             },
//           }}
//         />
//       </Grid>
//   );
// };
