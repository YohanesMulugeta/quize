import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Question from './components/Question';
import StartScreen from './components/StartScreen';
import Error from './Error';
import Loader from './Loader';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
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
      return { ...currState, status: action.payload };
      break;

    default:
      throw new Error('Unkown Action');
      break;
  }
}

function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;

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
        {status === 'active' && <Question questions={questions} />}
        {status === 'ready' && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
