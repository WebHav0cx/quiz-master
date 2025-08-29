import React, { useEffect, useState } from "react";
import SubjectCard from "./SubjectCard";
import ScoreHistory from "./ScoreHistory";
import { subjectAPI } from "../../services/api";

const Dashboard = ({ user, onStartQuiz }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await subjectAPI.getAll();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">Choose a subject to start your quiz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onStartQuiz={onStartQuiz}
          />
        ))}
      </div>

      <ScoreHistory scores={user?.scores || []} />
    </div>
  );
};

export default Dashboard;
