import {
    CATEGORY_GET,
    CATEGORY_GET_ONE,
    CATEGORY_REGISTER_SUCCESS,
    CATEGORY_REGISTER_FAIL,
    CATEGORY_LOADING,
    CATEGORY_LOADING_ERROR,
    CATEGORY_ACTIVATE_FAIL,
    CATEGORY_ACTIVATE_SUCCESS,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL
} from "../actions/types";


const initialState = {
    isLoading: false,
    categorys: {},
    category:{},
    msg: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case CATEGORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CATEGORY_GET:
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
                msg:action.msg
            }; 
        case CATEGORY_ACTIVATE_SUCCESS:
            function changeState(aluu, actid)
            {
                let newCategory = [...aluu]
                newCategory.forEach(alu => {
                    if(alu.id == actid.payload.id){
                        alu.is_active = actid.payload.is_active
                    }
                });
                return newCategory;
            }
            return{
                ...state,
                msg:'DONE!!!',
                categorys : changeState(state.categorys, action.id)
            }
        case CATEGORY_UPDATE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                category : action.payload
            }; 
        case CATEGORY_LOADING_ERROR:
        case CATEGORY_ACTIVATE_FAIL:
        case CATEGORY_REGISTER_FAIL:
        case CATEGORY_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}