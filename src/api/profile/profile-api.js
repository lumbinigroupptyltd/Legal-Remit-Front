import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosIntercepters";
import { getErrorMessage } from "../../utils/getErrorMessage";

{
  /*________________________GET_____________________________________*/
}
export const getUserIdDetails = async (userId) => {
  const { data } = await axiosInstance.get(`/iddetails/getbyuserid/${userId}`);
  return data;
};
{
  /*________________________GET_____________________________________*/
}
export const getDocTypeDetails = async () => {
  const { data } = await axiosInstance.get(`/documenttype/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserKycDetails = async (userId) => {
  const { data } = await axiosInstance.get(`/kycdetails/getbyuserid/${userId}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addKycDetailsProfile = async (formData) => {
  const { data } = await axiosInstance.post(`/kycdetails/create`, formData);
  return data;
};
{
  /*________________________PATCH_____________________________________*/
}
export const editKycDetailsProfile = async (formData) => {
  const { data } = await axiosInstance.patch(`/kycdetails/update`, formData);
  return data;
};


{
  /*________________________POST_____________________________________*/
}
export const addMyDocumentsProfile = async () => {
  const data = await axiosInstance.post("/deletedoc");
  return data;
};

// export const addDocument = async (formData) => {
//   console.log(formData, "formData");
 
//   try {
//     const imgData = new FormData();
//     const filesArray = [
//       { file: formData?.front },
//       { file: formData?.back }
//     ];
  
//     // Append the array of objects as a JSON string
//     imgData.append("files", JSON.stringify(filesArray));
//     // imgData.append("file", formData?.front);
//     // imgData.append("file", formData?.back);
//     imgData.append("requests", JSON.stringify(formData?.getDocData));
//     const url = `/documents/save`;
//     const data = await axiosInstance.post(url, imgData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return true;
//   } catch (error) {
//     toast.error(getErrorMessage(error));
//     return false;
//   }
// };


export const addDocument = async (formData) => {
  console.log(formData, "formData");

  try {
    const imgData = new FormData();
  
    // Construct the array of file objects with metadata
    const filesArray = [
      { file: formData?.front },
      { file: formData?.back }
    ];
  
    // Append the file objects metadata as JSON
    // imgData.append("filesData", JSON.stringify(filesArray.map(fileObj => ({ name: fileObj.name }))));
  
    // Append each file separately
    filesArray.forEach((fileObj, index) => {
      imgData.append(`files[${index}]`, fileObj.file);
    });

    console.log(filesArray, "filesArray");
  
    // Append the array of other objects
    imgData.append("requests", JSON.stringify(formData?.getDocData));
    // imgData.append("file", filesArray);
  
    const url = `/documents/save`;
  
    // Send request using Axios
    const response = await axiosInstance.post(url, imgData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    return true;
  } catch (error) {
    toast.error(getErrorMessage(error));
    return false;
  }
  
  
  
};



{
  /*________________________POST_____________________________________*/
}
export const addPersonalDetailsProfile = async (formData) => {
  const data = await axiosInstance.post(`/verifyotpbyphone`, formData);
  return data;
};
{
  /*________________________POST_____________________________________*/
}
export const editPersonalDetailsProfile = async (formData) => {
  const data = await axiosInstance.patch(`/user/update`, formData);
  return data;
};
{
  /*________________________POST_____________________________________*/
}
export const addIdDetailsProfile = async (formData) => {
  const data = await axiosInstance.post(`/iddetails/create`, formData);
  return data;
};
{
  /*________________________PATCH_____________________________________*/
}
export const editIdDetailsProfile = async (formData) => {
  const data = await axiosInstance.patch(`/useriddetails/update`, formData);
  return data;
};