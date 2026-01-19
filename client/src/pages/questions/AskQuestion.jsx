import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createQuestion,
  resetQuestionState,
} from '../../store/slices/questionSlice';
import { AlertCircle, CheckCircle } from 'lucide-react';

const AskQuestion = () => {
  const [formData, setFormData] = useState({
    subjects: '', // Will split by comma
    content: '',
    urgency: 'Normal',
  });

  const { subjects, content, urgency } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.questions);

  useEffect(() => {
    if (success) {
      dispatch(resetQuestionState());
      navigate('/questions');
    }
  }, [success, navigate, dispatch]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Validate inputs if needed
    const subjectList = subjects
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);

    dispatch(
      createQuestion({
        subjects: subjectList,
        content,
        urgency,
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Ask a Question
          </h1>
          <p className="text-gray-500 mt-2">
            Get help from the community quickly
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="subjects"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subjects (comma separated)
            </label>
            <input
              type="text"
              id="subjects"
              name="subjects"
              value={subjects}
              onChange={onChange}
              placeholder="e.g. Physics, Calculus, History"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="urgency"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              value={urgency}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Question Details
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={onChange}
              rows="6"
              placeholder="Describe your question in detail..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1 text-right">
              {content.length}/500
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md
                ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Posting...
              </span>
            ) : (
              'Post Question'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
