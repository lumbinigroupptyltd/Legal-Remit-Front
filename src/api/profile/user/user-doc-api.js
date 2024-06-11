import { toast } from "react-toastify";
import { axiosInstance } from "../../../utils/axiosIntercepters";
import { getErrorMessage } from "../../../utils/getErrorMessage";

{
  /*________________________GET_____________________________________*/
}
export const getUserAllDocuments = async () => {
  const { data } = await axiosInstance.get(`/documents/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserDocumentsTypeDetails = async () => {
  const { data } = await axiosInstance.get(`/documenttype/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserDocTypeByDocId = async (docTypeId) => {
  if (docTypeId) {
    const { data } = await axiosInstance.get(
      `/documenttype/getbyid/${docTypeId}`
    );
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addUserDocDetails = async (formData) => {
  try {
    const imgData = new FormData();
    imgData.append("file", formData?.Front);
    {
      formData?.Back && imgData.append("file", formData?.Back);
    }
    imgData.append("requests", JSON.stringify(formData?.getDocData));
    const data = await axiosInstance.post(`/documents/save`, imgData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (data) {
      return data;
    }
  } catch (error) {
    toast.error(getErrorMessage(error));
    return false;
  }
};

{
  /*________________________PATCH_____________________________________*/
}
// export const editUserDocDetails = async (formData) => {
//   try {
//     const imgData = new FormData();
//     imgData.append("file", formData?.Front);
//     {
//       formData?.Back && imgData.append("file", formData?.Back);
//     }
//     imgData.append("requests", JSON.stringify(formData?.getDocData));
//     const data = await axiosInstance.post(`/documents/save`, imgData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     if (data) {
//       return data;
//     }
//   } catch (error) {
//     toast.error(getErrorMessage(error));
//     return false;
//   }
// };
// import axios from 'axios';
// import { toast } from 'react-toastify';

export const editUserDocDetails = async (formData) => {
  console.log(formData, "form data")
  try {
    const imgData = new FormData();
    imgData.append("file", formData?.Front);
    if (formData?.Back) imgData.append("file", formData?.Back);
    imgData.append("requests", JSON.stringify(formData?.getDocData));

    const response = await axios.post(`/documents/save`, imgData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    toast.error(getErrorMessage(error));
    return false;
  }
};

{
  /*________________________Delete_____________________________________*/
}
export const deleteUserDocDetailsById = async (row) => {
  const id = row && row?.row?.id;
  if (id) {
    const data = await axiosInstance.delete(`documents/delete/${id}`);
    return data;
  }
};
