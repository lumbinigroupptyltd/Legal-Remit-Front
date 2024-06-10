import { toast } from "react-toastify";
import { axiosInstance } from "../../../utils/axiosIntercepters";


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
  console.log(docTypeId, "doTypeId");
  if (docTypeId) {
    const { data } = await axiosInstance.get(
      `/documenttype/getbyid/${docTypeId}`
    );
    console.log(data, "data");
    return data;
  }
};



{
  /*________________________POST_____________________________________*/
}
export const addUserDocDetails = async (formData) => {
  console.log(formData, "form")
  try {
    const imgData = new FormData();
    imgData.append("file", formData?.Front);
    {formData?.Back && imgData.append("file", formData?.Back)};
    imgData.append("requests", JSON.stringify(formData?.getDocData));
    const data = await axiosInstance.post(`/documents/save`, imgData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data, "data")
    if(data) {

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
export const editUserDocDetails = async (formData) => {
  try {
    const imgData = new FormData();
    imgData.append("file", formData?.Front);
    {formData?.Back && imgData.append("file", formData?.Back)};
    imgData.append("requests", JSON.stringify(formData?.getDocData));
    const data = await axiosInstance.post(`/documents/save`, imgData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data, "data")
    if(data) {

      return data;
    }
  } catch (error) {
    toast.error(getErrorMessage(error));
    return false;
  }
};


{
  /*________________________Delete_____________________________________*/
}
export const deleteUserDocDetailsById = async (id) => {
  const data = await axiosInstance.delete(`/deletedoc/${id}`);
  return data;
};