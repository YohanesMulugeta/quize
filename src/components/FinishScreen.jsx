function FinishScreen({ points, maxPossPoints, highscore }) {
  const percentage = (points * 100) / maxPossPoints;

  let emoji;

  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '😊';
  if (percentage > 0 && percentage < 50) emoji = '🤔';
  if (percentage === 0) emoji = '🤦';

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossPoints} (
        {Math.ceil(percentage)}% )
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishScreen;
