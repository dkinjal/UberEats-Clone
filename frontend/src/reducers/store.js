import { configureStore} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension'
import LoginReducer from './LoginReducer';
import RestLoginReducer from './RestLoginReducer';
import RestSignupReducer from './RestSignupReducer';
import CustSignupReducer from './SignupReducer';

export default configureStore({
    reducer: {
        login: LoginReducer,
        restLogin : RestLoginReducer,
        restSignup: RestSignupReducer,
        custSignup: CustSignupReducer
    }
}, composeWithDevTools());