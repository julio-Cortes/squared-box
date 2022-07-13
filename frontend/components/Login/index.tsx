
import { Router, useRouter } from "next/router";
import { FormikHelpers, Formik, Form, Field } from "formik";
import { FormContainer, FormItem, LoginContainer } from "./styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";

type LoginFormValues = {
    email: string,
    password: string;
}

const Login = () => {
    const router = useRouter();

    useEffect (()=>{
        const token  = getCookie('token');
        if (token){
            router.push('/registers')
        }

    })
    const onSubmit = (values: LoginFormValues) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:values.email, password:values.password })
        };

        fetch(`${process.env.REACT_APP_URL_BASE}/users/login`, requestOptions)
            .then(response => {
                if (response.status == 200){
                    return response.json()
                }
                else{
                    toast('Credenciales incorrectas!')
                    return undefined
                }
            })
            .then(data => {
                if (data){
                    toast('Ingreso correcto!')
                    setCookie('token', data.token);
                    router.push('registers')
                }


            });
        //

    }

    return (
        <LoginContainer>
            <Formik onSubmit={onSubmit} initialValues={{
                email: "",
                password: ""
            }}>

                <Form>
                    <FormContainer>
                        <FormItem>
                            <Field
                                id="email"
                                name="email"
                                placeholder="john@acme.com"
                                type="email"
                            />
                        </FormItem>
                        <FormItem>
                            <Field
                                type={'password'}
                                id="password"
                                name="password"
                                placeholder="*****"
                            />
                        </FormItem>
                            <button type="submit"
                            className={'bg-tl-light-grey text-white border rounded-2xl'}>
                                Ingresar
                            </button>

                    </FormContainer>
                </Form>

            </Formik>
        </LoginContainer>
    )
}
export default Login;