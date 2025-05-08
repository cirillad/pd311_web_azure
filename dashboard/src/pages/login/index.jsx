import LoginPage from './LoginPage';
import {GoogleOAuthProvider} from "@react-oauth/google";

const LoginPageWithProvider = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <LoginPage/>
        </GoogleOAuthProvider>
    )
}

export default LoginPageWithProvider;