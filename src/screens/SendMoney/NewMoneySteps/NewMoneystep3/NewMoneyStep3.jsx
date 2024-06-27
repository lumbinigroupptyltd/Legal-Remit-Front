import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { nanoid } from "nanoid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Recipient from "./Recipient/Recipient";
import { useSendMoneyStep3Form } from "../../../../forms/sendmoney/useSendMoneyForm";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import FormModal from "../../../../components/formModal/FormModal";
import { useSelector } from "react-redux";
import {
  useDeleteRecipientDetails,
  useGetRecipientDetailsByUserId,
} from "../../../../hooks/sendMoney/recipient/useRecipient";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "../../../../components/formModal/DeleteConfirmationModal";

const NewMoneyStep3 = ({ handleNext }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { formik } = useSendMoneyStep3Form(handleNext, selectedItem);
  const { userId } = useSelector((state) => state.auth);
  const { data: getRecipientData } = useGetRecipientDetailsByUserId(userId);
  const data = getRecipientData && getRecipientData?.data;
  const { deleteRecipientUser, isSuccess: isDeleteSuccess } = useDeleteRecipientDetails({});

  const inputData = [
    {
      id: nanoid(),
      name: "search",
      label: "Search Recipient",
      type: "dropDown",
      required: true,
      md: 12,
      sm: 12,
    },
  ];
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log(selectedItem, "selected")
    deleteRecipientUser(selectedItem?.id);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setDeleteModal(false);
    }
  }, [isDeleteSuccess]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="p"
            mt={3}
            sx={{
              color: theme.palette.background.main,
              fontSize: "2.2rem",
              fontWeight: "700",
            }}
          >
            Send Money
          </Typography>
          <Typography variant="p">
            Select receiver to whom you are transfering money.
          </Typography>
          <Grid
            item
            xs={10}
            sm={10}
            md={10}
            mt={5}
            mb={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="outlined"
                onClick={handleClick}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  justifyContent: "end",
                  gap: "0.3rem",
                  "&:hover": {
                    background: theme.palette.background.main,
                    color: "#fff",
                  },
                }}
              >
                <AddCircleOutlineIcon /> ADD RECIPIENT
              </Button>
            </Box>
            <RenderInput inputField={inputData} formik={formik} />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "2rem",
            margin: "0 2rem",
            height: "40vh",
            overflowY: "scroll",
          }}
        >
          {data &&
            data?.map((item) => (
              <Stack
                sx={{
                  background: theme.palette.primary.light,
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  position: "relative",
                  padding: "1.2rem",
                  borderRadius: "2rem",
                  backgroundColor:
                    selectedItem?.id === item.id
                      ? theme.palette.primary.light
                      : theme.palette.background.light,
                }}
                onClick={() => handleItemClick(item)}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0 1rem",
                  }}
                >
                  <div>
                    <Box>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          color: "green",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "purple",
                          }}
                        >
                          Receiver Name:
                        </span>{" "}
                        {item?.firstName} {item?.middleName} {item?.lastName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          color: "green",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "purple",
                          }}
                        >
                          Country Name:
                        </span>{" "}
                        {item?.country?.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          color: "green",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "purple",
                          }}
                        >
                          Phone Number:
                        </span>{" "}
                        {item?.phone}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          color: "green",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "purple",
                          }}
                        >
                          Delivery Method:
                        </span>{" "}
                        {item?.deliveryMethod?.deliveryType?.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          color: "green",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "purple",
                          }}
                        >
                          Bank Name:
                        </span>{" "}
                        {item?.bank?.bankName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          color: "green",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "purple",
                          }}
                        >
                          Account Number:
                        </span>{" "}
                        {item?.bankAccNo}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          color: "green",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "purple",
                          }}
                        >
                          Relation:
                        </span>{" "}
                        {item?.relation?.name}
                      </Typography>
                    </Box>
                  </div>
                  <div style={{ marginTop: "2rem" }}>
                    <DeleteIcon
                      sx={{
                        color: theme.palette.color.danger,
                        fontSize: "2rem",
                      }}
                      onClick={handleDelete}
                    />
                  </div>
                </Box>

                {selectedItem?.id === item.id && (
                  <CheckCircleOutlineIcon
                    sx={{
                      position: "absolute",
                      top: "14px",
                      right: "32px",
                      fontSize: "2.2rem",
                      color: theme.palette.background.main,
                    }}
                  />
                )}
              </Stack>
            ))}
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", width: "fit-content" }}>
          <Button
            onClick={handleFormSubmit}
            variant={"contained"}
            disabled={!selectedItem}
            sx={{
              padding: "8px 24px",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      {openModal && (
        <FormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          width={700}
          height={"auto"}
          header={"Add Recipient"}
          formComponent={
            <>
              <Recipient onClose={() => setOpenModal(false)} />
            </>
          }
        />
      )}

      {deleteModal && (
        <DeleteConfirmationModal
          open={deleteModal}
          handleCloseModal={() => setDeleteModal(false)}
          handleConfirmDelete={handleConfirmDelete}
          message={"recipient user"}
        />
      )}
    </>
  );
};

export default NewMoneyStep3;
