import axios from 'axios';
import {
    CATEGORY_GET,
    CATEGORY_GET_ONE,
    CATEGORY_GET_MULTIPLE,
    CATEGORY_REGISTER_SUCCESS,
    CATEGORY_REGISTER_FAIL,
    CATEGORY_LOADING,
    CATEGORY_LOADING_ERROR,
    CATEGORY_ACTIVATE_FAIL,
    CATEGORY_ACTIVATE_SUCCESS,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_EDIT,
    MAIN_TOKEN,
    API_PATH
} from "./types";

const path = API_PATH;

//GET ALL CATEGORY 
export const getCategory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch({type : CATEGORY_LOADING});

    //if id is provided select a single item
    if(id && id > 0){
        // id available get a candidates data
        let paths = `${path}/category/${id}/profile`
        
        axios.get(paths, categorySetConfig(getState))
        .then(res => {
            dispatch({      
                type: CATEGORY_GET_ONE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CATEGORY_LOADING_ERROR,
                payload:err
            })
        })
    }
    // if no id was provided pull all data
    else if( !id ){
        let paths = `${path}/category/` 
        axios.get(paths, categorySetConfig(getState))
            .then(res => {
                dispatch({
                    type: CATEGORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CATEGORY_LOADING_ERROR,
                    payload:err
                })
            })
    }

};

//ACTIVATE OR DEACTIVATE AN CATEGORY
export const deactivateCategory = id => (dispatch, getState) => {
    dispatch({type : CATEGORY_LOADING});
    let paths = `${path}/category/${id}/set_deactivated` 
    axios.post(paths, categorySetConfig(getState))
        .then(res => {
            dispatch({
                type: CATEGORY_ACTIVATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CATEGORY_ACTIVATE_FAIL,
                payload : err
            })
        })
        
};

//CATEGORY DELETE
export const deleteCategory = (id) => (dispatch, getState) =>{
    dispatch({type : CATEGORY_LOADING});
    let paths = `${path}/category/${id}/set_delete` 
    axios.delete(paths, categorySetConfig(getState))
        .then(res => {
            dispatch({
                type: CATEGORY_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CATEGORY_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN CATEGORY
export const editCategory = id => (dispatch) => {
    dispatch(
        {
        type : CATEGORY_EDIT,
        payload: id
    });    
};

//CATEGORY REGISTER
export const registerCategory = (data) => dispatch => {

    //body
    const body = JSON.stringify(data)
    let paths = `${path}/category-register` 
    axios.post(paths, body, categorySetConfig())
        .then(res => {
            dispatch({
                type: CATEGORY_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CATEGORY_REGISTER_FAIL,
                payload: err
            })
        })
};

 //CATEGORY EDIT/DELETE
export const updateCategory = (id, data) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);
    let paths = `${path}/category/${id}/update`   
    axios.patch(paths, body, categorySetConfig(getState))
        .then(res => {
            dispatch({
                type: CATEGORY_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CATEGORY_UPDATE_FAIL,
                payload: err
            })
        })
};

//SET TOKEN AND HEADER - HELPER FUNCTION
export const categorySetConfig = () => {
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
export const categorySetConfig1 = () => {
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