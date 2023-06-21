import React, { useState } from 'react';
import CreateQuizForm from '../../components/CreateQuiz/CreateQuizForm';
import Header from '../../components/Header';
import { Button, Container } from 'react-bootstrap';
import { getDataFromLocalStorage, setDataInLocalStorage } from '../../utils/dataStorage';
import { KEYS_IN_LOCAL_STORAGE, PAGE_ROUTES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { generatePermaLink } from '../../utils/utilityFunctions';

const CreateQuiz = () => {
    const [quizInfo, setQuizInfo] = useState({
        title: '',
        questions: [],
        quizCreatedByUser: null
    });
    const [questions, setQuestions] = useState([{ question: '', multipleChoice: false, choices: [''], correctAnswers: [], permaLink: '' }]);

    const Navigate = useNavigate();

    const handleSubmitQuiz = (e) => {
        e.preventDefault();
        try {
            const newQuizInfo = { ...quizInfo };
            newQuizInfo.questions = questions;
            const {
                id = ''
            } = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.USER_INFO);
            newQuizInfo.quizCreatedByUser = id;
            newQuizInfo.permaLink = generatePermaLink();
            const quizList = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.QUIZ_LIST) || [];
            quizList.push({ ...newQuizInfo });
            const isUpdateSuccess = setDataInLocalStorage(KEYS_IN_LOCAL_STORAGE.QUIZ_LIST, quizList);
            if (isUpdateSuccess) {
                Navigate(PAGE_ROUTES.QUIZ_CREATED);
            } else {
                console.log("Update Fail");
            }
        } catch (err) {
            console.error("Error inside handler submit quiz", err);
        }
    }

    return (
        <>
            <Header />
            <Container>
                <CreateQuizForm
                    quizInfo={quizInfo}
                    setQuizInfo={setQuizInfo}
                    questions={questions}
                    setQuestions={setQuestions}
                />
                <br />
                <Button onClick={handleSubmitQuiz}>
                    Publish Quiz
                </Button>
            </Container>
        </>
    )
}

export default CreateQuiz
