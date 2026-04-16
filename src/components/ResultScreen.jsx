// ============================================
// RESULT SCREEN
// Màn hình hiển thị kết quả sau khi hoàn thành bài học
// ============================================

import { useState, useEffect } from 'react';

export default function ResultScreen({ lesson, result, onReviewMistakes, onNextLesson, onBackToTopics }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [expandedSentence, setExpandedSentence] = useState(null);

  // Hide confetti sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Tính toán thống kê
  const totalSentences = result.answers.length;
  const correctAnswers = result.answers.filter(a => a.isCorrect).length;
  const streak = 5; // Mock streak

  // Lấy từ vựng mới từ bài học
  const newVocabulary = lesson.sentences.slice(0, 5).map(s => ({
    japanese: s.japanese,
    vietnamese: s.vietnamese,
  }));

  return (
    <div className="min-h-screen bg-secondary relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti absolute"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#E63946', '#FFB703', '#457B9D', '#F1FAEE'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4 animate-bounce">🏆</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hoàn thành bài học!
          </h1>
          <p className="text-gray-600">
            Chúc mừng bạn đã hoàn thành bài "{lesson.title}"
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Accuracy */}
          <div className="bg-white rounded-card p-6 shadow-md text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {result.totalAccuracy}%
            </div>
            <div className="text-gray-600 font-medium">Độ chính xác</div>
          </div>

          {/* Correct Answers */}
          <div className="bg-white rounded-card p-6 shadow-md text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">
              {correctAnswers}/{totalSentences}
            </div>
            <div className="text-gray-600 font-medium">Câu đúng</div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-card p-6 shadow-md text-center">
            <div className="text-5xl mb-2">🔥</div>
            <div className="text-3xl font-bold text-orange-600 mb-1">{streak} ngày</div>
            <div className="text-gray-600 font-medium text-sm">Streak liên tiếp</div>
          </div>
        </div>

        {/* Sentence Review */}
        <div className="bg-white rounded-card p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Danh sách câu đã luyện</h2>
          <div className="space-y-3">
            {result.answers.map((answer, index) => (
              <div key={index} className="border border-gray-200 rounded-button overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpandedSentence(expandedSentence === index ? null : index)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl ${answer.isCorrect ? '✅' : '❌'}`}>
                      {answer.isCorrect ? '✅' : '❌'}
                    </span>
                    <span className="font-japanese text-gray-800">
                      {answer.sentence.japanese}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${
                      answer.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.mode === 'dictation' ? answer.accuracy : answer.score}%
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform ${expandedSentence === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedSentence === index && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Romaji:</span>
                        <p className="text-gray-700">{answer.sentence.romaji}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Nghĩa:</span>
                        <p className="text-gray-700">{answer.sentence.vietnamese}</p>
                      </div>
                      {result.mode === 'dictation' && answer.userInput && (
                        <div>
                          <span className="text-sm font-semibold text-gray-600">Câu trả lời của bạn:</span>
                          <p className="font-japanese text-gray-700">{answer.userInput}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* New Vocabulary */}
        <div className="bg-white rounded-card p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Từ vựng mới học được 📚
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {newVocabulary.map((vocab, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-button hover:bg-gray-100 transition-colors"
              >
                <span className="font-japanese font-medium text-gray-800">
                  {vocab.japanese}
                </span>
                <span className="text-sm text-gray-600">{vocab.vietnamese}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-accent hover:bg-yellow-500 text-gray-800 font-medium py-2 rounded-button transition-all">
            💾 Lưu vào Flashcard
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onBackToTopics}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-button transition-all"
          >
            ← Về trang chủ
          </button>
          {result.answers.some(a => !a.isCorrect) && (
            <button
              onClick={onReviewMistakes}
              className="flex-1 bg-accent hover:bg-yellow-500 text-gray-800 font-bold py-4 rounded-button transition-all"
            >
              📚 Ôn lại lỗi sai
            </button>
          )}
          <button
            onClick={onNextLesson}
            className="flex-1 bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-button transition-all"
          >
            Bài tiếp theo →
          </button>
        </div>
      </div>
    </div>
  );
}
