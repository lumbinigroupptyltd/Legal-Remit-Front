// const envType = import.meta.env.MODE;
export const contextPath = () => {
  return window.location.pathname.substring(
    0,
    window.location.pathname.indexOf("/", 2)
  );
};

// export const getBaseUrl = () => {
//   if (envType === "development") {
//     return "https://core1.dev.legalremit.com";
//   } else if (envType === "production") {
//     let path = window.localStorage.getItem("legal-path");

//     path = path ? path + "/" : null;
//     return path || contextPath() + "/";
//   }
// };

export const CORE_BASE_URL = "https://core1.dev.legalremit.com";
export const TRANSACTION_BASE_URL = "https://transaction.dev.legalremit.com";
export const COMPLIENCE_BASE_URL = "https://compliance.dev.legalremit.com";
export const CHAT_BASE_URL = "https://chat.dev.legalremit.com";

export const getBaseUrl = () => {
    return "https://core1.dev.legalremit.com";
};
export const DOC_URL = "https://core1.dev.legalremit.com/";