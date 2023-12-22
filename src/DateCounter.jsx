import { useReducer } from 'react';

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'inc':
      newState = { ...state, count: state.count + state.step };
      break;
    case 'dec':
      newState = { ...state, count: state.count - state.step };
      break;

    case 'define-step':
      newState = { ...state, step: action.payload };
      break;
    case 'define-count':
      newState = { ...state, count: action.payload };
      break;
    case 'reset':
      newState = { step: 1, count: 0 };
      break;

    default:
      newState = { ...state };
      break;
  }

  return newState;
}

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, { step: 1, count: 0 });

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e) {
    console.log(e.target.value);
    // setCount(Number(e.target.value));
    dispatch({ type: 'define-count', payload: +e.target.value });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: 'define-step', payload: +e.target.value });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
