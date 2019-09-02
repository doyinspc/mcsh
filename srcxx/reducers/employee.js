import {
    EMPLOYEE_DELETE,
    EMPLOYEE_DELETE_FAIL,
    EMPLOYEE_GET,
    EMPLOYEE_GET_ONE,
    EMPLOYEE_GET_MULTIPLE,
    EMPLOYEE_GET_FAIL,
    EMPLOYEE_LOGIN_SUCCESS,
    EMPLOYEE_LOGIN_FAIL,
    EMPLOYEE_REGISTER_SUCCESS,
    EMPLOYEE_REGISTER_FAIL,
    EMPLOYEE_LOGOUT_SUCCESS,
    EMPLOYEE_LOGOUT_FAIL,
    EMPLOYEE_PASSWORD_SUCCESS,
    EMPLOYEE_PASSWORD_FAIL,
    EMPLOYEE_ACTIVATE_SUCCESS,
    EMPLOYEE_ACTIVATE_FAIL,
    EMPLOYEE_UPDATE_SUCCESS,
    EMPLOYEE_UPDATE_FAIL,
    MAIN_ADMIN,
    MAIN_AUTH,
    MAIN_REG,
    MAIN_TOKEN,
    MAIN_USER
} from "../actions/types";


let storeUser = JSON.parse(localStorage.getItem(MAIN_USER))

const initialState = {
    token: localStorage.getItem(MAIN_TOKEN),
    isAuthenticated: localStorage.getItem(MAIN_AUTH),
    isLoading: false,
    isAdmin: storeUser ? storeUser.category: null,
    isRegistered: storeUser && storeUser.id > 1 ? true: false,
    user: storeUser,
    msg:'',
    employees: {},
    employee:{}
}

export default function(state = initialState, action){
    switch (action.type) {
        case EMPLOYEE_DELETE:
            return {
                ...state,
                employees : state.employees.filter(employee => employee.id !== action.payload)
            };
        case EMPLOYEE_GET:
            return {
                ...state,
                isLoading : true
            };
        case EMPLOYEE_GET_ONE:
            return {
                ...state,
                isLoading : false,
                employee : action.payload
            };
        case EMPLOYEE_GET_MULTIPLE:
            return {
                ...state,
                isLoading : false,
                employees : action.payload
            };
        case EMPLOYEE_LOGIN_SUCCESS:
            localStorage.setItem(MAIN_TOKEN, action.payload.token)
            localStorage.setItem(MAIN_AUTH, true)
            localStorage.setItem(MAIN_ADMIN, action.payload.user.category)
            localStorage.setItem(MAIN_USER, JSON.stringify(action.payload.user))
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                msg: action.payload.msg,
                isAdmin: action.payload.user.category
            }; 
        case EMPLOYEE_REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered:true,
                msg:action.payload.msg
            }; 
        case EMPLOYEE_PASSWORD_SUCCESS:
        case EMPLOYEE_ACTIVATE_SUCCESS:
            const changeState = (aluu, actid) => {
                let newEmployee = [...aluu]
                newEmployee.forEach(alu => {
                    if(alu.id == actid.payload.id){
                        alu.is_active = actid.payload.is_active
                    }
                });
                return changeState(state.employees, actid.id);
            }
            return {
                ...state,
                employee : action.payload
            };
        case EMPLOYEE_UPDATE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                employee : action.payload
            }; 
        case EMPLOYEE_PASSWORD_FAIL:
        case EMPLOYEE_ACTIVATE_FAIL:
            return {
                ...state,
                msg: action.msg
            };
        case EMPLOYEE_REGISTER_FAIL:
        case EMPLOYEE_LOGIN_FAIL:
        case EMPLOYEE_LOGOUT_SUCCESS:
        case EMPLOYEE_LOGOUT_FAIL:
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
                employees:{},
                employee:{},
                employeeyear:null,
                isAdmin : null
            } 
        default:
            return state;
    }

}