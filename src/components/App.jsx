/* eslint-disable no-case-declarations */
import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Question from './Question';
import StartScreen from './StartScreen';
import Error from './Error';
import Loader from './Loader';
import Options from './Options';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function reducer(currState, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...currState, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...currState, status: 'error' };

    case 'startQuize':
      return { ...currState, status: 'active' };

    case 'newAnswer':
      const currQuestion = currState.questions[currState.index];
      return {
        ...currState,
        answer: action.payload,
        points:
          currState.points +
          (action.payload === currQuestion.correctOption ? currQuestion.points : 0),
      };

    case 'nextQuestion':
      return {
        ...currState,
        index: 1 + currState.index,
        answer: null,
      };

    case 'finish':
      return { ...currState, status: 'finished' };

    default:
      throw new Error('Unkown Action');
  }
}

function App() {
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numOfQuestions = questions.length;
  const maxPossPoints = questions.reduce((acc, ques) => acc + ques.points, 0);

  // Fetch data
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'active' && (
          <>
            <Progress
              maxPossPoints={maxPossPoints}
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              answer={answer}
            />
            <Question question={questions[index]}>
              <Options question={questions[index]} dispatch={dispatch} answer={answer} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            </Question>
          </>
        )}
        {status === 'ready' && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === 'finished' && (
          <FinishScreen points={points} maxPossPoints={maxPossPoints} />
        )}
      </Main>
    </div>
  );
}

export default App;
