import React from "react";

const ScoreHistory = ({ scores }) => {
  if (!scores?.length) {
    return <p className="text-gray-500">No scores available yet.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Score History
      </h3>
      <ul className="space-y-2">
        {scores.map((score, index) => (
          <li
            key={index}
            className="flex justify-between text-gray-700 border-b pb-2"
          >
            <span>{score.subject}</span>
            <span className="font-medium">{score.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreHistory;
