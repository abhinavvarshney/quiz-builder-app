import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getDataFromLocalStorage } from '../../utils/dataStorage';
import { KEYS_IN_LOCAL_STORAGE } from '../../constants';

/**
 * @description Reusable component to display quiz cards
 * @param {boolean} allQuizByAUser boolean value to check whether to show all quiz or just created by a particular user
 * @returns React.Component
*/
const QuizCard = ({
    allQuizByAUser = false
}) => {

    const [allQuiz, setAllQuiz] = useState([]);

    /*
     * Reusable component : if used in all quiz page show all quiz
     * Otherwise only show created a particular user 
    */

    useEffect(() => {
        const allQuizList = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.QUIZ_LIST);

        if (allQuizByAUser) {
            const {
                id
            } = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.USER_INFO);

            const filteredQuiz = allQuizList?.filter(({ quizCreatedByUser = '' }) => quizCreatedByUser === id);

            setAllQuiz(filteredQuiz);
        } else {
            setAllQuiz(allQuizList);
        }

    }, [])

    return (
        <>
            {
                allQuiz?.length ? (
                    allQuiz?.map((quiz, quizIdx) => {
                        const {
                            title = '',
                            permaLink = ''
                        } = quiz;
                        return (
                            <div key={quizIdx} className='mt-2'>
                                <Card className='p-4 w-md-50'>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Body>
                                        PermaLink: <b>{permaLink}</b> <img onClick={() =>  navigator.clipboard.writeText(permaLink)} className='icon-copy' src='./copyicon.png' />
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                ) : <span>No Quiz Available</span>
            }
        </>
    )
}

export default QuizCard
