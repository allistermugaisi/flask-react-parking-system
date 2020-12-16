import {
    GET_SEARCH_SLOT,
    SEARCH_LOADING
  } from "../actions/types";

  const initialState = {
    slots:[],
    loading:false 
}

export default function(state= initialState,action){
    switch(action.type){
        case  GET_SEARCH_SLOT:
            return {
              ...state,
              slots: action.payload,
              loading:false
            };
        case SEARCH_LOADING:
            return {
              ...state,
              loading:true
            }
        default:
            return state
    }
}