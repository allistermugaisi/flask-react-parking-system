import {
    GET_SEARCH_SLOT,
    SEARCH_LOADING
  } from "../actions/types";
  

export const getSearchSlots = (data) => {
    return {
        type: GET_SEARCH_SLOT,
        payload: data,
      };
}

export const searchLoading = () => {
    return {
        type: SEARCH_LOADING
    }
}