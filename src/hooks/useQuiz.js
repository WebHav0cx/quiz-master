// src/hooks/useQuiz.js
import { useState, useCallback } from "react";
import { quizAPI } from "../services/api";

/**
 * useQuiz - manages loading a quiz and submitting results
 * Returns:
 *  - currentQuiz: null | data
 *  - answers: object
 *  - loading, error
 *  - startQuiz(subjectId)
 *  - setAnswer(questionIndex, answerIndex)
 *  - submitQuiz()
 */
export const useQuiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = useCallback(async (subjectId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await quizAPI.getQuizBySubject(subjectId);
      setCurrentQuiz(res.data);
      setAnswers({});
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const setAnswer = useCallback((questionIndex, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }));
  }, []);

  const submitQuiz = useCallback(async () => {
    if (!currentQuiz) throw new Error("No quiz loaded");
    setLoading(true);
    setError(null);
    try {
      const res = await quizAPI.submitQuiz(currentQuiz.id, answers);
      return res.data; // expected result payload
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentQuiz, answers]);

  return {
    currentQuiz,
    answers,
    loading,
    error,
    startQuiz,
    setAnswer,
    submitQuiz,
  };
};
