import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestions } from '../../store/slices/questionSlice';
import { MessageCircle, Clock, Plus } from 'lucide-react';

const QuestionList = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Urgent':
        return 'text-red-600 bg-red-100';
      case 'High':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Community Questions
          </h1>
          <p className="text-gray-500 mt-1">
            Browse and answer questions from other students
          </p>
        </div>
        <Link
          to="/questions/ask"
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ask Question
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500">
                No questions found. Be the first to ask!
              </p>
            </div>
          ) : (
            questions.map((question) => (
              <Link
                key={question._id}
                to={`/questions/${question._id}`}
                className="block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2 mb-2">
                    {question.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${getUrgencyColor(
                      question.urgency
                    )}`}
                  >
                    {question.urgency}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                  {question.content}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">
                        {question.author?.name || 'Anonymous'}
                      </span>
                      <span className="text-xs">
                        {question.author?.institution}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(question.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center text-indigo-600">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>Answer</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionList;
