import React from 'react';
import { Form } from 'react-bootstrap';
import Questions from '../Quiz/Questions';

/**
 * @description Reusable component for quiz creation form
 * @param {Object} quizInfo object containing quiz info
 * @param {Function} setQuizInfo function to set quiz info
 * @param {Array} questions array containing questions
 * @param {Function} setQuestions function to set questions
 * @returns React.Component
*/
const CreateQuizForm = ({
    quizInfo,
    setQuizInfo,
    questions,
    setQuestions
}) => {

    const handlerQuizTitleChange = (e) => {
        const newQuizInfo = { ...quizInfo };
        newQuizInfo.title = e.target.value;
        setQuizInfo({ ...newQuizInfo });
    }

    return (
        <>
            <h2>Create a new Quiz</h2>
            <Form.Group
                className="mb-3"
                controlId="title"
            >
                <Form.Label>Quiz Title</Form.Label>
                <Form.Control type="input"
                    placeholder="Quiz Title"
                    value={quizInfo.title}
                    onChange={(e) => handlerQuizTitleChange(e)} />
            </Form.Group>
            <Questions
                questions={questions}
                setQuestions={setQuestions}
            />
        </>
    )
}

export default CreateQuizForm;
