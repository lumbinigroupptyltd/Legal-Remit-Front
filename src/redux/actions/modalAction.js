import { CLOSE_MODAL, OPEN_MODAL } from "../types/types";


export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
