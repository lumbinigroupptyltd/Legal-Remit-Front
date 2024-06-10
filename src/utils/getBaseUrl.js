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

export const getBaseUrl = () => {
    return "https://core1.dev.legalremit.com";
};
export const DOC_URL = () => {
  return "https://core1.dev.legalremit.com";
};