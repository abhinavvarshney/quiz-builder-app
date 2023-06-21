import React from 'react'
import { Container, Nav, NavLink, Navbar } from 'react-bootstrap'
import { KEYS_IN_LOCAL_STORAGE, PAGE_ROUTES } from '../../constants'
import { useNavigate } from 'react-router-dom'

/**
 * @description Common header component
 * @returns React.Component
 */
const Header = () => {

    const Navigate = useNavigate();

    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href={PAGE_ROUTES.ALL_QUIZ}>All Quiz</Nav.Link>
                        <Nav.Link href={PAGE_ROUTES.QUIZ_CREATED}>Quiz Created</Nav.Link>
                        <NavLink onClick={() => {
                                localStorage.removeItem(KEYS_IN_LOCAL_STORAGE.USER_INFO)
                                Navigate(PAGE_ROUTES.SIGNIN)
                            }}>Logout
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
