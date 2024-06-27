import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
  useTheme,
} from "@mui/material";
import CustomButton from "../MaterialUI/CustomButton";

const DeleteConfirmationModal = ({
  open,
  handleCloseModal,
  handleConfirmDelete,
  isLoading,
  message,
}) => {
const theme = useTheme();

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <Box sx={{ bgcolor: "#grey" }}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {message}?
        </DialogContent>
        <DialogActions>
          <CustomButton
            text={isLoading ? "Deleting..." : "Confirm"}
            type="success"
            onClick={handleConfirmDelete}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} />}
          />
          <CustomButton text="Cancel" onClick={handleCloseModal} type="error" />
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
