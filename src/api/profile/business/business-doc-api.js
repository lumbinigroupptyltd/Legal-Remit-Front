import { toast } from "react-toastify";
import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getBusinessDocTypeDetails = async () => {
    const { data } = await axiosInstance.get(`/documenttype/getiddetails`);
    return data;
  };
  
  {
    /*________________________GET_____________________________________*/
  }
  export const getBusinessDocTypeByDocId = async (docTypeId) => {
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
  
  export const addBusinessDocDetails = async (formData) => {
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
    /*________________________POST_____________________________________*/
  }
  export const editBusinessDocDetails = async (formData) => {
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
  export const deleteBusinessDocDetailsById = async (id) => {
    const data = await axiosInstance.delete(`/deletedoc/${id}`);
    return data;
  };