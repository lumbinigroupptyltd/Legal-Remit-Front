import React from 'react';
import { Modal, Box, Button, TextField, Grid, IconButton } from '@mui/material';
import { FieldArray } from 'formik';
import CloseIcon from '@mui/icons-material/Close';

const DirectorsModal = ({ open, handleClose, formik }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <h2>Add Directors</h2>
        <FieldArray name="directors">
          {({ push, remove, form }) => (
            <div>
              {form.values.directors.map((director, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name={`directors[${index}].name`}
                      label="Name"
                      value={director.name}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name={`directors[${index}].number`}
                      label="Number"
                      value={director.number}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => push({ name: '', number: '' })}
              >
                Add Director
              </Button>
            </div>
          )}
        </FieldArray>
      </Box>
    </Modal>
  );
};

export default DirectorsModal;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
