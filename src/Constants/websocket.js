import { over } from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import moment from 'moment-timezone';
import { CommonConstants } from "./common.constants";
var stompClient = null;
let receiveMessagesCallback = null;
var IsConected = false;

const setReceiveMessagesCallback = (callback) => {
  receiveMessagesCallback = callback;
};


const OnDeletedMessage = (deletmessageid) => {
  stompClient.send("/app/deletechatmessage", {}, JSON.stringify(deletmessageid))
  return;
};

const connect = () => {
  if (IsConected === false) {
    let Sock = new SockJS(CommonConstants.WebScoketURL);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    return
  } else {
    receiveMessagesCallback([], "JOIN");
  }
};

const onConnected = async () => {
  try {
    await stompClient.subscribe("/chatroom/public", onMessageReceived);
    userJoin();
  } catch (error) {
    console.error("Error subscribing:", error);
  }
};

const createCustomDateTime = (date, time, fromTimeZone) => {
  try {
    const currentDate = new Date();
    const fromTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var convertedDate = moment(currentDate).tz(fromTimeZone)
    const formattedDate = convertedDate.format('YYYY-MM-DD HH:mm');
    return formattedDate;
  } catch (e) {
    console.log("An error occurred:", e);
  }
};

const userJoin = () => {
  var chatMessage = {
    id: "",
    senderName: "",
    senderId: "",
    receiverName: "",
    receiverId: 0,
    role: "",
    message: "Loading",
    status: "JOIN",
    date: createCustomDateTime()
  };
  stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  IsConected = true;
};

const sendMessage = (senderMessage) => {
  if (stompClient) {
    stompClient.send("/app/message", {}, JSON.stringify(senderMessage));
    return;
  }
};

const UploadMedia = async (senderMedia) => {
  try {
    if (stompClient) {
      const config = {
        method: "POST",
        url: CommonConstants.ChatBaseUrl + "/uploadmedia",
        headers: { "Content-Type": "multipart/form-data" },
        data: senderMedia
      };
      await axios(config).then((Response) => {
        const NewObj =
        {
          "id": Response.data.data.id,
          "senderId": Response.data.data.senderId,
          "receiverId": Response.data.data.receiverId,
          "senderName": Response.data.data.senderName,
          "receiverName": Response.data.data.receiverName,
          "role": Response.data.data.role,
          "message": Response.data.data.message,
          "isMedia": false,//Response.data.data.isMedia,
          "media": Response.data.data.media,
          "status": "Upload",
          "date": Response.data.data.date,
          "timestamp": Response.data.data.timestamp,
          "createdAt": Response.data.data.createdAt,
          "read": Response.data.data.read,
          "deleted": Response.data.data.deleted
        }
        stompClient.send("/app/message", {}, JSON.stringify(NewObj));
      })
    }
  } catch (err) {
    console.log(err)
  }
};

const ClearChat = async (objClearMessage) => {
  try {
    if (stompClient) {
      stompClient.send("/app/clearchat", {}, objClearMessage)
    }
  } catch (err) {
    console.log(err)
  }
};

const onMessageReceived = async (payload) => {
  var payloadData = {}
  payloadData = JSON.parse(payload.body);

  if (payloadData?.length > 0) {
    if (payloadData[0].status === "JOIN" || payloadData[0].status === "MESSAGE" || payloadData[0].status === "Upload") {
      switch (payloadData[0].status) {
        case "JOIN":
          receiveMessagesCallback([], payloadData[0].status);
          break;
        case "MESSAGE":
          receiveMessagesCallback(payloadData, payloadData[0].status);
          showNotification(payloadData[0].message);
          break;
        case "Upload":
          receiveMessagesCallback(payloadData, payloadData[0].status);
          break;
        default:
          break;
      }
    }
  } else if (payloadData.status === true) {
    switch (payloadData.message) {
      case "Delete":
        receiveMessagesCallback(payloadData, payloadData.message);
        break;
      case "Cleared":
        receiveMessagesCallback([payloadData], payloadData.message);
        // userJoin();
        break;
      default:
        break;
    }
  }
};

const onError = (err) => {
  console.log(err);
};

function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("WebSocket Notification", { body: message });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification("WebSocket Notification", { body: message });
      }
    });
  }
}
export default stompClient;
export { connect, sendMessage, ClearChat, UploadMedia, setReceiveMessagesCallback, userJoin, IsConected, OnDeletedMessage };
