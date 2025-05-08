import {
    Container,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    Divider,
    Button,
    Box
} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {FieldError} from '../../components/errors/Errors';
import {Link, useNavigate} from 'react-router-dom';
import useAction from "../../hooks/useAction";
import {useSelector} from "react-redux";
import {GoogleLogin} from "@react-oauth/google";

const LoginPage = () => {
    const {errorMessage} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const {login, googleLogin} = useAction();

    const formSubmit = (values) => {
        if (login(values).type !== "ERROR") {
            navigate("/");
        }
    }

    // google login
    const googleLoginHandler = (response) => {
        const jwtToken = response.credential;
        googleLogin(jwtToken);
        navigate("/");
    }

    const googleErrorHandler = (error) => {
        console.log(error)
    }

    // init values
    const initValues = {
        userName: "",
        password: ""
    };

    // validation scheme with yup
    const yupValidationScheme = Yup.object({
        userName: Yup.string().required("Обов'язкове поле"),
        password: Yup.string().min(6, "Мінімальна довжина паролю 6 символів")
    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        validationSchema: yupValidationScheme,
        onSubmit: formSubmit
    });

    return (
        <Container>
            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: "center", m: "10px 0px"}}
            >
                Sign in
            </Typography>

            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{display: 'flex', flexDirection: 'column', gap: 2}}
            >
                <FormControl>
                    <FormLabel htmlFor="userName">User Name</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="userName"
                        placeholder="userName"
                        name="userName"
                        autoComplete="userName"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                        <FieldError text={formik.errors.userName}/>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <FieldError text={formik.errors.password}/>
                    ) : null}
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                >
                    Sign in
                </Button>
            </Box>
            <Divider>
                <Typography sx={{color: 'text.secondary'}}>or</Typography>
            </Divider>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography sx={{textAlign: 'center'}}>
                    Don't have account?{' '}
                    <Link
                        to="/register"
                    >
                        Sign up
                    </Link>
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                <GoogleLogin
                    onSuccess={googleLoginHandler}
                    onError={googleErrorHandler}
                    useOneTap
                    type="standard"
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    logo_alignment="left"/>
            </Box>
            <Box sx={{textAlign: "center"}}>
                <FieldError text={errorMessage ? errorMessage : ""}/>
            </Box>
        </Container>
    );
}

export default LoginPage;