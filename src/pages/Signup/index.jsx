import React, { useState } from 'react';
import {
    useNavigate
} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from 'react-bootstrap';
import { ERROR_MESSAGE_LIST, PAGE_ROUTES, SIGNIN } from '../../constants';
import { registerUser } from '../../utils/auth';
import { REGEX } from '../../utils/validations';

const Signup = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState();

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
                case SIGNIN.FORM_FIELDS.NAME:
                    setFullName(value);
                    break;
                case SIGNIN.FORM_FIELDS.EMAIL:
                    setEmail(value);
                    break;
                case SIGNIN.FORM_FIELDS.PASSWORD:
                    setPassword(value);
                    break;
                case SIGNIN.FORM_FIELDS.CONFIRM_PASSWORD:
                    setConfirmPassword(value);
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.error("Error inside -> onChangeHandlerForFormFields", err);
        }
    }


    /**
     * @description function to validate input fields
     * @returns error messages if any
    */
    const validateFormValues = () => {
        const errorList = [];
        if (!REGEX.email.test(email)) {
            errorList.push(ERROR_MESSAGE_LIST.INVALID_EMAIL);
        }
        if (password !== confirmPassword) {
            errorList.push(ERROR_MESSAGE_LIST.PASSWORD_NOT_MATCH_CONFIRM_PASSWORD);
        }

        return errorList.join(',');
    }

    /**
     * @description handler function on form submission
     * @param {Object} event
     * @returns void
    */
    const submitForm = (e) => {
        e.preventDefault();
        try {

            const validateResult = validateFormValues();

            if (validateResult) {
                window.alert(validateResult);
            } else {

                const userInfo = {
                    fullName,
                    email,
                    password
                };
                /*
                 * If registration successful redirect to Dashboard route
                 * Otherwise show appropriate error message 
                */
                const {
                    isRegistrationSuccessful = false,
                    message = ''
                } = registerUser({ userInfo });

                if (isRegistrationSuccessful) {
                    Navigate(PAGE_ROUTES.SIGNIN);
                } else {
                    setError(message);
                }
            }

        } catch (err) {
            console.error("Error inside -> submit form handler", err);
        }
    };

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
                                        <Form onSubmit={submitForm}>
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={fullName}
                                                    onChange={
                                                        (e) => onChangeHandlerForFormFields(e, SIGNIN.FORM_FIELDS.NAME)
                                                    } />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={
                                                        (e) => onChangeHandlerForFormFields(e, SIGNIN.FORM_FIELDS.EMAIL)
                                                    } />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={
                                                        (e) => onChangeHandlerForFormFields(e, SIGNIN.FORM_FIELDS.PASSWORD)
                                                    } />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicConfirmPassword"
                                            >
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    value={confirmPassword}
                                                    onChange={
                                                        (e) => onChangeHandlerForFormFields(e, SIGNIN.FORM_FIELDS.CONFIRM_PASSWORD)
                                                    } />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Create Account
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account??{' '}
                                                <a href={PAGE_ROUTES.SIGNIN} className="text-primary fw-bold">
                                                    Sign In
                                                </a>
                                            </p>
                                        </div>
                                        {error && <span>{error}</span>}
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

export default Signup
