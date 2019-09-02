import {
    CLIENT_DELETE,
    CLIENT_GET,
    CLIENT_GET_ONE,
    CLIENT_LOGIN_FAIL,
    CLIENT_LOGIN_SUCCESS,
    CLIENT_LOGOUT_SUCCESS,
    CLIENT_LOGOUT_FAIL,
    CLIENT_REGISTER,
    CLIENT_REGISTER_SUCCESS,
    CLIENT_REGISTER_FAIL,
    CLIENT_LOADING,
    CLIENT_LOADED,
    CLIENT_LOADING_ERROR,
    CLIENT_PASSWORD_FAIL,
    CLIENT_PASSWORD_SUCCESS,
    CLIENT_ACTIVATE_FAIL,
    CLIENT_ACTIVATE_SUCCESS,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_EDIT_PERMISSION,
    CLIENT_ADMIN,
    CLIENT_AUTH,
    CLIENT_REG,
    CLIENT_TOKEN,
    CLIENT_USER
} from "../actions/types";


let storeUser = JSON.parse(localStorage.getItem(CLIENT_USER))

const initialState = {
    token: localStorage.getItem(CLIENT_TOKEN),
    isAuthenticated: localStorage.getItem(CLIENT_AUTH),
    isLoading: false,
    isAdmin: storeUser ? storeUser.category: null,
    isRegistered: storeUser && storeUser.id > 1? true: false,
    user: storeUser,
    msg:'',
    clients: {},
    client:{},
    clientyear: storeUser ? storeUser.year: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case CLIENT_DELETE:
            return {
                ...state,
                clients : state.clients.filter(client => client.id !== action.payload)
            };
        case CLIENT_GET:
            return {
                ...state,
                clients : action.payload
            };
        case CLIENT_GET_ONE:
            return {
                ...state,
                client : action.payload
            };
        case CLIENT_LOGIN_SUCCESS:
            localStorage.setItem(CLIENT_TOKEN, action.payload.token)
            localStorage.setItem(CLIENT_AUTH, true)
            localStorage.setItem(CLIENT_REG, true)
            localStorage.setItem(CLIENT_ADMIN, action.payload.user.category)
            localStorage.setItem(CLIENT_USER, JSON.stringify(action.payload.user))
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                isRegistered: localStorage.getItem(CLIENT_REG),
                user: action.payload.user,
                msg: action.payload.msg,
                clientyear: action.payload.user.year,
                isAdmin: action.payload.user.category
            }; 
        case CLIENT_REGISTER:
            return {
                ...state,
                isRegistered:false
            };
        case CLIENT_REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered:true,
                msg:action.payload.msg
            }; 
        case CLIENT_EDIT_PERMISSION:
            return {
                ...state,
                isEdit : action.payload
            };
        case CLIENT_PASSWORD_SUCCESS:
        case CLIENT_ACTIVATE_SUCCESS:
            function changeState(aluu, actid)
            {
                let newClient = [...aluu]
                newClient.forEach(alu => {
                    if(alu.id == actid.payload.id){
                        alu.is_active = actid.payload.is_active
                    }
                });
                return newClient;
            }
        case CLIENT_UPDATE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                client : action.payload
            }; 
        case CLIENT_PASSWORD_FAIL:
        case CLIENT_ACTIVATE_FAIL:
            return {
                ...state,
                msg: action.msg
            };
        case CLIENT_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case CLIENT_LOADED:
            return{
                ...state,
                isLoading: false,
                clients: action.payload.clients
            }
        case CLIENT_LOADING_ERROR:
            return{
                ...state,
                isLoading: false,
                clients:{}
            }
        case CLIENT_REGISTER_FAIL:
        case CLIENT_LOGIN_FAIL:
        case CLIENT_LOGOUT_SUCCESS:
        case CLIENT_LOGOUT_FAIL:
            localStorage.removeItem(CLIENT_REG)
            localStorage.removeItem(CLIENT_TOKEN)
            localStorage.removeItem(CLIENT_AUTH)
            localStorage.removeItem(CLIENT_USER)
            localStorage.removeItem(CLIENT_ADMIN)
            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                clients:{},
                client:{},
                clientyear:null,
                isAdmin : null
            } 
        default:
            return state;
    }

}