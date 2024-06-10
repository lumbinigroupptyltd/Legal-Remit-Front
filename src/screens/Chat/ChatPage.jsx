import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import bin from "../../assets/images/deletBg.svg";
import user from "../../assets/images/userFill.svg";
import moment from "moment-timezone";
import closeVector from "../../assets/images/close.svg";
import PDF1 from "./PDF.png";
import Doc1 from "../../assets/images/doc.png";
import DownloadIcon from "@mui/icons-material/Download";
import Loader from "../Loader/Loader";

import {
  sendMessage,
  UploadMedia,
  connect,
  ClearChat,
  userJoin,
  setReceiveMessagesCallback,
  OnDeletedMessage,
} from "../../Constants/websocket";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import { Modal } from "react-bootstrap";

export default function ChatPage() {
  const inputRef = useRef();
  const [message, setMessage] = useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [receiveMessages, setReceiveMessages] = useState([]);
  const [media, setMedia] = useState([]);
  const [DeleteIdsArray, setDeleteIdsArray] = useState([]);
  const [selectedMedia, setselectedMedia] = useState([]);
  const [SelectChat, setSelectChat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [ClearChatModal, setClearChatModal] = useState(false);
  const [seperateDelete, setseperateDelete] = useState(false);
  const [files, setFile] = useState([]);
  const [UploadImageSet, setUploadImageSet] = useState(false);
  const [isDataCall, setisDataCall] = useState(false);
  const [selectfileafterfocus , setselectfileafterfocus] = useState(true)


  var isDataBind = false;
  var isfetch = false;
  var UMedia = media.length;
  var Upload_M = 0;


  const handleMessage = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
   
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      sendValue();
    }
  };

  const createCustomDateTime = (date, time, fromTimeZone) => {
    try {
      const currentDate = new Date();
      const fromTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      var convertedDate = moment(currentDate).tz(fromTimeZone);
      const formattedDate = convertedDate.format("YYYY-MM-DD HH:mm");
      return formattedDate;
    } catch (e) {
      console.log("An error occurred:", e);
    }
  };

  const sendValue = async () => {
    const Timestamp = Math.floor(Date.now() / 1000);
    var chatMessage = {
      id: "",
      senderName: localStorage.getItem("login_name"),
      senderId: localStorage.getItem("Id"),
      receiverName: "admin",
      receiverId: 0,
      role: "",
      timestamp: Timestamp,
      isMedia: files.length > 0 ? true : false,
      message: message,
      status: "MESSAGE",
      date: createCustomDateTime(),
    };

    if(files.length > 0){
      var mediaString = { id: "", timestamp: Timestamp, media: files };
      setMedia((prev) => [...prev, mediaString]);
    }
    try {
      sendMessage(chatMessage);
      setUploadImageSet(true);
      setMessage("");
      setFile([]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileChange = (event) => {
    Array.from(event.target.files).map((file) => {
      setFile((prev) => [...prev, file]);
    });
    setselectfileafterfocus(true)
  };

  const handleDeleteChatIconClick = (Chatid) => {
    
    setseperateDelete(true);
    setShowModal(true);
  };

  const handleDeleteChatCancelClick = () => {
    setDeleteIdsArray([]);
    setseperateDelete(false);
    setShowModal(false);
  };

  const handleDeleteMediaIconClick = (Chatid) => {
    setselectedMedia([Chatid]);
    setseperateDelete(true);
    setShowModal2(true);
  };

  const handleDeleteMediaCancelClick = () => {
    setselectedMedia([]);
    setseperateDelete(false);
    setShowModal2(false);
  };

  const handleselectChat = () => {
    setSelectChat(!SelectChat);
    if (!SelectChat) {
      setDeleteIdsArray([]);
      setselectedMedia([]);
    }
  };
  const handleselectChat1 = () => {
    if (!SelectChat) {
      setDeleteIdsArray([]);
      setselectedMedia([]);
    }
  };

  const handleDelete = () => {
    try {
      const DeleteIds = {
        ids: DeleteIdsArray,
        mediaIds: selectedMedia,
        isDeleteByUser: localStorage.getItem("rollID") === 1 ? false : true,
        isDeleteByAdmin: localStorage.getItem("rollID") === 1 ? true : false,
      };

       OnDeletedMessage(DeleteIds);
    
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearChat = async () => {
    try {

      const largestId = receiveMessages.reduce((maxId, currentObject) => {
        return currentObject.id > maxId ? currentObject.id : maxId;
      }, 0);

      
      const ClearJson = {
        userId : +localStorage.getItem("Id"),
        clearChatIds : [largestId],
        isClearByUser: true,//localStorage.getItem("rollID") === 1 ? false : true,
        isClearByAdmin: false//localStorage.getItem("rollID") === 1 ? true : false,
      }

      const formDataJson = JSON.stringify(ClearJson);

      await ClearChat(formDataJson);
      setClearChatModal(false);
      setReceiveMessages([])
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessageSelect = (itemId) => {
    if (DeleteIdsArray.includes(itemId)) {
      setDeleteIdsArray(DeleteIdsArray?.filter((id) => id !== itemId));
    } else {
      setDeleteIdsArray([...DeleteIdsArray, itemId]);
    }
  };

  const handleItemSelect = (itemId) => {
    if (selectedMedia.includes(itemId)) {
      setselectedMedia(selectedMedia?.filter((id) => id !== itemId));
    } else {
      setselectedMedia([...selectedMedia, itemId]);
    }
  };

  function deleteHandlerFront(image, index) {
    // setFile(null);
    setFile(files?.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }
  

  const [DeleteMessageArray,setDeleteMessageArray] = useState([])
  const [DeleteMediaArray,setDeleteMediaArray] = useState([])
  const [ClearMessageStatus,setClearMessageStatus] = useState('')

  const setDeleteeMessages = (deleteMdgIds) => {
    const updatedMessages = receiveMessages?.filter(
      (chat) => {return !deleteMdgIds?.includes(chat.id)}
    );
    // console.log(updatedMessages, deleteMdgIds, receiveMessages, "updatedMessages");
    setReceiveMessages(updatedMessages);
  }

  const [userName,setuserName] = useState("")
  const [userfirstName,setuserfirstName] = useState("")
  const [userlastName,setuserlastName] = useState("")

  const getUserInfoById = async () => {
    const userId = localStorage.getItem("Id");
    const payLoad = {
      id: userId,
    };
    try {
      const response = await axios.post(
        `${CommonConstants.BASE_URL}/getuserinfobyid`,
        payLoad
      );

      if(response.data.status === true && response.data.statuscode === 200){
        setuserName(response.data.data.fName+" "+response.data.data.lName)
        setuserfirstName(response.data.data.fName)
        setuserlastName(response.data.data.lName)
      }

    } catch (error) {
      console.error(error);
    }
  };

  const replacements = {
    "[username]": userName,
    "[firstname]": userfirstName,
    "[lastname]": userlastName
  };

  useEffect(() => {
    connect();
    setReceiveMessagesCallback((messages, status) => {
      if (status === "Delete") {
        setShowModal(false);
        setseperateDelete(false);
        setSelectChat(false);
        setDeleteMessageArray(messages.msgIds)
        setDeleteMediaArray(messages.mediaIds)
      } else if (status === "Cleared") {
          return setClearMessageStatus(status)
      } else {
        if (status === "JOIN" && isDataBind === false && isfetch === false && isDataCall == false) {
          isDataBind = true;
          isfetch = true;
          setisDataCall(true)
          setReceiveMessages([]);
          try {
            setloadervalue(true);
            const formData = new FormData();
            formData.append("id", localStorage.getItem("Id"));
            formData.append("isSender", false);
            formData.append("isShown", 0);

            const config = {
              method: "POST",
              url: CommonConstants.ChatBaseUrl + "/getchatmessages",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
            };
            axios(config)
              .then(function (response) {
                if (response.data.status === true) {
                  var GetChat = response.data.data?.filter((chat, index) => ((chat.senderId == +localStorage.getItem("Id")) || (chat.role === "admin" && (chat.receiverId == +localStorage.getItem("Id") ? true : chat.receiverId == ""))));
                  setReceiveMessages(GetChat)
                    // response.data.data.map((chat, index) => {
                    //   const isSender = chat.senderId == +localStorage.getItem("Id");
                    //   const isValidMessage = isSender || (chat.role === "admin" && (chat.receiverId == +localStorage.getItem("Id") ? true : chat.receiverId == ""));
                      
                    //   if(isValidMessage){
                    //     return setReceiveMessages((prevChats) => [...prevChats, chat]);
                    //   }
                    // })
                  setloadervalue(false);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } catch (err) {
            console.log(err);
          }
        }
        if(messages && status === "Upload"){
          if(messages.length > 0){
            const isSender = messages[0].senderId == +localStorage.getItem("Id");
            // const isReciver = messages[0].receiverId == +localStorage.getItem("Id");
            const isValidMessage = isSender || (messages[0].role === "admin" && (messages[0].receiverId == +localStorage.getItem("Id") ? true : messages[0].receiverId == ""));
            if(isValidMessage){
                messages.map((messagee, index) => {
                    return setReceiveMessages((prevChats) => [...prevChats, messagee]);
                  })
            }
          }
      } else if (messages) {
          messages.map((messagee, index) => {
            if (media.length > 0 && UMedia > 0 && messages.length === 1) {
              const checkMedia = media.filter(
                (mediaObject) => mediaObject.timestamp == messagee.timestamp
                );
                if (checkMedia?.length > 0) {
                  if (Upload_M === 0) {
                    const formData = new FormData();
                    formData.append("msgid", messagee.id);
                    for (let i = 0; i < checkMedia[0].media?.length; i++) {
                      formData.append("file", checkMedia[0]?.media[i]);
                    }
                    if (
                      UploadImageSet === true &&
                      checkMedia[0].media?.length > 0
                    ) {
                      UploadMedia(formData);
                      setUploadImageSet(false);
                      Upload_M = 1;
                      UMedia = 0;
                    }
                  }
                  setMedia([]);
                }
              } else {
                 if(messages[0].isMedia == false){
                  const isSender = messages[0].senderId == +localStorage.getItem("Id");
                  const isValidMessage = isSender || (messages[0].role === "admin" && (messages[0].receiverId == +localStorage.getItem("Id") ? true : messages[0].receiverId == ""));
                  if(isValidMessage){
                      return setReceiveMessages((prevChats) => [...prevChats, messagee]);
                  }
                }
              }
          });
        }
      }
    });
    return () => {};
  }, [media]);

  useEffect(()=>{

    if(DeleteMessageArray.length > 0 ){
      const updatedMessages = receiveMessages?.filter(
        (chat) => {return !DeleteMessageArray?.includes(chat?.id)}
      );
      setReceiveMessages(updatedMessages);
      setDeleteMessageArray([])
    }

    if(DeleteMediaArray.length > 0 ){
      
      const updatedObject = receiveMessages?.map(item => {
        const newItem = { ...item };
        newItem.media = newItem?.media?.filter(media => !DeleteMediaArray?.includes(media.id));
  
        return newItem;
      });
  
      setReceiveMessages(updatedObject);
      setShowModal2(false)
      setDeleteMediaArray([])
    }
    
    // if(ClearMessageStatus === 'Cleared'){
    // setClearMessageStatus('')
    //   return setReceiveMessages(receiveMessages.filter(
    //     (chat) => {return !localStorage.getItem("Id").includes(chat.senderId)}
    //   ))
    // }
  },[DeleteMessageArray,DeleteMediaArray])

  useEffect(()=>{
    if (inputRef.current || files?.length > 0) {
      inputRef.current.focus();
    }
  },[inputRef,files])

  useEffect(()=>{
    getUserInfoById()
  },[])

  const renderChat = (chat, index) => {
    const isSender = chat.senderId == +localStorage.getItem("Id");

    const ImagesArray = chat.media;

    // const isValidMessage =
    //   isSender ||
    //   (chat.role === "admin" &&
    //     (chat.receiverId == +localStorage.getItem("Id")
    //       ? true
    //       : chat.receiverId == ""));

    // if (isValidMessage) {
      if (isSender) {
        return (
          <>
            {chat.media &&
              chat.media != [] &&
              ImagesArray.map((Imges, I) => {
                return (
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <div className="chat-inner d-flex py-2 justify-content-end mt-4 align-items-end flex-column">
                        <div className="inner-chat-sec-recieve d-flex flex-column px-4 rounded-5 mx-3">
                          <small className="responsiveFontLarge  purpleText bolder py-2">
                            {chat.role == "admin"
                              ? "Customer service executive"
                              : chat.senderName}
                          </small>
                          <div
                            key={I}
                            className="d-flex py-2 flex-column justify-content-end align-items-end"
                          >
                            {Imges && Imges.filePath.endsWith(".pdf") ? (
                              // <iframe title="PDF Viewer" src={selectedFile} width="100%" height="600px" />
                              <>
                                <div className="my-2">
                                  <div className="content">
                                    <a
                                      href={Imges.filePath}
                                      className="text-decoration-none"
                                      target="_blank"
                                    >
                                      <div className="content-overlay"></div>
                                      <div className="pdf-preview">
                                        <img
                                          width="100"
                                          alt=""
                                          src={PDF1}
                                          className="pdf-icon"
                                        />
                                      </div>
                                      <div className="content-details fadeIn-bottom fadeIn-left">
                                        <DownloadIcon className="download-icon text-white" />{" "}
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="my-2">
                                <div className="content">
                                  <a href={Imges.filePath} target="_blank">
                                    <div className="content-overlay"></div>
                                    <img
                                      className="content-image"
                                      src={Imges.filePath}
                                      height="100"
                                      width="100"
                                      alt=""
                                    />
                                    <div className="content-details fadeIn-bottom fadeIn-left">
                                      <DownloadIcon className="download-icon text-white" />{" "}
                                      {/* Replace text with download icon */}
                                    </div>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`mx-3 d-flex mt-2 ms-4 justify-content-end align-items-end `}
                      >
                        <small className="mx-1">
                          {moment(chat.date, "YYYY-MM-DD HH:mm").format(
                            "hh:mm"
                          )}
                        </small>{" "}
                        |
                        <small className="mx-1">
                          {moment(chat.date, "YYYY-MM-DD HH:mm").format(
                            "MMM D"
                          )}
                        </small>{" "}
                        |
                        <img
                          src={bin}
                          className={`mx-1 img-fluid pointer ${
                            SelectChat ? "d-none" : "d-block"
                          }`}
                          height={20}
                          width={20}
                          onClick={(e) => {
                            handleDeleteMediaIconClick(Imges.id);
                          }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        name="selectedItems"
                        className={!SelectChat ? "d-none" : "d-block me-3"}
                        checked={selectedMedia.includes(Imges.id)}
                        onChange={() => handleItemSelect(Imges.id)}
                      />
                    </div>
                  </div>
                );
              })}

            {chat.message != "" ? (
              <>
                <div className="d-flex justify-content-end align-items-center">
                  <div className="chat-inner d-flex py-2 justify-content-end mt-4 align-items-end flex-column">
                    <div className="inner-chat-sec-recieve d-flex flex-column px-4 rounded-5 mx-3 py-2">
                      <small className="responsiveFontLarge  purpleText bolder py-2">
                        {chat.role == "admin"
                          ? "Customer service executive"
                          : chat.senderName}
                      </small>
                      <small className="responsiveFontLarge  text-black py-2">
                        {/* {chat.message} */}
                        {/* {chat.message?.includes("{username}","[username]") ? chat.message?.replace("{username}", "Customer service executive") : chat?.message} */}
                        {
                          chat.message.replace(/\[(username|firstname|lastname)]/g, (match) => {
                            return "Customer service executive"
                          })
                        }
                      </small>
                    </div>
                    <div className="mx-3 d-flex mt-2 ms-4">
                      <small className="mx-1">
                        {moment(chat.date, "YYYY-MM-DD HH:mm").format("hh:mm")}
                      </small>{" "}
                      |
                      <small className="mx-1">
                        {moment(chat.date, "YYYY-MM-DD HH:mm").format("MMM D")}
                      </small>{" "}
                      |
                      <img
                        src={bin}
                        className={`mx-1 img-fluid pointer ${
                          SelectChat ? "d-none" : "d-block"
                        }`}
                        height={20}
                        width={20}
                        onClick={(e) => {
                          handleDeleteChatIconClick(chat.id);
                          setDeleteIdsArray([chat.id]);
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name="selectedItems"
                      className={!SelectChat ? "d-none" : "d-block me-3"}
                      checked={DeleteIdsArray.includes(chat.id)}
                      onChange={() => handleMessageSelect(chat.id)}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        );
      } else {
        return (
          <>
            {chat.media &&
              chat.media != [] &&
              ImagesArray.map((Imges, I) => {
                return (
                  <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name="selectedItems"
                      className={!SelectChat ? "d-none" : "d-block"}
                      checked={selectedMedia.includes(Imges.id)}
                      onChange={() => handleItemSelect(Imges.id)}
                    />
                  </div>
                  <div className="chat-inner d-flex align-items-start my-3">
                    <img src={user} className="img-fluid" alt="" />
                    <div className="d-flex flex-column">
                      <div className="inner-chat-sec d-flex py-2 flex-column px-4 rounded-5 mx-3 ">
                        <small className="responsiveFontLarge  purpleText bolder py-2">
                          {chat.role == "admin"
                            ? " Customer service executive"
                            : chat.senderName}
                        </small>
                        <div
                          key={I}
                          className="d-flex py-2 flex-column justify-content-start align-items-start"
                        >
                          {Imges && Imges.filePath.endsWith(".pdf") ? (
                            // <iframe title="PDF Viewer" src={selectedFile} width="100%" height="600px" />
                            <div className="my-2">
                              <div className="content">
                                <a
                                  href={Imges.filePath}
                                  className="text-decoration-none"
                                  target="_blank"
                                >
                                  <div className="content-overlay"></div>
                                  <div className="pdf-preview">
                                    <img
                                      width="100"
                                      alt=""
                                      src={PDF1}
                                      className="pdf-icon"
                                    />
                                  </div>
                                  <div className="content-details fadeIn-bottom fadeIn-left">
                                    <DownloadIcon className="download-icon text-white" />{" "}
                                  </div>
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="my-2">
                              <div className="content">
                                <a href={Imges.filePath} target="_blank">
                                  <div className="content-overlay"></div>
                                  <img
                                    className="content-image"
                                    src={Imges.filePath}
                                    height="100"
                                    width="100"
                                    alt=""
                                  />
                                  <div className="content-details fadeIn-bottom fadeIn-left">
                                    <DownloadIcon className="download-icon text-white" />{" "}
                                    {/* Replace text with download icon */}
                                  </div>
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mx-3 d-flex mt-2 ms-4">
                        <small className="mx-1">
                          {moment(chat.date, "YYYY-MM-DD HH:mm").format(
                            "hh:mm"
                          )}
                        </small>{" "}
                        |
                        <small className="mx-1">
                          {moment(chat.date, "YYYY-MM-DD HH:mm").format(
                            "MMM D"
                          )}
                        </small>{" "}
                        {/* |
                  <img
                    src={bin}
                    className="mx-1 img-fluid pointer"
                    height={20}
                    width={20}
                    alt=""
                    onClick={(e)=>{handleDeleteIconClick(chat.id)}}
                  /> */}
                      </div>
                    </div>
                  </div>
                  </div>
                );
                // </div>
              })}

            {chat.message != "" ? (
               <div className="d-flex justify-content-start align-items-center">
               <div className={!SelectChat ? "" : "me-3"}>
                 <input
                   type="checkbox"
                   id={`checkbox-${index}`}
                   name="selectedItems"
                   className={!SelectChat ? "d-none" : "d-block"}
                   checked={DeleteIdsArray.includes(chat.id)}
                   onChange={() => handleMessageSelect(chat.id)}
                 />
               </div>
              <div className="chat-inner d-flex align-items-start my-3">
                <img src={user} className="img-fluid" alt="" />
                <div className="d-flex flex-column ">
                  <div className="inner-chat-sec d-flex py-2 flex-column px-4 rounded-5 mx-3 ">
                    <small className="responsiveFontLarge  purpleText bolder py-2">
                      {chat.role == "admin"
                        ? " Customer service executive"
                        : chat.senderName}
                    </small>
                    <small className="responsiveFontLarge  text-black py-2 ">
                      {/* {chat.message} */}
                      {/* {chat.message?.includes("{username}","[username]") ? chat.message?.replace("{username}", userName) : chat?.message} */}
                      {
                        chat.message.replace(/\[(username|firstname|lastname)]/g, (match) => {
                          return replacements[match];
                        })
                      }
                    </small>
                  </div>
                  <div className="mx-3 d-flex mt-2 ms-4"></div>
                  <div className="mx-3 d-flex mt-2 ms-4">
                    <small className="mx-1">
                      {moment(chat.date, "YYYY-MM-DD HH:mm").format("hh:mm")}
                    </small>{" "}
                    |
                    <small className="mx-1">
                      {moment(chat.date, "YYYY-MM-DD HH:mm").format("MMM D")}
                    </small>{" "}
                    |
                   <img
                  src={bin}
                  className="mx-1 img-fluid pointer"
                  height={20}
                  width={20}
                  alt=""
                  onClick={(e)=>{
                    handleDeleteChatIconClick(chat.id);
                    setDeleteIdsArray([chat.id]);
                  }}
                />
                  </div>
                </div>
              </div>
              </div>
            ) : (
              ""
            )}
          </>
        );
      }
  };

  return (
    <>
      <section className="abtPage">
      {loadervalue == true ? <Loader /> : ""}
        <NavBar></NavBar>
        <Container className="ps-4 pe-4 bg-white py-2  rounded-4 mb-5">
          <div className="d-flex respoChildFooter">
            <div className="headerText py-3">
              <h1 className="purpleText bolder text-center responsiveFontLargeHeading">
                Chat with us
              </h1>
            </div>
            <div className="buttonActions d-flex align-items-center respoChildFooter col-lg-6 justify-content-end ms-auto">
              <div
                className={`d-flex align-items-center pointer ${receiveMessages.length > 0 ? "d-block" : "d-none" }`}
                onClick={(e) => {
                  setClearChatModal(true);
                }}
              >
                <img src={bin} className="img-fluid" alt="" />
                <div className="responsiveFontLarge  text-danger bolder ms-2 w-100 d-block">
                  {" "}
                  Clear Chat
                </div>
              </div>
              {/* <Button className="btn btn-primary col-lg-3 fullRoundedCorner bg-transparent responsiveFontLarge purpleText btnTrans bolder">
                <i className="fa fa-phone purpleText" aria-hidden="true"></i>{" "}
                Call Us
              </Button> */}

              <Button
                className={`btn btn-primary col-lg-3 fullRoundedCorner bg-transparent responsiveFontLarge purpleText btnTrans bolder ${receiveMessages.length > 0 ? "d-block" : "d-none" }`}
                onClick={(e) => {
                  handleselectChat();
                }}
              >
                {/* <i className="fa fa-phone purpleText" aria-hidden="true"></i>{" "} */}
                {!SelectChat ? "Select" : "Unselect"}
              </Button>
              <div
                className={` d-flex align-items-center pointer ${receiveMessages.length > 0 ? "d-block" : "d-none" }
                 ${
                  !SelectChat ? "d-none" : "d-block"
                }`}
                onClick={(e) => {
                  setShowModal(true);
                }}
              >
                <img src={bin} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
          <div className="chat-main pbDowSt">
          <div className="ScrollChatScreen d-flex flex-column-reverse">
            {receiveMessages.slice().reverse().map((chat, index) => renderChat(chat, index))}
            </div>
          </div>
          <div className="innerTextMain my-4">
            <Row className="">
              <div className="d-flex align-items-center justify-content-center ">
                <div
                  className={`left-inner-addon purpleBorder mainChatPreviewContainer pb-0  input-container required col-lg-11 border-bottom-0 d-flex OverFlow ${
                    files.length === 0 ? "d-none" : "d-block"
                  }`}
                >
                  {files &&
                    files.map((file, i) => (
                      <div className="py-4 pt-0 mx-4" key={i}>
                        <div>
                          <img
                            src={closeVector}
                            className="img-fluid vector-main pointer"
                            alt=""
                            onClick={(e) => {
                              deleteHandlerFront(file, i);
                            }}
                          />
                        </div>
                        {file.type.includes("image") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            height="100"
                            width="100"
                            className="previewMain"
                          />
                        ) : (
                          <div className="pdf-preview">
                            <img
                              src={PDF1}
                              alt="PDF Preview"
                              height="100"
                              width="100"
                              className="previewMain"
                            />
                          </div>
                        )}
                        <br />
                      </div>
                    ))}
                </div>
                <div
                        className="rounded-5 sendBtn invisiblesendBtn purpleBackground invisible"
                        // onClick={sendValue}
                      >
                        <i className="fa-solid fa-paper-plane text-white "></i>
                      </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Form.Group
                  as={Col}
                  className="left-inner-addon pb-0 input-container  required col-lg-11 px-0"
                >
                  <div>
                    <label htmlFor="fileInput" className="fileINP">
                      {/* Paperclip icon to trigger image selection */}
                      <span
                        role="img"
                        aria-label="attachment-icon"
                        className="purpleText"
                      >
                        <i className="fa fa-paperclip purpleText" />
                      </span>
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf"
                      // accept="image/png , image/jpeg, image/jpg, application/pdf"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />

                    <Form.Control
                      as="textarea"
                      rows={1}
                      required
                      placeholder="Type your message here"
                      name="message"
                      value={message}
                      ref={inputRef}
                      onChange={handleMessageChange}
                      onKeyPress={handleInputKeyPress}
                      className={`py-3 position-relative formControlStep2 reflink link bg-transparent ${
                        files.length == 0
                          ? "py-3 mainChatPreviewContainer"
                          : "py-3 mainChatPreview"
                      }`}
                    />
                   {/* <Form.Control
                      as="textarea"
                      rows={1}
                      required
                      placeholder="Type your message here"
                      name="message"
                      value={message}
                      onChange={handleMessageChange}
                      onKeyPress={handleInputKeyPress}
                      className={`py-3 position-relative formControlStep2 reflink link bg-transparent ${
                        files.length == 0
                          ? "py-3 mainChatPreviewContainer"
                          : "py-3 mainChatPreview"
                      }`}
                    /> */}
                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Type your message here
                    </small>
                  </div>
                </Form.Group>
                <div
                  className="rounded-5 sendBtn purpleBackground ms-3"
                  onClick={sendValue}
                >
                  <i className="fa-solid fa-paper-plane text-white "></i>
                </div>
              </div>
            </Row>
          </div>

          <Modal
            show={showModal}
            onHide={(e) => {
              setShowModal(false);
            }}
            centered
          >
            {/* <Modal.Header className="" closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className="fs-6 mt-4 text-black">
              Are you sure you want to delete this chat?
            </Modal.Body>
            <Modal.Footer className="">
              <div className="d-flex ms-auto ">
                <Button
                  className="purpleBorder purpleText"
                  variant="outline-primary"
                  onClick={(e) => {
                    handleDeleteChatCancelClick();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="purpleBackground border-0"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showModal2}
            onHide={(e) => {
              handleDeleteMediaCancelClick();
            }}
            centered
          >
            {/* <Modal.Header className="" closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className="fs-6 mt-4 text-black">
              Are you sure you want to delete this chat?
            </Modal.Body>
            <Modal.Footer className="">
              <div className="d-flex ms-auto ">
                <Button
                  className="purpleBorder purpleText"
                  variant="outline-primary"
                  onClick={(e) => {
                    handleDeleteMediaCancelClick();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="purpleBackground border-0"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal
            show={ClearChatModal}
            onHide={(e) => {
              setClearChatModal(false);
            }}
            centered
          >
            {/* <Modal.Header className="" closeButton>
              <Modal.Title>Confirm Clear Chat</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className="text-black fs-6 mt-4">
              Are you sure you want to Clear this chat?
            </Modal.Body>
            <Modal.Footer className="">
              <div className="d-flex ms-auto ">
                <Button
                  className="purpleBorder purpleText"
                  variant="outline-primary"
                  onClick={(e) => {
                    setClearChatModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="purpleBackground border-0"
                  onClick={(e) => {
                    handleClearChat();
                  }}
                >
                  Clear
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
