import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________POST_____________________________________*/
  }
  export const addPersonalBusinessProfile = async (formData) => {
    const data = await axiosInstance.patch(`/user/update`, formData);
    return data;
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const editPersonalBusinessProfile = async (formData) => {
    const data = await axiosInstance.patch(`/user/update`, formData);
    return data;
  };



  {
    /*________________________POST_____________________________________*/
  }
  export const addPersonalBusinessExtraProfile = async (formData) => {
    const data = await axiosInstance.post(`/user/update`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editPersonalBusinessExtraProfile = async (formData) => {
    const data = await axiosInstance.patch(`/user/update`, formData);
    return data;
  };



  {
    /*________________________POST_____________________________________*/
  }
  export const addBusinessDirective = async (formData) => {
    const data = await axiosInstance.post(`/business/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editBusinessDirective = async (formData) => {
    const data = await axiosInstance.post(`/business/create`, formData);
    return data;
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const addBusinessShare = async (formData) => {
    const data = await axiosInstance.post(`/business/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editBusinessShare = async (formData) => {
    const data = await axiosInstance.post(`/business/create`, formData);
    return data;
  };