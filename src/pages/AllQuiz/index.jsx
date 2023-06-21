import React from 'react';
import Header from '../../components/Header'
import { Container } from 'react-bootstrap';
import QuizCard from '../../components/Quiz/QuizCard';

const AllQuiz = () => {

    return (
        <div>
            <Header />
            <Container>
                <QuizCard />
            </Container>
        </div>
    )
}

export default AllQuiz
