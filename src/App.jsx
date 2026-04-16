// ============================================
// MAIN APP COMPONENT
// Quản lý state và routing cho toàn bộ ứng dụng
// ============================================

import { useState } from 'react';
import Navbar from './components/Navbar';
import TopicsPage from './components/TopicsPage';
import ModeSelectionModal from './components/ModeSelectionModal';
import DictationScreen from './components/DictationScreen';
import ShadowingScreen from './components/ShadowingScreen';
import ResultScreen from './components/ResultScreen';
import { lessons } from './data/mockData';

function App() {
  // View state: 'topics' | 'progress' | 'vocabulary' | 'dictation' | 'shadowing' | 'result'
  const [currentView, setCurrentView] = useState('topics');

  // Selected lesson
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Show mode selection modal
  const [showModeModal, setShowModeModal] = useState(false);

  // Learning result
  const [learningResult, setLearningResult] = useState(null);

  // Handle lesson selection
  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setShowModeModal(true);
  };

  // Handle mode selection
  const handleModeSelect = (mode) => {
    setShowModeModal(false);
    if (mode === 'dictation') {
      setCurrentView('dictation');
    } else if (mode === 'shadowing') {
      setCurrentView('shadowing');
    }
  };

  // Handle lesson complete
  const handleLessonComplete = (result) => {
    setLearningResult(result);
    setCurrentView('result');
  };

  // Handle navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view === 'topics') {
      setSelectedLesson(null);
      setLearningResult(null);
    }
  };

  // Handle review mistakes
  const handleReviewMistakes = () => {
    // Quay lại chế độ học với các câu sai
    if (learningResult.mode === 'dictation') {
      setCurrentView('dictation');
    } else {
      setCurrentView('shadowing');
    }
  };

  // Handle next lesson
  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
    const nextLesson = lessons[(currentIndex + 1) % lessons.length];
    setSelectedLesson(nextLesson);
    setShowModeModal(true);
    setCurrentView('topics');
    setLearningResult(null);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navbar - chỉ hiện khi không đang học */}
      {!['dictation', 'shadowing', 'result'].includes(currentView) && (
        <Navbar currentView={currentView} onNavigate={handleNavigate} />
      )}

      {/* Main Content */}
      <main>
        {/* Topics Page */}
        {currentView === 'topics' && (
          <TopicsPage onLessonSelect={handleLessonSelect} />
        )}

        {/* Progress Page (Placeholder) */}
        {currentView === 'progress' && (
          <div className="min-h-screen bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h1 className="text-3xl font-bold text-dark-text mb-4">My Progress</h1>
              <p className="text-dark-text-secondary">
                Trang thống kê tiến độ học tập (đang phát triển)
              </p>
            </div>
          </div>
        )}

        {/* Vocabulary Page (Placeholder) */}
        {currentView === 'vocabulary' && (
          <div className="min-h-screen bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h1 className="text-3xl font-bold text-dark-text mb-4">Vocabulary</h1>
              <p className="text-dark-text-secondary">
                Bộ từ vựng của bạn (đang phát triển)
              </p>
            </div>
          </div>
        )}

        {/* Dictation Screen */}
        {currentView === 'dictation' && selectedLesson && (
          <DictationScreen
            lesson={selectedLesson}
            onComplete={handleLessonComplete}
            onExit={() => handleNavigate('topics')}
          />
        )}

        {/* Shadowing Screen */}
        {currentView === 'shadowing' && selectedLesson && (
          <ShadowingScreen
            lesson={selectedLesson}
            onComplete={handleLessonComplete}
            onExit={() => handleNavigate('topics')}
          />
        )}

        {/* Result Screen */}
        {currentView === 'result' && learningResult && selectedLesson && (
          <ResultScreen
            lesson={selectedLesson}
            result={learningResult}
            onReviewMistakes={handleReviewMistakes}
            onNextLesson={handleNextLesson}
            onBackToTopics={() => handleNavigate('topics')}
          />
        )}
      </main>

      {/* Mode Selection Modal */}
      {showModeModal && selectedLesson && (
        <ModeSelectionModal
          lesson={selectedLesson}
          onClose={() => setShowModeModal(false)}
          onSelectMode={handleModeSelect}
        />
      )}
    </div>
  );
}

export default App;
