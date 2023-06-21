import React, { useState } from 'react'
import {
    Container,
    Form,
    Card,
    Row,
    Col,
    Button
} from 'react-bootstrap'
import { PAGE_ROUTES, SIGNUP } from '../../constants'
import { validateUserAndAuthorizeSignIn } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { REGEX } from '../../utils/validations';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const Navigate = useNavigate();

    /**
    * @description handler function to change the values of form fields
    * @param {event} object event
    * @param {nameOfField} string name of the field to change the value
    * @returns {void}
    */
    const onChangeHandlerForFormFields = ({ target: { value } = {} } = {}, nameOfField) => {
        try {
            switch (nameOfField) {
                case SIGNUP.FORM_FIELDS.EMAIL:
                    setEmail(value);
                    break;
                case SIGNUP.FORM_FIELDS.PASSWORD:
                    setPassword(value);
                    break;
                default:

            }
        } catch (err) {
            console.error("Error inside -> onChangeHandlerForFormFields", err);
        }
    }

    const validateFormValues = () => {
        const errorList = [];
        if (!REGEX.email.test(email)) {
            errorList.push(ERROR_MESSAGE_LIST.INVALID_EMAIL);
        }

        return errorList.join(',');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        try{
            const errorsInForm = validateFormValues();
            if(errorsInForm){
                window.alert(errorsInForm);
            }else{
                const userCredentials = {
                    email,
                    password
                };
                const {
                    authorized = false,
                    message = ''
                } = validateUserAndAuthorizeSignIn({ userCredentials });
    
                console.log(authorized, message);
    
                if(!authorized){
                    setErrorMessage(message);
                }else{
                    Navigate(PAGE_ROUTES.DASHBOARD);
                }
    
            }
        }catch(err){
            console.log("Error in signin submit handler", err);
        }
    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                        Quiz Builder App
                                    </h2>
                                    <div className="mb-3">
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => onChangeHandlerForFormFields(e, SIGNUP.FORM_FIELDS.EMAIL)} />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => onChangeHandlerForFormFields(e, SIGNUP.FORM_FIELDS.PASSWORD)} />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    SignIn
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Do not have an account??{' '}
                                                <a href={PAGE_ROUTES.SIGNUP} className="text-primary fw-bold">
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
                                        { errorMessage && <span>{errorMessage}</span> }
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignIn
