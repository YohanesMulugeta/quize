function StartScreen({ numOfQuestions, dispatch }) {
  const handleStartClick = () => {
    dispatch({ type: 'startQuize', payload: 'active' });
  };

  return (
    <div className="start">
      <h2>Welcome to React Quize!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button onClick={handleStartClick} className="btn btn-ui">
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
