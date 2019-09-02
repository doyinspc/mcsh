import {
    CLIENT_GET,
    CLIENT_GET_ONE,
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
    CLIENT_LOGIN_SUCCESS,
    CLIENT_LOGIN_FAIL,
    CLIENT_LOGOUT_SUCCESS,
    CLIENT_LOGOUT_FAIL,
    CLIENT_PASSWORD_SUCCESS,
    CLIENT_PASSWORD_FAIL,
    CLIENT_EDIT,
    CLIENT_FORM,
    CLIENT_GET_MULTIPLE,
    MAIN_ADMIN,
    MAIN_AUTH,
    MAIN_TOKEN,
    MAIN_USER
} from "../actions/types";

let storeUser = JSON.parse(localStorage.getItem(MAIN_USER))

const initialState = {
    token: localStorage.getItem(MAIN_TOKEN),
    isAuthenticated: localStorage.getItem(MAIN_AUTH),
    isLoading: false,
    isAdmin: 1,
    isRegistered: storeUser && storeUser.id > 1 ? true: false,
    user: storeUser,
    client:{},
    clients: {},
    msg: null,
    isEdit:-1,
    showForm: false
}

const changeState = (aluu, actid) =>
{
    let newCLIENT = [...aluu];
    newCLIENT.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCLIENT;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CLIENT_EDIT:
            let show_form_state = false
            if(action.payload > -1){
                show_form_state = true
            }
            return {
                ...state,
                isEdit : action.payload,
                showForm : show_form_state
        };
        case CLIENT_FORM:
            return {
                ...state,
                showForm : action.payload
        };
        case CLIENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CLIENT_GET:
            return {
                ...state,
                clients : action.payload,
                msg:'DONE!!!'
            };
        case CLIENT_GET_ONE:
            return {
                ...state,
                client : action.payload,
                isLoading: false,
                msg:"DONE!!!"
            };
        case CLIENT_GET_MULTIPLE:
            return {
                ...state,
                clients : action.payload,
                isLoading: false,
                msg:"DONE!!!"
            };
        case CLIENT_REGISTER_SUCCESS:
        case CLIENT_LOGIN_SUCCESS:
            localStorage.setItem(MAIN_TOKEN, action.payload.token)
            localStorage.setItem(MAIN_AUTH, true)
            localStorage.setItem(MAIN_ADMIN, 1)
            localStorage.setItem(MAIN_USER, JSON.stringify(action.payload.user))
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                msg: action.payload.msg,
                isAdmin: 1
            }; 
        case CLIENT_PASSWORD_SUCCESS:
        case CLIENT_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                clients: changeState(state.clients, action.payload)
            }
        case CLIENT_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                clients: state.clients.filter(cat => cat.id != action.payload.id)
            }
        case CLIENT_UPDATE_SUCCESS:
            const findInd = state.clients.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.clients];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                clients : newState
            }; 
        case CLIENT_LOADING_ERROR:
        case CLIENT_ACTIVATE_FAIL:
        case CLIENT_DELETE_FAIL:
        case CLIENT_UPDATE_FAIL:
        case CLIENT_REGISTER_FAIL:  
        case CLIENT_PASSWORD_FAIL: 
            return {
                ...state,
                msg: action.msg
            };
        case CLIENT_LOGIN_FAIL:
        case CLIENT_LOGOUT_SUCCESS:
        case CLIENT_LOGOUT_FAIL:
            localStorage.removeItem(MAIN_TOKEN)
            localStorage.removeItem(MAIN_AUTH)
            localStorage.removeItem(MAIN_USER)
            localStorage.removeItem(MAIN_ADMIN)
            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                clients:{},
                client:{},
                isAdmin : null
            } 
        default:
            return state;
    }

}