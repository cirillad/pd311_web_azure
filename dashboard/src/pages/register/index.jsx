import RegisterPage from "./RegisterPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const RegisterPageWithProvider = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <RegisterPage />
        </GoogleOAuthProvider>
    );
};

export default RegisterPageWithProvider;
