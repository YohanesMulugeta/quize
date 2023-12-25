function NextButton({ dispatch, answer }) {
  return answer === null ? null : (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: 'nextQuestion' });
      }}
    >
      Next
    </button>
  );
}

export default NextButton;
