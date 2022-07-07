
import { Router, useRouter } from "next/router";
import { FormikHelpers, Formik, Form, Field } from "formik";
import { FormContainer, FormItem, LoginContainer } from "./styles";


type LoginFormValues = {
    email: string,
    password: string;
}

const Login = () => {
    const router = useRouter();
    const onSubmit = (values: LoginFormValues) => {
        router.push('registers')

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