import React from 'react'
import Header from '../../components/Header';
import QuizCard from '../../components/Quiz/QuizCard';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const QuizCreated = () => {

    const Navigate = useNavigate();

    return (
        <>
            <Header />
            <Container className='mt-2'>
                <Button
                    variant='primary'
                    className='me-auto'
                    onClick={() => Navigate(PAGE_ROUTES.CREATE_QUIZ)}>
                    Create Quiz +
                </Button>
                <br />
                <QuizCard
                    allQuizByAUser={true}
                />
            </Container>
        </>
    )
}

export default QuizCreated;
