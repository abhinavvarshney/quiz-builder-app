import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataFromLocalStorage } from '../../utils/dataStorage';
import { KEYS_IN_LOCAL_STORAGE } from '../../constants';
import { Button, Card, Container, Form } from 'react-bootstrap';

const Quiz = () => {

    const { permaLink: permaLinkInParam = '' } = useParams();
    const [quizData, setQuizData] = useState({});

    useEffect(() => {
        const allQuiz = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.QUIZ_LIST);

        const quiz = allQuiz.find(({ permaLink }) => permaLink === permaLinkInParam);

        setQuizData(quiz);
    }, []);

    const [userAnswers, setUserAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);


    /*
     * Function to set the state of answers of the question 
    */
    const handleAnswerChange = (questionIndex, choice) => {
        setUserAnswers((prevAnswers) => {
            const prevAnswer = prevAnswers[questionIndex] || [];
            const newAnswer = [...prevAnswer];
            const indexOfChoice = newAnswer.indexOf(choice);

            if (indexOfChoice > -1) {
                // Deselect the choice if already selected
                newAnswer.splice(indexOfChoice, 1);
            } else {
                // Select the choice if not already selected
                newAnswer.push(choice);
            }

            return {
                ...prevAnswers,
                [questionIndex]: newAnswer,
            };
        });
    };

    /*
     * Function to calculate score of the user 
    */

    const calculateScore = () => {
        let score = 0;
        Object.keys(userAnswers).forEach((questionIndex) => {
            const selectedChoices = userAnswers[questionIndex];
            const correctChoices = quizData.questions[questionIndex].correctAnswers;
            const isAllCorrect = correctChoices?.every((choice) =>
                selectedChoices?.includes(choice)
            );
            if (isAllCorrect) {
                score++;
            }
        });
        return score;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowResult(true);
    };

    /*
     * Render Choices for a question 
    */
    const renderChoices = (questionIndex) => {
        const choices = quizData.questions[questionIndex].choices;
        return choices.map((choice) => (
            <Form.Check
                key={choice}
                type={quizData.questions[questionIndex].multipleChoice ? 'checkbox' : 'radio'}
                label={choice}
                checked={userAnswers[questionIndex]?.includes(choice)}
                onChange={() => handleAnswerChange(questionIndex, choice)}
            />
        ));
    };

    if (showResult) {
        const score = calculateScore();
        return (
            <Container>
                <div>
                    <h2>Quiz Result</h2>
                    <p>Your score: {score}/{quizData?.questions?.length}</p>
                </div>
            </Container>
        );
    }

    return (
        <div>
            {
                quizData ? (
                    <div>
                        <Container>
                            <Form onSubmit={handleSubmit}>
                                {quizData?.questions?.map((question, questionIndex) => (
                                    <Card className='p-2 mt-2 mb-2'>
                                        <div key={questionIndex}>
                                        <h3>Question {questionIndex + 1}</h3>
                                        <p>{question.question}</p>
                                        {renderChoices(questionIndex)}
                                    </div>
                                    </Card>
                                ))}
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Container>
                    </div>
                ) : <h2>Invalid PermaLink</h2>
            }
        </div>
    )
}

export default Quiz;
