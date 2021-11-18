import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../types/loginTypes"
import { REGISTER_SUCCESS, REGISTER_FAILURE } from "../types/registerTypes"
const init_state = {
    isAuth: false,
    msg: ""
}
const authReducer = (state = init_state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isAuth: true,
                msg: action.payload.msg 
            }
        case REGISTER_SUCCESS:
            return {
                isAuth: true,
                msg: action.payload.msg
            }
// zmienić isAuth tutaj na false w przypadku failure
        case LOGIN_FAILURE:
            return {
                isAuth: true,
                msg: action.payload.msg
            }
        case REGISTER_FAILURE:
            return {
                isAuth: true,
                msg: action.payload.msg
            }
        default:
            return state;
    }
}
export default authReducer