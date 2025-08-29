import React, { useEffect, useState } from "react";
import { subjectAPI } from "../../services/api";
import { PlusCircle, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await subjectAPI.getAll();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await subjectAPI.delete(id);
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete subject", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>

      <div className="mb-6 flex justify-end">
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <PlusCircle className="w-5 h-5" />
          <span>Add Subject</span>
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl divide-y">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="flex items-center justify-between px-6 py-4"
          >
            <span className="font-medium text-gray-800">{subject.title}</span>
            <button
              onClick={() => handleDelete(subject.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
