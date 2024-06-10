import React, { useState, useRef, useMemo, useEffect } from "react";
import PageHeader from "../../../../../components/PageHeader";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditBlogsManagement.scss'
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";

import ModalComponent from "../../../ModalComponent";
import Loader from "../../../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// const validator = require("../../../../../assets/js/validator")

const toolbar = {
  options: ["inline", "blockType", "list", "textAlign", "history", "fontFamily", "colorPicker", "emoji"],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  // blockType: {
  //   inDropdown: true,
  //   options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6",],
  // },
  colorPicker: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  },
  emoji: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
      '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
      '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
      '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
      '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
      '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
      '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
      '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
      '✅', '❎', '💯',
    ],
  },
  list: {
    inDropdown: true,
    options: ["unordered", "ordered"],
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  textAlign: {
    inDropdown: true,
    options: ["left", "center", "right", "justify"],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: false,
    defaultTargetOption: "_blank",
  },
  history: {
    inDropdown: false,
    options: ["undo", "redo"],
  },
};


export default function EditBlogsManagement(props) {
  const [title, settitle] = useState("");
  const [id, setId] = useState(props.location.state);
  const [showHide, setshowHide] = useState(null);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [combinedContent, setCombinedContent] = useState("");
  const [logo, setLogo] = useState(null);
  const [enabled, setenabled] = useState(false);
  const [isPopular, setIsPopuerlar] = useState(false);
  const [error, setError] = useState();
  const [getLogo, setGetLogo] = useState();

  const editor = useRef("");
  const navigate = useNavigate();


  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setCombinedContent(editorState.getCurrentContent().getPlainText());
  };

  const getblockById = async () => {
    try {
      const res = await axios.post(CommonConstants.BASE_URL + '/getbloglistbyid', { "id": id });
      if (res.data.status == true) {
        const selectedData = res.data.data;
        settitle(selectedData.title);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(selectedData.description))));
        setIsPopuerlar(selectedData.popular);
        setenabled(selectedData.enabled);
        // setLogo(selectedData.image);
        setGetLogo(selectedData.image);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const hanndleSubmit = async () => {
    if (id) {
      const plainText = editorState.getCurrentContent().getPlainText();
      if (!title || !(logo || getLogo) || !(combinedContent || plainText)) {
        setError(true);
      } else {
        const payload = new FormData();
        payload.append("data", JSON.stringify({
          "id": id,
          "title": title,
          "description": combinedContent || plainText,
          "enabled": enabled,
          "popular": isPopular
        }));

        payload.append("image", logo); //updateblog
        await axios.post(CommonConstants.BASE_URL + "/updateblog", payload).then((responce) => {
          if (responce.data.status == true) {
            navigate("/blogsmangement");
          }
        }).catch(Error => console.log(Error));
      }
    } else {
      if (!title || !logo || !combinedContent) {
        setError(true);
      } else {
        const payload = new FormData();
        payload.append("data", JSON.stringify({
          "title": title,
          "description": combinedContent,
          "enabled": enabled,
          "popular": isPopular
        }));

        payload.append("image", logo)
        await axios.post(CommonConstants.BASE_URL + "/saveblog", payload).then((responce) => {
          if (responce.data.status == true) {
            navigate("/blogsmangement");
          }
        }).catch(Error => console.log(Error));
      }
    }

  };

  useEffect(() => {
    setshowHide(props.location.state);
    if (id) {
      getblockById();
    }
  }, [id]);
  return (
    <div>
      <div>
        <div className="container-fluid"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
          {loadervalue == true ? <Loader /> : ""}
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Blogs
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">
                  <Row>
                    <Form.Group className="mb-3 row d-flex" controlId="formBasicEmail">
                      <div className="col-lg-12">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Title"
                          className="required"
                          value={title}
                          onChange={(e) => {
                            settitle(e.target.value);
                          }}
                        />
                        {error && !title && <small className="text-danger error_message ms-2"> Please Enter Title</small>}
                      </div>
                    </Form.Group>
                  </Row>

                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="email-editor-wrapper"
                      editorClassName="email-editor-content"
                      onEditorStateChange={handleEditorChange}
                      toolbar={toolbar} // Use the custom toolbar configuration
                    />
                    {error && !combinedContent && <small className="text-danger error_message ms-2"> Please Enter Description</small>}
                  </Form.Group>

                  {(getLogo || logo) && <img src={logo ? URL.createObjectURL(logo) : getLogo} alt="" className="paymentImage mb-3 mt-3" />}

                  <Row className="mb-0 mt-3">
                    <Form.Group
                      controlId="formGridCity"
                      className="border-0"
                    >
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        className="w-auto rounded-0 pt-2 border-0 required"
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                      />
                      {error && !logo && <small className="text-danger error_message ms-2"> Please Select Image</small>}
                    </Form.Group>
                  </Row>

                  <FormGroup className="mt-3">
                    <FormControlLabel control={<Checkbox checked={enabled} onChange={(e) => setenabled(e.target.checked)} />} label="Active" />
                    <FormControlLabel control={<Checkbox checked={isPopular} onChange={(e) => setIsPopuerlar(e.target.checked)} />} label="Is Popular" />
                  </FormGroup>

                  <div className="row d-flex ms-auto mt-3">
                    <a
                      style={{ background: "#AA2AE1" }}
                      className="w-auto px-3 rounded btn text-white bolder"
                      onClick={hanndleSubmit}
                    >
                      {id ? "Update" : "Create"}
                    </a>
                    <a
                      className="w-auto px-3 btn btn-default ms-3 text-black bolder border 2"
                      onClick={() => navigate("/blogsmangement")}
                    > Cancel
                    </a>
                  </div>
                </Form>
                <ModalComponent
                  show={modalShowEdit}
                  title1={"Notification Template updated successfully"}
                  onHide={() => setModalShowEdit(false)}
                />
                <ModalComponent
                  show={modalShowAdd}
                  title11={"Notification Template added successfully"}
                  onHide={() => setModalShowAdd(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
