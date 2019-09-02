import {
    CATEGORY_GET_MULTIPLE,
    CATEGORY_GET_ONE,
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
    CATEGORY_EDIT
} from "../actions/types";


const initialState = {
    isLoading: false,
    categorys: {},
    category:{},
    msg: null,
    isEdit:-1
}

const changeState = (aluu, actid) =>
{
    let newCategory = [...aluu];
    newCategory.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCategory;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CATEGORY_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CATEGORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CATEGORY_GET_MULTIPLE:
            return {
                ...state,
                categorys : action.payload,
                msg:'DONE!!!'
            };
        case CATEGORY_GET_ONE:
            return {
                ...state,
                category : action.payload,
                MSG:"DONE!!!"
            };
        case CATEGORY_REGISTER_SUCCESS:
            return {
                ...state,
                categorys: [...state.categorys, action.payload],
                msg:action.msg
            }; 
        case CATEGORY_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                categorys: changeState(state.categorys, action.payload)
            }
        case CATEGORY_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                categorys: state.categorys.filter(cat => cat.id != action.payload.id)
            }
        case CATEGORY_UPDATE_SUCCESS:
            const findInd = state.categorys.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.categorys];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                categorys : newState
            }; 
        case CATEGORY_LOADING_ERROR:
        case CATEGORY_ACTIVATE_FAIL:
        case CATEGORY_REGISTER_FAIL:
        case CATEGORY_DELETE_FAIL:
        case CATEGORY_UPDATE_FAIL:
            alert(action.payload)
            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}