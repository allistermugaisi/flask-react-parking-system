import {
    GET_RESERVATION,
    ADD_RESERVATION,
    DELETE_RESERVATION,
    RESERVATION_LOADING,
  } from "../actions/types";

  const initialState = {
      reservations:[],
      loading:false 
  }

  export default function(state= initialState,action){
      switch(action.type){
          case  GET_RESERVATION:
              return {
                ...state,
                reservations: action.payload,
                loading:false
              };
          case ADD_RESERVATION:
              return {
                ...state,
                ...action.payload,
                loading:false
              };
          case DELETE_RESERVATION:
              return {
                ...state,
                ...action.payload,
                loading:false
              };
          case RESERVATION_LOADING:
              return {
                ...state,
                loading:true
              }
          default:
              return state
      }
  }