import React, { useState } from "react";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Timer from "../common/Timer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Quiz = ({ subject, onSubmit, onCancel }) => {
  const questions = subject?.questions || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex,
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correctCount++;
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    onSubmit(finalScore);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              {subject.title}
            </h2>
          </div>
          <Timer initialTime={1800} onTimeUp={handleSubmit} isActive />
        </div>

        {/* Progress */}
        <ProgressBar current={currentQuestion} total={questions.length} />

        {/* Question */}
        <Question
          question={questions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
          questionIndex={currentQuestion}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentQuestion(
                  Math.min(questions.length - 1, currentQuestion + 1)
                )
              }
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
