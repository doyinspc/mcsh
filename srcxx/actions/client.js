import axios from 'axios';
import {
    CLIENT_DELETE,
    CLIENT_GET,
    CLIENT_GET_ONE,
    CLIENT_LOGIN_FAIL,
    CLIENT_LOGIN_SUCCESS,
    CLIENT_REGISTER,
    CLIENT_REGISTER_SUCCESS,
    CLIENT_REGISTER_FAIL,
    CLIENT_LOADING,
    CLIENT_LOADED,
    CLIENT_LOADING_ERROR,
    CLIENT_LOGOUT_SUCCESS,
    CLIENT_LOGOUT_FAIL,
    CLIENT_PASSWORD_FAIL,
    CLIENT_PASSWORD_SUCCESS,
    CLIENT_ACTIVATE_FAIL,
    CLIENT_ACTIVATE_SUCCESS,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    API_PATH
} from "./types";

const path = API_PATH;

//GET  CLIENT BY YEAR
export const loadClient = session => (dispatch, getState) => {
    let isAuthenticated = getState().clientReducer.isAuthenticated;
    if (isAuthenticated) {
         //Client loading
        dispatch({type : CLIENT_LOADING});
        let paths = `${path}/client/${session}/year` 
        axios.get(paths, clientSetConfig(getState))
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: CLIENT_GET,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({type : CLIENT_LOADING_ERROR})
            })
        
    } else {
        dispatch({type : CLIENT_LOGIN_FAIL})
    }
   
};

//GET ALL CLIENT OR A SPECIFIC CLIENT
export const getClient = id => (dispatch, getState) => {
    let isAuthenticated = getState().clientReducer.isAuthenticated;
    let isAdmin = getState().clientReducer.isAdmin;
    if (isAuthenticated) {
         //Client loading
         //either an admin or authenticated client
        dispatch({type : CLIENT_LOADING});
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
                dispatch({type : CLIENT_LOADING_ERROR})
            })
        }else if( !id ){
            //isAdmin && isAdmin > 0 &&
            // no id provided, and an administrator pull
            let paths = `${path}/client/` 
            axios.get(paths, clientSetConfig(getState))
                .then(res => {
                    dispatch({
                        type: CLIENT_GET,
                        payload: res.data
                    })
                })
                .catch(err => {
                    dispatch({type : CLIENT_LOADING_ERROR})
                })
        }
        
    } else {
        dispatch({type : CLIENT_LOGIN_FAIL})
    }
   
};

//ACTIVATE OR DEACTIVATE AN CLIENT
export const deactivateClient = id => (dispatch, getState) => {
    let isAuthenticated = getState().clientReducer.isAdmin;
    if (!isAuthenticated) {
         //Client loading
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
                //dispatch({type : CLIENT_ACTIVATE_FAIL})
                console.log(err);
            })
        
    } else {
        dispatch({type : CLIENT_LOGIN_FAIL})
    }
   
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
    let paths = `${path}/auth/client-login`     
    axios.post(paths, body, config)
        .then(res => {
            dispatch({
                type: CLIENT_LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({type : CLIENT_LOGIN_FAIL})
        })
};

export const showRegisterForm = () => dispatch => {
    dispatch({
        type: CLIENT_REGISTER
    })
}

//CLIENT REGISTER
export const registerClient = ({schno, email, phone, fullname, year, twitter, facebook}) => dispatch => {

    // headers
    let config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    //body
    const body = JSON.stringify({schno, email, phone, fullname, year, twitter, facebook})
    let paths = `${path}/auth/client-register`   
    axios.post(paths, body, config)
        .then(res => {
            dispatch({
                type: CLIENT_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({type : CLIENT_REGISTER_FAIL})
        })
};

export const updateClient = (id, data) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);
    let paths = `${path}/client/${id}/update`   
    axios.patch(paths, body, clientSetConfig1(getState))
        .then(res => {
            dispatch({
                type: CLIENT_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            //dispatch({type : CLIENT_UPDATE_FAIL})
        })
};

export const editButton = id => dispatch =>{
    dispatch({
        type: CLIENT_EDIT_PERMISSION,
        payload: id
    })}

export const updateClientPhoto = (id, data) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);
    let paths = `${path}/client/${id}/update`   
    axios.patch(paths, data, clientSetConfig1(getState))
        .then(res => {
            dispatch({
                type: CLIENT_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            //dispatch({type : CLIENT_UPDATE_FAIL})
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

    let paths = `${path}/auth/client-logout`;
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

//DELETE CLIENT
export const deleteClient = id => dispatch => {
    let paths = `${path}/client/${id}/`;
        
    axios.delete(paths)
        .then(res => {
            dispatch({
                type: CLIENT_DELETE,
                payload: id
            })
        })
        .catch(err => console.log(err))
}


//SET TOKEN AND HEADER - HELPER FUNCTION
export const clientSetConfig = getState => {
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

    return config
}
//SET TOKEN AND HEADER - HELPER FUNCTION
export const clientSetConfig1 = getState => {
    //get token from state
    const token = getState().clientReducer.token;

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