import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {Box, Button, Modal} from '@mui/material';

const ImagePreview = ({imagePath, openModal, handleCloseModal}) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '30px',
          width: {xs: '90%', sm: '70%', md: '50%', lg: '40%'},
          paddingBottom: '20px'
        }}
      >
        <div className="border-bottom py-2 mb-1 d-flex justify-content-between">
          <h5>Document Preview</h5>
          <div onClick={handleCloseModal} className="pointer">
            <CloseIcon/>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <img src={imagePath} alt="KYC Documents" width="50%"/>
        </div>

        <div className="row d-flex justify-content-end border-top">
          <div className="col-lg-3">
            <Button className="m-0 mt-3" variant="outlined" onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default ImagePreview
