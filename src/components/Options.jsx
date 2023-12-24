function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;

  function handlOptClick() {
    dispatch({ type: 'newAnswer', payload: this.i });
  }

  return (
    <div className="options">
      {question.options.map((opt, i) => (
        <button
          onClick={handlOptClick.bind({ i })}
          key={opt}
          className={`${
            hasAnswer ? (question.correctOption === i ? 'correct' : 'wrong') : ''
          } ${answer === i ? 'answer' : ''} btn btn-option`}
          disabled={hasAnswer}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
