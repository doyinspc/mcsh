import axios from 'axios';
import {
    BOOKING_GET,
    BOOKING_GET_ONE,
    BOOKING_GET_MULTIPLE,
    BOOKING_GET_MULTIPLE_PERSONAL,
    BOOKING_REGISTER_SUCCESS,
    BOOKING_REGISTER_FAIL,
    BOOKING_LOADING,
    BOOKING_LOADING_ERROR,
    BOOKING_ACTIVATE_FAIL,
    BOOKING_ACTIVATE_SUCCESS,
    BOOKING_UPDATE_SUCCESS,
    BOOKING_UPDATE_FAIL,
    BOOKING_DELETE_SUCCESS,
    BOOKING_DELETE_FAIL,
    BOOKING_PAYMENT_SUCCESS,
    BOOKING_EDIT,
    MAIN_TOKEN,
    API_PATH
} from "./types";

const path = API_PATH;

//GET ALL BOOKING 
export const getBooking = (id, day) => (dispatch, getState) => {
    
    //if id is provided select a single item
    if(id && id > 0 && !day){
        // id available get a candidates data
        let paths = `${path}/booking/${id}/profile`
        axios.get(paths, bookingSetConfig(getState))
        .then(res => {
            dispatch({      
                type: BOOKING_GET_ONE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_LOADING_ERROR,
                payload:err
            })
        })
    }
    // if no id was provided pull all data
    else if( !id && !day ){
        let paths = `${path}/booking/` 
        axios.get(paths, bookingSetConfig(getState))
            .then(res => {
                dispatch({
                    type: BOOKING_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : BOOKING_LOADING_ERROR,
                    payload:err
                })
            })
    }

    else if( id && day ){
        let paths = `${path}/booking/${id}/${day}/day` 
        axios.get(paths, bookingSetConfig(getState))
            .then(res => {
                dispatch({
                    type: BOOKING_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : BOOKING_LOADING_ERROR,
                    payload:err
                })
            })
    }

};

export const getBookingPersonal = (id, day) => (dispatch, getState) => {
    
    //if id is provided select a single item
    if(id && id > 0 && !day){
        // id available get a candidates data
        let paths = `${path}/booking/${id}/personal`
        
        axios.get(paths, bookingSetConfig(getState))
        .then(res => {
            dispatch({      
                type: BOOKING_GET_MULTIPLE_PERSONAL,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_LOADING_ERROR,
                payload:err
            })
        })
    }
    else if( id && day ){
        let paths = `${path}/booking/${id}/${day}/personalday` 
        axios.get(paths, bookingSetConfig(getState))
            .then(res => {
                dispatch({
                    type: BOOKING_GET_MULTIPLE_PERSONAL,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : BOOKING_LOADING_ERROR,
                    payload:err
                })
            })
    }

};

//ACTIVATE OR DEACTIVATE AN BOOKING
export const deactivateBooking = id => (dispatch, getState) => {
    dispatch({type : BOOKING_LOADING});
    let paths = `${path}/booking/${id}/set_deactivated` 
    axios.post(paths, bookingSetConfig(getState))
        .then(res => {
            dispatch({
                type: BOOKING_ACTIVATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_ACTIVATE_FAIL,
                payload : err
            })
        })
        
};

//SET PAYMENT STATE
export const setBooking = (id, st) => (dispatch, getState) => {
    dispatch({type : BOOKING_LOADING});
    let paths = `${path}/booking/${id}/${st}/set_state` 
    axios.post(paths, bookingSetConfig(getState))
        .then(res => {
            dispatch({
                type: BOOKING_PAYMENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_ACTIVATE_FAIL,
                payload : err
            })
        })
        
};

//BOOKING DELETE
export const deleteBooking = (id) => (dispatch, getState) =>{
    dispatch({type : BOOKING_LOADING});
    let paths = `${path}/booking/${id}/set_delete` 
    axios.delete(paths, bookingSetConfig(getState))
        .then(res => {
            dispatch({
                type: BOOKING_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN BOOKING
export const editBooking = id => (dispatch) => {
    dispatch(
        {
        type : BOOKING_EDIT,
        payload: id
    });    
};

//BOOKING REGISTER
export const registerBooking = (data) => dispatch => {

    //body
    const body = JSON.stringify(data)
    let paths = `${path}/booking-register` 
    axios.post(paths, body, bookingSetConfig())
        .then(res => {
            dispatch({
                type: BOOKING_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_REGISTER_FAIL,
                payload: err
            })
        })
};

 //BOOKING EDIT/DELETE
export const updateBooking = (id, data) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);
    let paths = `${path}/booking/${id}/update`   
    axios.patch(paths, body, bookingSetConfig(getState))
        .then(res => {
            dispatch({
                type: BOOKING_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_UPDATE_FAIL,
                payload: err
            })
        })
};

//SET TOKEN AND HEADER - HELPER FUNCTION
export const bookingSetConfig = () => {
    //get token from state
    const token = localStorage.getItem(MAIN_TOKEN);
    // headers
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}
//SET TOKEN AND HEADER - HELPER FUNCTION
export const bookingSetConfig1 = () => {
    //get token from state
    const token = localStorage.getItem(MAIN_TOKEN);

    // headers
    const config ={
        headers:{
             'Content-Type':'multipart/form-data'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}