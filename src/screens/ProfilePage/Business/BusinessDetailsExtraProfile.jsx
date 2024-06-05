import React, { useState } from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import {
  Button,
  Grid,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import {
  useBusinessDirectiveForm,
  useBusinessShareForm,
  usePersonalBusinessProfileExtraForm,
} from "../../../hooks/profile/Business/useProfileDetailsBusinessForm";
import FormModal from "../../../components/formModal/FormModal";
import { FieldArray, FormikProvider } from "formik";

const directiveField = [
  {
    name: "name",
    label: "Name",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "email",
    label: "email",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "phoneCode",
    label: "phone",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "streetName",
    label: "Street Name",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "suburb",
    label: "City",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "zipCode",
    label: "zip code",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  // {
  //   name: "add",
  //   label: "Add More",
  //   required: true,
  //   iconStart: <SmartphoneIcon />,
  //   type: "fieldArraySwitch",
  //   max: 10,
  //   id: nanoid(),
  //   md: 6,
  //   sm: 12,
  // },
];
const shareField = [
  {
    name: "name",
    label: "Name",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "email",
    label: "email",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "phoneCode",
    label: "phone",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "streetName",
    label: "Street Name",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "suburb",
    label: "City",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "zipCode",
    label: "zip code",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "text",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
];
const basicInputData = [
  {
    name: "companyTypeId",
    label: "Company Type",
    required: true,
    type: "text",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "noOfEmployee",
    label: "No. Of Employees",
    required: true,
    type: "onlyNumber",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },

  {
    name: "industryTypeId",
    label: "Industry Type",
    required: true,
    type: "text",
    iconStart: <EmailIcon />,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "targetBusiness",
    label: "Target Market",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "expectedRemittance",
    label: "Expected remittance volume (AUD)/sending currency per year",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "noOfTransaction",
    label: "Expected No of transaction per year",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "website",
    label: "Website",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "noOfDirectors",
    label: "No. of Directors",
    required: true,
    type: "onlyNumber",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "noOfShareHolder",
    label: "No. Of Shareholder",
    required: true,
    type: "onlyNumber",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
];

const BusinessDetailsExtraProfile = ({ userId }) => {
  const theme = useTheme();
  const [directiveModal, setDirectiveModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const { formik } = usePersonalBusinessProfileExtraForm({ userId });
  const { formikD } = useBusinessDirectiveForm({ userId, setDirectiveModal });
  const { formikS } = useBusinessShareForm({ userId, setShareModal });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const handleFormDirectiveSubmit = () => {
    formikD.handleSubmit();
  };
  const handleFormShareSubmit = () => {
    formikS.handleSubmit();
  };
  const handleRemove = (remove, index, id) => {
    remove(index);
  };

  return (
    <>
      <Grid container mt={2}>
        <RenderInput inputField={basicInputData} formik={formik} />

        <Grid container mt={2} sx={{ display: "flex" }}>
          <FormikProvider value={formikD} {...formikD}>
            <>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                display={"flex"}
                alignItems={"center"}
                style={{ paddingLeft: "0px" }}
              >
                <Typography>Add Directive Detail</Typography>
                <Switch
                  checked={formikD.values?.isDirective}
                  onChange={(e) => {
                    formikD.setFieldValue("isDirective", e.target.checked);
                    setDirectiveModal(e.target.checked);
                  }}
                />
              </Grid>
              {directiveModal && (
                <FormModal
                  open={directiveModal}
                  onClose={() => {
                    setDirectiveModal(false);
                    formikD.setFieldValue("isDirective", false);
                  }}
                  width={700}
                  height={"auto"}
                  maxHeight={"80vh"}
                  header={"Add Directors"}
                  formComponent={
                    <>
                      <FieldArray name="directive">
                        {({ push, remove }) => {
                          return (
                            formikD.values.directive &&
                            formikD.values.directive.map((_, index) => {
                              const field = directiveField.map((d) => {
                                return {
                                  ...d,
                                  name: `directive.${index}.${d.name}`,
                                };
                              });
                              return (
                                <>
                                  <Grid mt={2}>
                                    <RenderInput
                                      inputField={field}
                                      formik={formikD}
                                      index={index}
                                      isFieldArray={true}
                                      fieldArrayName="directive"
                                      pushArray={() =>
                                        push({
                                          name: "",
                                          email: "",
                                          phoneCode: "",
                                          streetName: "",
                                          suburb: "",
                                          zipCode: "",
                                        })
                                      }
                                      removeArray={() => remove()}
                                    />
                                  </Grid>
                                  <Stack display={"flex"} flexDirection={"row"}>
                                    {index >= 0 &&
                                      index ===
                                        formikD.values?.directive.length -
                                          1 && (
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          style={{
                                            border: "1px solid #6C49B4",
                                            margin: "1rem 1rem 1rem 0",
                                            width: "fit-content",
                                          }}
                                          onClick={() =>
                                            push({
                                              name: "",
                                              email: "",
                                              phoneCode: "",
                                              streetName: "",
                                              suburb: "",
                                              zipCode: "",
                                            })
                                          }
                                        >
                                          <Typography
                                            color={"#6C49B4"}
                                            fontWeight={600}
                                          >
                                            + Add
                                          </Typography>
                                        </Button>
                                      )}
                                    {index >= 1 &&
                                      formikD.values.directive.length > 1 && (
                                        <Button
                                          variant="outlined"
                                          color="secondary"
                                          style={{
                                            border: "1px solid #B4271F",
                                            margin: "1rem 0",
                                            width: "fit-content",
                                          }}
                                          onClick={() => {
                                            handleRemove(remove, index, _?.id);
                                          }}
                                        >
                                          <Typography
                                            color="#B4271F"
                                            fontWeight={600}
                                          >
                                            Remove
                                          </Typography>
                                        </Button>
                                      )}
                                  </Stack>
                                </>
                              );
                            })
                          );
                        }}
                      </FieldArray>
                      <Grid
                        item
                        mt={2}
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "end",
                          gap: "1rem",
                        }}
                      >
                        <CButton
                          buttonName={"ADD"}
                          OnClick={handleFormDirectiveSubmit}
                          variant={"contained"}
                          Width={"fit-content"}
                          TextColor={"#000"}
                          TextColorHover={"#fff"}
                          Border={`1px solid ${theme.palette.button.primary}`}
                          BGColor={`${theme.palette.background.default}`}
                          BGHover={`${theme.palette.hover.primary}`}
                        />
                      </Grid>
                    </>
                  }
                />
              )}
            </>
          </FormikProvider>

          <FormikProvider value={formikS} {...formikS}>
            <>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                display={"flex"}
                alignItems={"center"}
                style={{ paddingLeft: "0px" }}
              >
                <Typography>Add Share Holder Detail</Typography>

                <Switch
                  checked={formikS.values?.isShareholder}
                  onChange={(e) => {
                    formikS.setFieldValue("isShareholder", e.target.checked);
                    setShareModal(e.target.checked);
                  }}
                />
              </Grid>
              {shareModal && (
                <FormModal
                  open={shareModal}
                  onClose={() => {
                    setShareModal(false);
                    formikS.setFieldValue("isShareholder", false);
                  }}
                  width={700}
                  height={"auto"}
                  maxHeight={"80vh"}
                  header={"Add Share Holder"}
                  formComponent={
                    <>
                      <FieldArray name="shareHolder">
                        {({ push, remove }) => {
                          return (
                            formikS.values.shareHolder &&
                            formikS.values.shareHolder.map((_, index) => {
                              const field = shareField.map((d) => {
                                return {
                                  ...d,
                                  name: `shareHolder.${index}.${d.name}`,
                                };
                              });
                              return (
                                <>
                                  <Grid mt={2}>
                                    <RenderInput
                                      inputField={field}
                                      formik={formikS}
                                      index={index}
                                      isFieldArray={true}
                                      fieldArrayName="shareHolder"
                                      pushArray={() =>
                                        push({
                                          name: "",
                                          email: "",
                                          phoneCode: "",
                                          streetName: "",
                                          suburb: "",
                                          zipCode: "",
                                        })
                                      }
                                      removeArray={() => remove()}
                                    />
                                  </Grid>
                                  <Stack display={"flex"} flexDirection={"row"}>
                                    {index >= 0 &&
                                      index ===
                                        formikS.values?.shareHolder.length -
                                          1 && (
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          style={{
                                            border: "1px solid #6C49B4",
                                            margin: "1rem 1rem 1rem 0",
                                            width: "fit-content",
                                          }}
                                          onClick={() =>
                                            push({
                                              name: "",
                                              email: "",
                                              phoneCode: "",
                                              streetName: "",
                                              suburb: "",
                                              zipCode: "",
                                            })
                                          }
                                        >
                                          <Typography
                                            color={"#6C49B4"}
                                            fontWeight={600}
                                          >
                                            + Add
                                          </Typography>
                                        </Button>
                                      )}
                                    {index >= 1 &&
                                      formikS.values.shareHolder.length > 1 && (
                                        <Button
                                          variant="outlined"
                                          color="secondary"
                                          style={{
                                            border: "1px solid #B4271F",
                                            margin: "1rem 0",
                                            width: "fit-content",
                                          }}
                                          onClick={() => {
                                            handleRemove(remove, index, _?.id);
                                          }}
                                        >
                                          <Typography
                                            color="#B4271F"
                                            fontWeight={600}
                                          >
                                            Remove
                                          </Typography>
                                        </Button>
                                      )}
                                  </Stack>
                                </>
                              );
                            })
                          );
                        }}
                      </FieldArray>
                      <Grid
                        item
                        mt={2}
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "end",
                          gap: "1rem",
                        }}
                      >
                        <CButton
                          buttonName={"ADD"}
                          OnClick={handleFormShareSubmit}
                          variant={"contained"}
                          Width={"fit-content"}
                          TextColor={"#000"}
                          TextColorHover={"#fff"}
                          Border={`1px solid ${theme.palette.button.primary}`}
                          BGColor={`${theme.palette.background.default}`}
                          BGHover={`${theme.palette.hover.primary}`}
                        />
                      </Grid>
                    </>
                  }
                />
              )}
            </>
          </FormikProvider>
        </Grid>

        <Grid
          item
          mt={2}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
            gap: "1rem",
          }}
        >
          <CButton
            buttonName={"Cancel"}
            // OnClick={handleCancel}
            variant={"error"}
            Width={"fit-content"}
            TextColor={`${theme.palette.text.error}`}
            TextColorHover={"#fff"}
            Border={`1px solid ${theme.palette.button.error}`}
            BGColor={`${theme.palette.background.default}`}
            BGHover={`${theme.palette.hover.error}`}
          />
          <CButton
            buttonName={"ADD"}
            OnClick={handleFormSubmit}
            variant={"contained"}
            Width={"fit-content"}
            TextColor={"#000"}
            TextColorHover={"#fff"}
            Border={`1px solid ${theme.palette.button.primary}`}
            BGColor={`${theme.palette.background.default}`}
            BGHover={`${theme.palette.hover.primary}`}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BusinessDetailsExtraProfile;
