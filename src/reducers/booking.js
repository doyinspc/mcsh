import {
    BOOKING_GET_MULTIPLE,
    BOOKING_GET_MULTIPLE_PERSONAL,
    BOOKING_GET_ONE,
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
    BOOKING_EDIT
} from "../actions/types";


const initialState = {
    isLoading: false,
    personalbookings:{},
    bookings: {},
    booking:{},
    msg: null,
    isEdit:-1
}

const changeState = (aluu, actid) =>
{
    let newBooking = [...aluu];
    newBooking.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newBooking;
}

const changeBooking = (aluu, actid) =>
{
    let newBooking = [...aluu];
    newBooking.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newBooking;
}

export default function(state = initialState, action){
    switch (action.type) {
        case BOOKING_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case BOOKING_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case BOOKING_GET_MULTIPLE:
            return {
                ...state,
                bookings : action.payload,
                msg:'DONE!!!'
            };
        case BOOKING_GET_MULTIPLE_PERSONAL:
            return {
                ...state,
                personalbookings : action.payload,
                msg:'DONE!!!'
            };
        case BOOKING_GET_ONE:
            return {
                ...state,
                booking : action.payload,
                MSG:"DONE!!!"
            };
        case BOOKING_REGISTER_SUCCESS:
            return {
                ...state,
                bookings: [...state.bookings, action.payload],
                msg:action.msg
            }; 
        case BOOKING_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                bookings: changeState(state.bookings, action.payload)
            }
        case BOOKING_PAYMENT_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                bookings: changeBooking(state.personalbookings, action.payload)
            }
        case BOOKING_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                bookings: state.bookings.filter(cat => cat.id != action.payload.id)
            }
        case BOOKING_UPDATE_SUCCESS:
            const findInd = state.bookings.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.bookings];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                bookings : newState
            }; 
        case BOOKING_LOADING_ERROR:
        case BOOKING_ACTIVATE_FAIL:
        case BOOKING_REGISTER_FAIL:
        case BOOKING_DELETE_FAIL:
        case BOOKING_UPDATE_FAIL:
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