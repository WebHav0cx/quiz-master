import React from "react";
import { Trophy, RotateCcw, Home } from "lucide-react";

const Results = ({ subject, score, onRetake, onDashboard }) => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Quiz Completed!
        </h2>
        <p className="text-lg text-gray-700 mb-2">
          Subject: <span className="font-semibold">{subject.title}</span>
        </p>
        <p className="text-2xl font-bold text-blue-600 mb-6">{score}%</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onRetake}
            className="flex items-center space-x-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
          <button
            onClick={onDashboard}
            className="flex items-center space-x-2 px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            <Home className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
