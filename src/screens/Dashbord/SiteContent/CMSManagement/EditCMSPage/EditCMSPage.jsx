import React, { useState, useRef, useMemo, useEffect } from "react";
import PageHeader from "../../../../../components/PageHeader";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditCMSPage.scss'
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


export default function EditCMSPage(props) {
  const [id, setId] = useState(props.location.state);
  const [title, settitle] = useState("");
  const [urlRewriteName, setUrlRewriteName] = useState('');
  const [descriptions, setDescriptions] = useState('')
  const [isActive, setIsActive] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [combinedContent, setCombinedContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    slug: '',
    description: '',
    metatitle: '',
    metakeywords: '',
    metadescription: '',
    createdBy: '',
    updatedBy: '',

  });

  useEffect(() => {
    if (id) {
      getCMSDetalisByID();
    }
  }, [id]);

  const getCMSDetalisByID = async () => {

    try {
      const response = await axios.post(CommonConstants.BASE_URL + "/getcmsbyid", { "id": id });
      if (response.data.status === true) {
        const data = response.data.data;
        // Update the state variables with the fetched data
        settitle(data.title);
        setUrlRewriteName(data.slug);
        setDescriptions(data.description);
        setMetaTitle(data.metatitle);
        setMetaKeywords(data.metakeywords);
        setMetaDescription(data.metadescription);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data.description))));

      }
    } catch (error) {
      console.error("Error fetching CMS details:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const editor = useRef("");
  const navigate = useNavigate();


  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setCombinedContent(editorState.getCurrentContent().getPlainText());
  };

  const AddCMS = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const plainText = editorState.getCurrentContent().getPlainText();
        if (!title || !urlRewriteName || !(combinedContent || plainText) || !metaTitle || !metaKeywords || !metaDescription) {
          setError(true);
        } else {
          const payload = {
            "id": id,
            "title": title,
            "slug": urlRewriteName,
            "description": combinedContent || plainText,
            "metatitle": metaTitle,
            "metakeywords": metaKeywords,
            "metadescription": metaDescription,

          }
          await axios.post(CommonConstants.BASE_URL + "/updatecms", payload).then((responce) => {
            if (responce.data.status == true) {
              navigate("/CMS");
            }
          }).catch(error => console.log(error));
        }
      } else {
        if (!title || !urlRewriteName || !editorState || !metaTitle || !metaKeywords || !metaDescription) {
          setError(true);
        } else {
          const plainText = editorState.getCurrentContent().getPlainText();
          const payload = {
            "title": title,
            "slug": urlRewriteName,
            "description": combinedContent || plainText,
            "metatitle": metaTitle,
            "metakeywords": metaKeywords,
            "metadescription": metaDescription,

          }
          await axios.post(CommonConstants.BASE_URL + "/savecms", payload).then((responce) => {
            if (responce.data.status == true) {
              navigate("/CMS");
            }
          }).catch(error => console.log(error));
        }
      }
      // if (!title || !urlRewriteName || !editorState || !metaTitle || !metaKeywords || !metaDescription) {
      //   setError(true);
      // } else {

      //   setError(true);
      //   if (Object.keys(true).length === 0) {
      //     const plainText = editorState.getCurrentContent().getPlainText();

      //     const payload = {
      //       "title": title,
      //       "slug": urlRewriteName,
      //       "description": combinedContent || plainText,
      //       "metatitle": metaTitle,
      //       "metakeywords": metaKeywords,
      //       "metadescription": metaDescription,

      //     }
      //     await axios.post(CommonConstants.BASE_URL + "/savecms", payload).then((responce) => {
      //       if (responce.data.status == true) {
      //         navigate("/CMS");
      //       }
      //     }).catch(error => console.log(error));
      //   }


      // }

    } catch (error) {
      console.log(error);
    }
  }
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
                CMS
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">
                  <Row>
                    <Form.Group className="mb-3 row d-flex" controlId="formBasicEmail">
                      <div className="col-lg-6 pbSt">
                        <Form.Label>Page Name</Form.Label>
                        <Form.Control
                          type="text"
                          // placeholder="Title"
                          className="required"
                          value={title}
                          onChange={(e) => {
                            // const sanitizedValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
                            settitle(e.target.value);
                          }}
                        />
                        {error && !title && <small className="responsiveFontLarge  text-danger" >Please Enter Title</small>}
                      </div>
                      <div className="col-lg-6">
                        <Form.Label>URL Slug</Form.Label>
                        <Form.Control
                          type="text"
                          // placeholder="URL Slug"
                          className="required"
                          defaultValue={urlRewriteName}
                          onChange={(e) => setUrlRewriteName(e.target.value)}
                        />
                        {error && !urlRewriteName && <small className="responsiveFontLarge  text-danger" >Please Enter URL Slug</small>}
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
                    {error && !combinedContent && <small className="responsiveFontLarge  text-danger error_message ms-2 error" >Please Enter Description</small>}
                  </Form.Group>


                  {/* <FormGroup className="mt-3">
                    <FormControlLabel control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Active" />
                  </FormGroup> */}

                  <div className="d-flex mt-3 mb-2 respoChildFooter">
                    <Form.Group className="mb-3 col-lg-6 ps-0" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Meta Title</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={metaTitle}
                        onChange={(e) => {
                          // const sanitizedValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
                          setMetaTitle(e.target.value);
                        }}
                      />
                      {error && !metaTitle && <small className="responsiveFontLarge  text-danger" >Please Enter Meta Title</small>}
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-6" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Meta Keywords</Form.Label>
                      <Form.Control as="textarea" rows={3}
                        value={metaKeywords}
                        onChange={(e) => {
                          // const sanitizedValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
                          setMetaKeywords(e.target.value)
                        }}
                      />
                      {error && !metaKeywords && <small className="responsiveFontLarge  text-danger" >Please Enter Meta Keywords</small>}
                    </Form.Group>

                  </div>
                  <Form.Group className="mb-3 pe-0" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Meta Description</Form.Label>
                    <Form.Control as="textarea" rows={3}
                      value={metaDescription}
                      onChange={(e) => {
                        // const sanitizedValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
                        setMetaDescription(e.target.value)
                      }}
                    />
                    {error && !metaDescription && <small className="responsiveFontLarge  text-danger" >Please Enter Meta Description</small>}
                  </Form.Group>

                  <div className="row d-flex ms-auto mt-3">
                    <a
                      style={{ background: "#AA2AE1" }}
                      className="w-auto px-3 rounded btn text-white bolder"
                      onClick={AddCMS}
                    >
                      {id ? "Update" : "Create"}
                    </a>
                    <a
                      className="w-auto px-3 btn btn-default ms-3 text-black bolder border 2"
                      onClick={() => navigate("/CMS")}
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
