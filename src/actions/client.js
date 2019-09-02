import axios from 'axios';
import {
    CLIENT_GET,
    CLIENT_GET_ONE,
    CLIENT_GET_MULTIPLE,
    CLIENT_REGISTER_SUCCESS,
    CLIENT_REGISTER_FAIL,
    CLIENT_LOADING,
    CLIENT_LOADING_ERROR,
    CLIENT_ACTIVATE_FAIL,
    CLIENT_ACTIVATE_SUCCESS,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_DELETE_SUCCESS,
    CLIENT_DELETE_FAIL,
    CLIENT_PASSWORD_SUCCESS,
    CLIENT_PASSWORD_FAIL,
    CLIENT_LOGOUT_SUCCESS,
    CLIENT_LOGOUT_FAIL,
    CLIENT_LOGIN_SUCCESS,
    CLIENT_LOGIN_FAIL,
    CLIENT_EDIT,
    CLIENT_FORM,
    MAIN_TOKEN,
    API_PATH
} from "./types";

const path = API_PATH;


//CLIENT LOGIN
export const loginClient = (email, password) => dispatch => {

    // headers
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    //body
    const body = JSON.stringify({email, password})
    let paths = `${path}/client-login`     
    axios.post(paths, body, config)
        .then(res => {
            dispatch({
                type: CLIENT_LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_LOGIN_FAIL,
                payload: err
            })
        })
};

//CLIENT EDIT/DELETE
export const updateClient = (id, data) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'multipart/form-data'
        }
    }
    let paths = `${path}/client/${id}/update`   
    axios.patch(paths, data, config)
        .then(res => {
            dispatch({
                type: CLIENT_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_UPDATE_FAIL,
                payload: err
            })
        })
};
//GET ALL CLIENT 
export const getClient = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch({type : CLIENT_LOADING});

    //if id is provided select a single item
    if(id && id > 0){
        // id available get a candidates data
        let paths = `${path}/client/${id}/profile`
        
        axios.get(paths, clientSetConfig(getState))
        .then(res => {
            dispatch({      
                type: CLIENT_GET_ONE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_LOADING_ERROR,
                payload:err
            })
        })
    }
    // if no id was provided pull all data
    else if( !id ){
        let paths = `${path}/client/` 
        axios.get(paths, clientSetConfig(getState))
            .then(res => {
                dispatch({
                    type: CLIENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CLIENT_LOADING_ERROR,
                    payload:err
                })
            })
    }

};

//ACTIVATE OR DEACTIVATE AN CLIENT
export const deactivateClient = id => (dispatch, getState) => {
    dispatch({type : CLIENT_LOADING});
    let paths = `${path}/client/${id}/set_deactivated` 
    axios.post(paths, clientSetConfig(getState))
        .then(res => {
            dispatch({
                type: CLIENT_ACTIVATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_ACTIVATE_FAIL,
                payload : err
            })
        })
        
};

//CHANGE AND SET CLIENT PASSWORD SEND EMAIL
export const passwordClient = id => (dispatch, getState) => {
    let isAuthenticated = getState().clientReducer.isAdmin;
    if (isAuthenticated) {
         //Client loading
        dispatch({type : CLIENT_LOADING});
        let paths = `${path}/client/${id}/set_password` 
        axios.post(paths, clientSetConfig(getState))
            .then(res => {
                dispatch({
                    type: CLIENT_PASSWORD_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({type : CLIENT_PASSWORD_FAIL})
            })
        
    } else {
        dispatch({type : CLIENT_PASSWORD_FAIL})
    }
   
};

//CLIENT DELETE
export const deleteClient = (id) => (dispatch, getState) =>{
    dispatch({type : CLIENT_LOADING});
    let paths = `${path}/client/${id}/set_delete` 
    axios.delete(paths, clientSetConfig(getState))
        .then(res => {
            dispatch({
                type: CLIENT_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN CLIENT
export const editClient = id => (dispatch) => {
    dispatch(
        {
        type : CLIENT_EDIT,
        payload: id
    });    
};

//DISPLAY FORM FOR EDITING OR ADDING
export const formClient = bool => (dispatch) => {
    dispatch(
        {
        type : CLIENT_FORM,
        payload: bool
    });    
};

//CLIENT REGISTER
export const registerClient = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    let paths = `${path}/client-register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: CLIENT_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_REGISTER_FAIL,
                payload: err
            })
        })
};

//LOGOUT CLIENT
export const logoutClient = () => (dispatch, getState) => {
    //get token from state
    const token = getState().clientReducer.token;

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

    let paths = `${path}/client-logout`;
    axios.post(paths, null, config)
        .then(res => {
            dispatch({
                type: CLIENT_LOGOUT_SUCCESS,
            })
        })
        .catch(err => {

            dispatch({type : CLIENT_LOGOUT_FAIL})
        })
};

//SET TOKEN AND HEADER - HELPER FUNCTION
export const clientSetConfig = () => {
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
export const clientSetConfig1 = () => {
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