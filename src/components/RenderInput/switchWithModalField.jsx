import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  useTheme,
} from "@mui/material";
import CustomizedSwitches from "./SwitchInput";
import { FieldArray, getIn, FormikProvider } from "formik";
import DirectorsModal from "./DirectorsModal";
import { AddressField } from "./addressField";
import FormModal from "../formModal/FormModal";
import { useAddressForm } from "./useAddressForm";
import { CButton } from "../UIElements/CButton";
import { usePersonalBusinessProfileExtraForm } from "../../hooks/profile/Business/useProfileDetailsBusinessForm";
import { useSelector } from "react-redux";
import RenderInput from "./RenderInput";

const SwitchWithModalField = ({
  element,
  isFieldArray,
  arrayIndex,
  fieldArrayName,
}) => {
  const { userId } = useSelector((state) => state.auth);

  const theme = useTheme();
  const [openModal, setOpenModal] = useState(true);
  const { formik } = usePersonalBusinessProfileExtraForm({ userId });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div>
      
    </div>
  );
};

export default SwitchWithModalField;
