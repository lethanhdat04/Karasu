// ============================================
// DICTATION SCREEN (Parroto Style)
// Màn hình luyện nghe và chép lại với word reveal
// ============================================

import { useState } from 'react';

export default function DictationScreen({ lesson, onComplete, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [difficulty, setDifficulty] = useState('Normal'); // Easy | Normal | Hard
  const [revealedWords, setRevealedWords] = useState([]);
  const [showVideo, setShowVideo] = useState(true);
  const [showTranscript, setShowTranscript] = useState(true);
  const [speed, setSpeed] = useState(1);

  const currentSentence = lesson.sentences[currentIndex];

  // Split câu thành từng từ
  const words = currentSentence.japanese.split('');

  // Toggle reveal word
  const toggleRevealWord = (index) => {
    if (revealedWords.includes(index)) {
      setRevealedWords(revealedWords.filter(i => i !== index));
    } else {
      setRevealedWords([...revealedWords, index]);
    }
  };

  // Reveal all words
  const revealAllWords = () => {
    setRevealedWords(words.map((_, i) => i));
  };

  const handleNext = () => {
    if (currentIndex < lesson.sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setRevealedWords([]);
    } else {
      onComplete({
        mode: 'dictation',
        answers: [],
        totalAccuracy: 85,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserInput('');
      setRevealedWords([]);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onExit}
                className="text-primary hover:text-primary-light"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="font-bold text-dark-text">{lesson.title}</h2>
                <p className="text-xs text-dark-text-secondary">Level: {lesson.level}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!showVideo && (
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-sm px-4 py-2 bg-dark-border hover:bg-primary text-dark-text hover:text-white rounded-button transition-colors"
                >
                  {showTranscript ? 'Hide' : 'Show'} Transcript
                </button>
              )}
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="text-sm px-4 py-2 bg-dark-border hover:bg-primary text-dark-text hover:text-white rounded-button transition-colors"
              >
                {showVideo ? 'Hide' : 'Show'} Media
              </button>
              <div className="flex items-center gap-2 text-dark-text">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">0:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showTranscript ? 'lg:grid-cols-[1fr,400px]' : 'grid-cols-1'}`}>
          {/* Left Section */}
          <div className="space-y-6">
            {/* Video Player */}
            {showVideo && (
              <div className="bg-dark-card rounded-card overflow-hidden">
                <div className="h-96 bg-dark-border flex items-center justify-center relative">
                  <span className="text-9xl">{lesson.emoji}</span>
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                      <svg className="w-10 h-10 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Controls Card */}
            <div className="bg-dark-card rounded-card p-6">
              {/* Difficulty */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {['Easy', 'Normal', 'Hard'].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-6 py-2 rounded-button font-medium transition-all ${
                      difficulty === level
                        ? level === 'Easy' ? 'bg-success text-white'
                          : level === 'Normal' ? 'bg-primary text-white'
                          : 'bg-danger text-white'
                        : 'bg-dark-border text-dark-text hover:bg-primary hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="w-10 h-10 rounded-full bg-dark-border hover:bg-primary text-dark-text hover:text-white disabled:opacity-30 flex items-center justify-center transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  </svg>
                </button>

                <button className="w-10 h-10 rounded-full bg-dark-border hover:bg-primary text-dark-text hover:text-white flex items-center justify-center transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                  </svg>
                </button>

                <button className="w-12 h-12 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-all">
                  <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-dark-border hover:bg-primary text-dark-text hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                  </svg>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-button bg-dark-border hover:bg-primary text-dark-text hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{speed}x</span>
                </button>

                <button className="w-10 h-10 rounded-full bg-dark-border hover:bg-primary text-dark-text hover:text-white flex items-center justify-center transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>

                <button className="w-10 h-10 rounded-full bg-dark-border hover:bg-primary text-dark-text hover:text-white flex items-center justify-center transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </button>
              </div>

              {/* Input Area */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-primary font-semibold mb-2">Type what you hear:</p>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-24 px-4 py-3 bg-dark-bg border-2 border-dark-border focus:border-primary rounded-button text-dark-text font-japanese text-lg resize-none outline-none transition-colors"
                  />
                </div>

                {/* Word Reveal Grid */}
                <div>
                  <div className="flex flex-wrap gap-2 justify-center mb-3">
                    {words.map((word, index) => (
                      <button
                        key={index}
                        onClick={() => toggleRevealWord(index)}
                        className={`group relative px-4 py-2 rounded-button border-2 transition-all ${
                          revealedWords.includes(index)
                            ? 'bg-primary-dark border-primary text-white'
                            : 'bg-dark-border border-dark-border hover:border-primary'
                        }`}
                      >
                        {revealedWords.includes(index) ? (
                          <span className="font-japanese font-medium">{word}</span>
                        ) : (
                          <>
                            <span className="text-dark-text-secondary blur-sm select-none">***</span>
                            <svg className="w-4 h-4 absolute top-1 right-1 text-dark-text-secondary group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-center text-dark-text-secondary mb-3">
                    Revealed words will be counted as mistakes and will affect your score.
                  </p>

                  <button
                    onClick={revealAllWords}
                    className="w-full bg-danger hover:bg-red-600 text-white font-medium py-3 rounded-button transition-colors"
                  >
                    Show all words
                  </button>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-full bg-secondary hover:bg-purple-600 text-white font-bold py-3 rounded-button transition-colors flex items-center justify-center gap-2"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mascot */}
            {!showVideo && (
              <div className="flex justify-center">
                <div className="text-9xl animate-bounce">
                  🐦‍⬛
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Transcript */}
          {showTranscript && (
            <div className="bg-dark-card rounded-card p-4 h-fit sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-dark-text">Transcript</h3>
                <div className="flex items-center gap-2">
                  <button className="text-xs px-3 py-1 bg-primary text-white rounded-button">
                    IPA
                  </button>
                  <button className="text-xs px-3 py-1 bg-dark-border text-dark-text rounded-button hover:bg-primary hover:text-white">
                    Trans
                  </button>
                </div>
              </div>

              <div className="text-sm text-dark-text-secondary mb-3">0%</div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {lesson.sentences.map((sentence, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`p-3 rounded-button cursor-pointer transition-all ${
                      index === currentIndex
                        ? 'bg-primary bg-opacity-20 border border-primary'
                        : 'hover:bg-dark-border'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`text-xs font-bold px-2 py-1 rounded ${
                        index === currentIndex ? 'bg-primary text-white' : 'bg-dark-border text-dark-text-secondary'
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-japanese text-dark-text text-sm blur-[6px] select-none">
                          {sentence.japanese.split('').map(() => '●').join('')}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button className="text-dark-text-secondary hover:text-primary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-dark-text-secondary hover:text-danger">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
