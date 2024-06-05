import React from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FormModal = ({
  open,
  onClose,
  height,
  formComponent,
  sx,
  width,
  bgcolors,
  header,
  maxHeight,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: width ? width : "max-content",
    width:
      isSmallScreen || isMediumScreen ? "90%" : width ? width : "max-content",
    height: height ? height : "-webkit-fill-available",
    // maxHeight: maxHeight && maxHeight,
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    background: "#fff",
    color: "#000",
    overflow: "auto",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={sx}
    >
      <Box sx={style}>
        {header && (
          <>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Typography variant="h5">{header}</Typography>
              </Grid>
              <Grid >
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <div style={{border: "1px solid grey"}}></div>
            <Divider />
            <br />
          </>
        )}
        {formComponent}
      </Box>
    </Modal>
  );
};

export default FormModal;
