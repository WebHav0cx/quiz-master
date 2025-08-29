import React, { useState } from "react";
import NavBar from "./components/common/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import Quiz from "./components/quiz/Quiz";
import Results from "./components/quiz/Results";
import AdminDashboard from "./components/admin/AdminDashboard";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [score, setScore] = useState(null);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar currentView={currentView} onViewChange={setCurrentView} />

      {currentView === "dashboard" && (
        <Dashboard
          user={user}
          onStartQuiz={(subject) => {
            setSelectedSubject(subject);
            setCurrentView("quiz");
          }}
        />
      )}

      {currentView === "quiz" && selectedSubject && (
        <Quiz
          subject={selectedSubject}
          onSubmit={(finalScore) => {
            setScore(finalScore);
            setCurrentView("results");
          }}
          onCancel={() => setCurrentView("dashboard")}
        />
      )}

      {currentView === "results" && (
        <Results
          subject={selectedSubject}
          score={score}
          onRetake={() => setCurrentView("quiz")}
          onDashboard={() => setCurrentView("dashboard")}
        />
      )}

      {currentView === "admin" && user?.role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default App;
