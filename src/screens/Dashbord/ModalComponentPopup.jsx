import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent(props) {
  return (
    <div> <Modal className='rounded'
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <div className='d-flex flex-column py-4'>
        <i className="fa fa-check-circle fa-5x success-icon mb-4" color="green" ></i>
        <p className='text-center fs-6 mb-0'>SUCCESS</p>

      </div> */}
      <Modal.Body>
        <p className='text-center'>
          {props.title1}
        </p>
      </Modal.Body>
      <div className='text-center'>
        <button className='w-25 success-btn purpleBackground border-0 rounded text-light' onClick={props.SavePr}>Ok</button>
        <button className='w-25 success-btn purpleBackground border-0 rounded text-light' onClick={props.cancle}>Cancel</button>
      </div>
    </Modal></div>
  )
}

export default ModalComponent