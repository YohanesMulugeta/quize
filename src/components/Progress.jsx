function Progress({ index, numOfQuestions, points, maxPossPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossPoints}
      </p>
    </header>
  );
}

export default Progress;
