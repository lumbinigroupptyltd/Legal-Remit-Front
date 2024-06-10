import React, { useState, useRef, useEffect } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import axios from "axios";
import { Container, Button, Col, Form, Row, Modal } from "react-bootstrap";
import bin from "../../assets/images/deletBg.svg";
import user from "../../assets/images/userFill.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommonConstants } from "../../Constants/common.constants";
import moment from "moment-timezone";
import closeVector from "../../assets/images/close.svg";
import DownloadIcon from "@mui/icons-material/Download";
import Doc1 from "../../assets/images/doc.png";
import PDF1 from "../Chat/PDF.png";
import {
  sendMessage,
  ClearChat,
  connect,
  UploadMedia,
  userJoin,
  setReceiveMessagesCallback,
  OnDeletedMessage,
} from "../../Constants/websocket";
import Conference from "./Calls/Conference";
import { useNavigate} from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Chat({ individualuserData }) {
  const inputRef = useRef();
  const hmsActions = useHMSActions();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [seperateDelete, setseperateDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showNotificationSection, setShowNotificationSection] = useState(false);
  const [message, setMessage] = useState("");
  const [receiveMessages, setReceiveMessages] = useState([]);
  const [files, setFile] = useState([]);
  const [media, setMedia] = useState([]);
  const [ClearChatModal, setClearChatModal] = useState(false);
  const [DeleteIdsArray, setDeleteIdsArray] = useState([]);
  const [selectedMedia, setselectedMedia] = useState([]);
  const [SelectChat, setSelectChat] = useState(false);
  const [UploadImageSet, setUploadImageSet] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loadervalue, setloadervalue] = useState(false);
  const [showConference, setShowConference] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [userfirstName, setuserfirstName] = useState("");
  const [userlastName, setuserlastName] = useState("");
  const [isDataCall, setisDataCall] = useState(false);

  const history = new useNavigate();
  const [GetAllNotification, setGetAllNotification] = useState([]);

  var isfetch = false;
  var isDataBind = false;
  var UMedia = media.length;
  var Upload_M = 0;

  const sendCallData = async () => {
    document.getElementById("callSection").style.display = "block";
    document.getElementById("chatSection").style.display = "none";
    document.getElementById("chatSection1").style.display = "none";
    const senderId = localStorage.getItem("Id");
    const userData = new FormData();
    userData.append("senderId", senderId);
    userData.append("receiverId", individualuserData);
    try {
      const requestData = await axios.post(
        CommonConstants.ChatBaseUrl + "/createcall",
        userData
      );
      if (requestData.data && requestData.data.status === true) {
        const meetingUrl = requestData.data.data.meeting_url;
        if (meetingUrl) {
          const code = meetingUrl.match(/\/meeting\/([^/]+)$/);
          if (code && code[1]) {
            setloadervalue(true);
            const extractedCode = code[1];
            // Define a function to get the authentication token asynchronously
            const getAuthToken = async () => {
              return await hmsActions.getAuthTokenByRoomCode({
                roomCode: extractedCode,
              });
            };
            try {
              const authToken = await getAuthToken(); // Wait for the token
              const uName = "Admin";
              await hmsActions.join({ uName, authToken });
              // navigate("/call");
              setloadervalue(false);
              setShowConference(!showConference);
            } catch (e) {
              console.error(e);
            }
          } else {
            console.log("Code not found in the URL");
          }
        } else {
          console.log("Meeting URL is missing");
        }
      } else {
        console.log("Invalid response data or status is not true");
      }
    } catch (error) {
      console.error("Error while fetching call data:", error);
    }
  };

  var UserDataFlag = false;

  // const getUserInfoById = async (userid) => {
  //   const payLoad = {
  //     id: userid
  //   };
  //   try {
  //     const response = await axios.post(
  //       `${CommonConstants.BASE_URL}/getuserinfobyid`,
  //       payLoad
  //     );

  //     if(response.data.status === true && response.data.statuscode === 200){
  //       setUserName(response.data.data.fName+" "+response.data.data.lName)
  //       UserDataFlag = true;
  //     }

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useState(()=>{
  //   if(individualuserData && UserDataFlag == false){
  //     getUserInfoById(individualuserData)
  //   }
  // },[individualuserData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloadervalue(true);
    // use room code to fetch auth token
    const roomCode = "adf-xbsc-ppj";
    const userName = "admin";
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

    try {
      await hmsActions.join({ userName, authToken });
      navigate("/call");
      setloadervalue(false);
      setShowConference(!showConference);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMessageChange = (event) => {
    // const { value } = event.target;
    setMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      sendValue();
    }
  };

  const handleFileChange = (event) => {
    Array.from(event.target.files).map((file) => {
      setFile((prev) => [...prev, file]);
    });
  };

  function deleteHandlerFront(image, index) {
    setFile(files?.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

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
      receiverName: userData.fName + " " + userData.lName,
      receiverId: userData.id,
      role: "admin", // set individual user id role
      timestamp: Timestamp,
      isMedia: files.length > 0 ? true : false,
      message: message,
      status: "MESSAGE",
      date: createCustomDateTime(),
    };
    if (files.length > 0) {
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

  const replacements = {
    "[username]": userName,
    "[firstname]": userfirstName,
    "[lastname]": userlastName,
  };

  const category = [
    "Account Created",
    "Account Closed",
    "Account Deleted",
    "Send Otp",
    "Forgot Password",
    "Verified Email",
    "Register Email",
    "Transaction notify",
    "Transaction submitted",
    "Transaction refund",
    "Transaction cancel",
    "Additional Document request",
    "Report of Fraud",
    "Support",
    "Refund Request",
    "Birthday Notification",
  ];

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

  const handleNotification = async () => {
    try {
      const NotificationObject = {
        pageindex: 1,
        pagesize: 100,
        searchdata: "",
        sortparam: "created_at",
        sortorder: "DESC",
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallnotificationtemplates",
        NotificationObject
      );
      if (response.data.status === true) {
        setGetAllNotification(response.data?.data);
      }
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
        userId: userData?.id, //localStorage.getItem("Id"),
        clearChatIds: [largestId],
        isClearByUser: false, //localStorage.getItem("rollID") === 1 ? false : true,
        isClearByAdmin: true, //localStorage.getItem("rollID") === 1 ? true : false,
      };
      const formDataJson = JSON.stringify(ClearJson);

      await ClearChat(formDataJson);
      setClearChatModal(false);
      setReceiveMessages([]);
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

  const handleCategoryChange = (event) => {
    let arr = event.target?.value.split("&&");
    setSelectedCategory(arr[0]);
    setMessage(arr[1]);
  };

  const toggleNotificationSection = () => {
    setShowNotificationSection(!showNotificationSection);
  };

  const [showCall, setCall] = useState(false);

  const toggleCall = () => {
    document.getElementById("callSection").style.display = "block";
    document.getElementById("chatSection").style.display = "none";
    document.getElementById("chatSection1").style.display = "none";
  };

  const [DeleteMessageArray, setDeleteMessageArray] = useState([]);
  const [DeleteMediaArray, setDeleteMediaArray] = useState([]);
  const [ClearMessageStatus, setClearMessageStatus] = useState("");

  useEffect(() => {
    document.getElementById("callSection").style.display = "none";
    handleNotification();
    let ConnectUserId = 0;
    axios
      .post(`${CommonConstants.BASE_URL}/getuserinfobyid`, {
        id: individualuserData,
      })
      .then((res) => {
        setUserData(res.data.data);
        setUserName(res.data.data?.fName + " " + res.data.data?.lName);
        setuserfirstName(res.data.data?.fName);
        setuserlastName(res.data.data?.lName);
        ConnectUserId = res.data.data?.id;
        connect();
      });
      
    setReceiveMessagesCallback((messages, status) => {
      if (status === "Delete") {
        setShowModal(false);
        setseperateDelete(false);
        setSelectChat(false);
        setDeleteMessageArray(messages.msgIds);
        setDeleteMediaArray(messages.mediaIds);
      } else if (status === "Cleared") {
        return setClearMessageStatus(status);
      } else {
        if (
          status === "JOIN" &&
          isDataBind === false &&
          isfetch === false &&
          isDataCall == false
        ) {
          isDataBind = true;
          isfetch = true;
          setisDataCall(true);
          setReceiveMessages([]);
          try {
            setloadervalue(true);
            const formData = new FormData();
            formData.append("id", ConnectUserId);
            formData.append("isSender", false);
            formData.append("isShown", 1);

            const config = {
              method: "POST",
              url: CommonConstants.ChatBaseUrl + "/getchatmessages",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
            };

            axios(config)
              .then(function (response) {
                if (response.data.status === true) {

                  var GetChat = response.data.data?.filter((chat, index) => ((chat.senderId == ConnectUserId) || (chat.role === "admin" && (chat.receiverId == ConnectUserId ? true : chat.receiverId == ""))));
                  setReceiveMessages(GetChat)

                  // response.data.data.map((chat, index) => {
                  //   const isSender = chat.senderId == ConnectUserId;
                  //   const isValidMessage =
                  //     isSender ||
                  //     (chat.role === "admin" &&
                  //       (chat.receiverId == ConnectUserId
                  //         ? true
                  //         : chat.receiverId == ""));

                  //   if (isValidMessage) {
                  //     return setReceiveMessages((prevChats) => [
                  //       ...prevChats,
                  //       chat,
                  //     ]);
                  //   }
                  // });
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
        if (messages && status === "Upload") {
          if (messages.length > 0) {
            const isSender = messages[0].senderId == ConnectUserId;
            const isValidMessage =
              isSender ||
              (messages[0].role === "admin" &&
                (messages[0].receiverId == ConnectUserId
                  ? true
                  : messages[0].receiverId == ""));
            if (isValidMessage) {
              messages.map((messagee, index) => {
                return setReceiveMessages((prevChats) => [
                  ...prevChats,
                  messagee,
                ]);
              });
            }
          }
        } else if (messages) {
          messages.map((messagee, index) => {
            if (media.length > 0 && UMedia > 0 && messages.length === 1) {
              const checkMedia = media?.filter(
                (mediaObject) => mediaObject.timestamp == messagee.timestamp
              );
              if (checkMedia?.length > 0) {
                if (Upload_M === 0) {
                  const formData = new FormData();
                  formData.append("msgid", messagee?.id);
                  for (let i = 0; i < checkMedia[0]?.media?.length; i++) {
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
              if (messages[0].isMedia == false) {
                const isSender = messagee.senderId == ConnectUserId;
                const isValidMessage =
                  isSender ||
                  (messagee.role === "admin" &&
                    (messagee.receiverId == ConnectUserId
                      ? true
                      : messagee.receiverId == ""));

                if (isValidMessage) {
                  return setReceiveMessages((prevChats) => [
                    ...prevChats,
                    messagee,
                  ]);
                }
              }
            }
          });
        }
      }
    });
    // Optionally, you can also call the disconnect function when the component unmounts to close the WebSocket connection.
    return () => { };
  }, [media, showCall, individualuserData]);

  useEffect(() => {
    if (DeleteMessageArray.length > 0) {
      const updatedMessages = receiveMessages.filter((chat) => {
        return !DeleteMessageArray.includes(chat.id);
      });
      setReceiveMessages(updatedMessages);
    }

    if (DeleteMediaArray.length > 0) {
      const updatedObject = receiveMessages.map((item) => {
        if (item.media <= 1 && item.message == "") {
        } else {
          const newItem = { ...item };
          newItem.media = newItem.media.filter(
            (media) => !DeleteMediaArray.includes(media.id)
          );

          return newItem;
        }
      });

      setReceiveMessages(updatedObject);
      setShowModal2(false);
      setDeleteMediaArray([]);
    }

    // if (ClearMessageStatus === 'Cleared') {
    //   setClearMessageStatus('')
    //   return setReceiveMessages(receiveMessages.filter(
    //     (chat) => { return ![userData.id].includes(chat.senderId) }
    //   ))
    // }
  }, [DeleteMessageArray, DeleteMediaArray]);

  useEffect(() => {
    if (inputRef.current || files?.length > 0) {
      inputRef.current.focus();
    }
  }, [inputRef, files]);

  const renderChat = (chat, index) => {
    const isSender = chat.senderId == userData.id;
    const ImagesArray = chat.media;
    if (isSender) {
      return (
        <>
          {chat.media &&
            chat.media != [] &&
            ImagesArray.map((Imges, I) => {
              return (
                <div
                  className="d-flex justify-content-end align-items-center"
                  onClick={() => {
                    document.body.classList.remove("offcanvas-active");
                  }}
                >
                  <div>
                    <div className="chat-inner d-flex py-2 justify-content-end mt-4 align-items-end flex-column">
                      <div className="inner-chat-sec-recieve d-flex flex-column px-4 rounded-5 mx-3">
                        <small className="responsiveFontLarge  purpleText bolder py-2">
                          {/* {chat.role == "admin"
                              ? " Customer service executive"
                              : chat.senderName} */}
                          {chat.senderName}
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
                                {/* <small className="d-block mt-2 text-center text-bloack medium">
                                    {Imges.filePath.substring(Imges.filePath.lastIndexOf('/') + 1)}
                                  </small> */}
                                {/* <div className="mx-3 d-flex mt-2 ms-4">
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
                                      className={`mx-1 img-fluid pointer ${SelectChat ? "d-none" : "d-block"}`}
                                      height={20}
                                      width={20}
                                      onClick={(e) => {
                                        handleDeleteMediaIconClick(Imges.id);
                                      }}
                                      alt=""
                                    />
                                  </div> 
                                  */}
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
                      className={`mx-3 d-flex mt-2 ms-4 justify-content-end align-items-end`}
                    >
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
                        className={`mx-1 img-fluid pointer ${SelectChat ? "d-none" : "d-block"
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
                    <small className="responsiveFontLarge  purpleText bolder py-2 fs-6">
                      {/* {chat.role == "admin"
                          ? " Customer service executive"
                          : chat.senderName} */}
                      {chat.senderName}
                    </small>
                    <small className="responsiveFontLarge  text-black py-2">
                      {/* {chat.message} */}
                      {chat.message?.includes(
                        "[username]",
                        "[firstname]",
                        "[lastname]"
                      )
                        ? chat.message.replace(
                          /\[(username|firstname|lastname)]/g,
                          (match) => {
                            return "Customer service executive";
                          }
                        )
                        : chat?.message}
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
                      className={`mx-1 img-fluid pointer ${SelectChat ? "d-none" : "d-block"
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
                          {/* {chat.role == "admin"
                              ? " Customer service executive"
                              : chat.senderName} */}
                          {chat.senderName}
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
                        |
                        <img
                          src={bin}
                          className={`mx-1 img-fluid pointer ${SelectChat ? "d-none" : "d-block"
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
                  </div>
                </div>
              );
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
                      {/* {chat.role == "admin"
                          ? " Customer service executive"
                          : chat.senderName} */}
                      {chat.senderName}
                    </small>
                    <small className="responsiveFontLarge  text-black py-2 fs-6">
                      {/* {chat.message} */}
                      {chat.message?.includes(
                        "[username]",
                        "[firstname]",
                        "[lastname]"
                      )
                        ? chat.message.replace(
                          /\[(username|firstname|lastname)]/g,
                          (match) => {
                            return replacements[match];
                          }
                        )
                        : chat?.message}
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
                      onClick={(e) => {
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
    <Container fluid className="bg-white py-2 rounded-4">
      {loadervalue == true ? <Loader /> : ""}
      {showConference ? (
        <Conference />
      ) : (
        <>
          <div className="d-flex respoChildFooter">
            <div className="headerText py-3">
              <h1 className="purpleText bolder text-center responsiveFontLargeHeading"></h1>
            </div>
            <div className="buttonActions d-flex align-items-center respoChildFooter col-lg-6 justify-content-end ms-auto">
              <div
                className={`d-flex respoChildFooter align-items-center pointer  ${receiveMessages.length > 0 ? "d-block" : "d-none"
                  }`}
                onClick={(e) => {
                  setClearChatModal(true);
                }}
              >
                <img src={bin} className="img-fluid" alt="" />
                <div className="responsiveFontLarge text-danger bolder ms-2 w-100 d-block">
                  {" "}
                  Clear Chat
                </div>
              </div>

              <Button
                className="btn btn-primary col-lg-3 fullRoundedCorner bg-transparent responsiveFontLarge purpleText btnTrans bolder"
                onClick={(e) => {
                  sendCallData(e);
                }}
              // onClick={toggleCall}
              >
                <i className="fa fa-phone purpleText" aria-hidden="true"></i>{" "}
                Call
              </Button>

              <Button
                className={`btn btn-primary col-lg-3 fullRoundedCorner bg-transparent responsiveFontLarge purpleText btnTrans bolder  ${receiveMessages.length > 0 ? "d-block" : "d-none"
                  }`}
                onClick={(e) => {
                  handleselectChat();
                }}
              >
                {/* <i className="fa fa-phone purpleText" aria-hidden="true"></i>{" "} */}
                {!SelectChat ? "Select" : "Unselect"}
              </Button>

              <div
                className={` d-flex align-items-center pointer  ${receiveMessages.length > 0 ? "d-block" : "d-none"
                  } ${!SelectChat ? "d-none" : "d-block"}`}
                onClick={(e) => {
                  setShowModal(true);
                }}
              >
                <img src={bin} className="img-fluid" alt="" />
              </div>
            </div>
          </div>

          <div className="">
            {/* <div className="chat-main">
                {receiveMessages.map((chat, index) => renderChat(chat, index))}
              </div> */}
            <div className="ScrollChatScreen1 d-flex flex-column-reverse" id="chatSection">
              {receiveMessages
                .slice()
                .reverse()
                .map((chat, index) => renderChat(chat, index))}
            </div>
          </div>
          {/* conference Div */}
          <div id="callSection">
            <Conference />
          </div>
          {/* eod confrernce */}

          <div className="innerTextMain" id="chatSection1">
            <Row className="">
              {/* Chat section */}
              <div className="d-flex align-items-center px-0">
                <div
                  className={` purpleBorder mainChatPreviewContainer pb-0 input-container required mainChatApp1 border-bottom-0 d-flex OverFlow ${files.length === 0 ? "d-none" : "d-block"
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
             
              </div>
              {/* Eod chat section */}

      
              <div className="left-inner-addon  px-0 d-flex align-items-center respoChildFooter">   
             
                  <div className="w-100 pbSt mx-1">
                    <label htmlFor="fileInput" className="fileINP ">
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
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />

                    <Form.Control
                      type="text"
                      required
                      placeholder="Type your message here"
                      name="message"
                      value={message}
                      ref={inputRef}
                      onChange={handleMessageChange}
                      onKeyPress={handleInputKeyPress}
                      className={` position-relative formControlStep2 reflink link bg-transparent ${files.length == 0
                          ? "mainChatPreviewContainer"
                          : "mainChatPreview"
                        }`}
                    />

                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Type your message here
                    </small>
              
                  </div>

                  <div className="d-flex w-100 mx-1">
                  <Form.Select
                      // value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="aa"
                    >
                      <option value="">Select an option</option>
                      {GetAllNotification.map((notification, index) => (
                        <option
                          key={index}
                          value={
                            notification?.title +
                            "&&" +
                            notification?.description
                          }
                        >
                          {notification?.title}
                        </option>
                      ))}
                    </Form.Select>
                    <div className="d-flex">
                  <div
                    className="rounded-5 sendBtn1 kk w-auto px-3 pointer purpleBackground "
                    onClick={sendValue}
                  >
                    <i className="fa-solid fa-paper-plane text-white "></i>
                  </div>
                  <div
                    className="rounded-5 sendBtn1 w-auto px-3 pointer purpleBackground mx-2"
                    onClick={toggleNotificationSection}
                  >
                    <i className="fa-solid fa-bell text-white "></i>
                  </div>
                  </div>
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
            <Modal.Body>Are you sure you want to delete this chat?</Modal.Body>
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
            <Modal.Body className="text-black fs-6 mt-4">
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
        </>
      )}
    </Container>
  );
}
