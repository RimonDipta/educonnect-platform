import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getQuestionById } from '../../store/slices/questionSlice';
import { ArrowLeft, Clock, User, AlertCircle } from 'lucide-react';

const QuestionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentQuestion, loading, error } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    dispatch(getQuestionById(id));
  }, [dispatch, id]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Urgent':
        return 'text-red-700 bg-red-100';
      case 'High':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-green-700 bg-green-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center border border-red-200">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
        <Link
          to="/questions"
          className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Questions
        </Link>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/questions"
        className="inline-flex items-center mb-6 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Questions
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
              {currentQuestion.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium flex items-center ${getUrgencyColor(
                currentQuestion.urgency
              )}`}
            >
              {currentQuestion.urgency}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {/* Display content as title for now since we don't have separate title */}
            {/* Ideally we should have a title field, but using content snippet or full content if short */}
            Question Details
          </h1>

          <div className="prose max-w-none text-gray-800 text-lg leading-relaxed">
            {currentQuestion.content}
          </div>

          <div className="flex flex-wrap items-center mt-8 pt-6 border-t border-gray-50 text-sm text-gray-500 gap-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {currentQuestion.author?.name}
                </p>
                <p className="text-xs">{currentQuestion.author?.institution}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Posted on{' '}
              {new Date(currentQuestion.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Placeholder for Answers/Chat */}
        <div className="bg-gray-50 p-6 sm:p-8 text-center text-gray-500">
          <p>Chat / Answers feature coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
