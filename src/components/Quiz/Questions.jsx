import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';


/**
 * @description Reusable component for quiz question
 * @param {Array} questions array containing questions
 * @param {Function} setQuestions function to set questions
 * @returns React.Component
*/
const Questions = ({
    questions,
    setQuestions
}) => {

    const handleQuestionChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].question = e.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, choiceIndex, e) => {
        const newQuestions = [...questions];
        const { checked, value } = e.target;


        const question = newQuestions[questionIndex] || {};
        if (checked) {
            if(!question.correctAnswers){
                question.correctAnswers = [value]; 
            }else{
                question?.correctAnswers?.push(value);
            }
        } else {
            const index = question?.correctAnswers?.indexOf(value);
            if (index !== -1) {
                question?.correctAnswers?.splice(index, 1);
            }
        }

        setQuestions(newQuestions);
    };

    const handleChoiceChange = (questionIndex, choiceIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices[choiceIndex] = e.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', choices: [''] }]);
    };

    const addChoice = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices.push('');
        setQuestions(newQuestions);
    };

    const removeQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const removeChoice = (questionIndex, choiceIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices.splice(choiceIndex, 1);
        setQuestions(newQuestions);
    };

    const handleMultipleChoice = (questionIndex, e) => {
        console.log(e.target.checked);
        const newQuestions = [...questions];
        newQuestions[questionIndex].multipleChoice = e.target.checked;

        setQuestions(newQuestions);
    }

    const handleCorrectAnswerChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].correctAnswers = [e.target.value];
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // You can access the questions and choices using the `questions` state
        console.log(questions);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Container>
                    {questions.map((question, questionIndex) => (
                        <div className='border p-4 mb-2' key={questionIndex}>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Question {questionIndex + 1}:
                                </Form.Label>
                                <Form.Check
                                    type='switch'
                                    id="custom-switch"
                                    label="Multiple choice"
                                    value={question?.multipleChoice}
                                    onChange={(e) => handleMultipleChoice(questionIndex, e)}
                                />
                                <Form.Control
                                    type='text'
                                    value={question.question}
                                    onChange={(e) => handleQuestionChange(questionIndex, e)}
                                />
                            </Form.Group>
                            {question.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex}>
                                    <Form.Group>
                                        <Form.Label>
                                            Choice {choiceIndex + 1}:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={choice}
                                            onChange={(e) => handleChoiceChange(questionIndex, choiceIndex, e)}
                                        />
                                    </Form.Group>
                                    {
                                        question.multipleChoice && (<Form.Group>

                                            <Form.Label>
                                                Correct Answer
                                            </Form.Label>
                                            <Form.Check
                                                type="checkbox"
                                                value={choice}
                                                checked={question?.correctAnswers?.includes(choice)}
                                                onChange={(e) => handleAnswerChange(questionIndex, choiceIndex, e)}
                                            />
                                        </Form.Group>)
                                    }

                                    <Button variant='danger' className='mb-3 mt-2' onClick={() => removeChoice(questionIndex, choiceIndex)}>
                                        Remove Choice
                                    </Button>
                                </div>
                            ))}
                            <Button variant='primary' onClick={() => addChoice(questionIndex)}>
                                Add Choice
                            </Button>
                            <br />
                            {
                                !question.multipleChoice &&
                                (
                                    <div>
                                        <Form.Label>
                                            Correct Answer:
                                        </Form.Label>
                                        <Form.Select value={question.correctAnswer} onChange={(e) => handleCorrectAnswerChange(questionIndex, e)}>
                                            <option value="">Select Correct Answer</option>
                                            {question.choices.map((choice, choiceIndex) => (
                                                <option key={choiceIndex} value={choice}>
                                                    {choice}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                )

                            }
                            <Button variant='danger' className='mt-4' onClick={() => removeQuestion(questionIndex)}>
                                Remove Question
                            </Button>
                        </div>
                    ))}
                </Container>
                <Button variant='primary' className='mt-2' onClick={addQuestion}>
                    Add Question
                </Button>
            </Form>
        </div>
    );
};

export default Questions;