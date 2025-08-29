import React from "react";
import { BookOpen } from "lucide-react";

const SubjectCard = ({ subject, onStartQuiz }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center space-x-3 mb-4">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">{subject.title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
      <button
        onClick={() => onStartQuiz(subject)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default SubjectCard;
