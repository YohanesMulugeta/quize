import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Question from './Question';
import StartScreen from './StartScreen';
import Error from './Error';
import Loader from './Loader';
import Options from './Options';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
};

function reducer(currState, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...currState, questions: action.payload, status: 'ready' };
      break;
    case 'dataFailed':
      return { ...currState, status: 'error' };
      break;
    case 'startQuize':
      return { ...currState, status: 'active' };
      break;
    case 'newAnswer':
      return { ...currState, answer: action.payload };
      break;

    default:
      throw new Error('Unkown Action');
      break;
  }
}

function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numOfQuestions = questions.length;

  console.log(answer);

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
          <Question question={questions[index]}>
            <Options question={questions[index]} dispatch={dispatch} answer={answer} />
          </Question>
        )}
        {status === 'ready' && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
