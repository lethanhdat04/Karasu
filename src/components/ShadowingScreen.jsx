// ============================================
// SHADOWING SCREEN - With YouTube & Speech Recognition
// Màn hình luyện phát âm với video thật và nhận dạng giọng nói
// ============================================

import { useState, useEffect } from 'react';
import YouTubePlayer, { seekToTime } from './YouTubePlayer';
import { startRecording, stopRecording, compareTranscripts, generateFeedback, isSpeechRecognitionSupported } from '../utils/speechRecognition';

export default function ShadowingScreen({ lesson, onComplete, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userTranscript, setUserTranscript] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [autoStop, setAutoStop] = useState(true);
  const [largeVideo, setLargeVideo] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [answers, setAnswers] = useState([]);

  const currentSentence = lesson.sentences[currentIndex];

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 0.1);
      }, 100);

      if (autoStop) {
        const duration = currentSentence.endTime - currentSentence.startTime + 2; // +2 giây buffer
        const timeout = setTimeout(() => {
          handleStopRecording();
        }, duration * 1000);

        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, autoStop, currentSentence]);

  // Handle start recording
  const handleStartRecording = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Trình duyệt không hỗ trợ Speech Recognition. Vui lòng sử dụng Chrome hoặc Edge.');
      return;
    }

    setIsRecording(true);
    setUserTranscript('');
    setShowResult(false);

    startRecording(
      (response) => {
        // On result
        setUserTranscript(response.transcript);
        handleStopRecording();
      },
      (error) => {
        // On error
        console.error('Recording error:', error);
        setIsRecording(false);
        alert('Lỗi khi ghi âm. Vui lòng thử lại.');
      }
    );
  };

  // Handle stop recording
  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
  };

  // Analyze result
  useEffect(() => {
    if (userTranscript && !isRecording) {
      const comparison = compareTranscripts(userTranscript, currentSentence.japanese);
      const feedback = generateFeedback(comparison.accuracy, userTranscript, currentSentence.japanese);

      setResult({
        ...comparison,
        feedback,
      });
      setShowResult(true);

      // Save answer
      const newAnswer = {
        sentence: currentSentence,
        userTranscript,
        score: comparison.accuracy,
        isCorrect: comparison.isCorrect,
      };
      setAnswers([...answers, newAnswer]);
    }
  }, [userTranscript, isRecording]);

  // Handle next
  const handleNext = () => {
    if (currentIndex < lesson.sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserTranscript('');
      setShowResult(false);
      setResult(null);
    } else {
      // Complete
      const totalScore = answers.length > 0
        ? Math.round(answers.reduce((sum, a) => sum + a.score, 0) / answers.length)
        : 0;

      onComplete({
        mode: 'shadowing',
        answers,
        totalAccuracy: totalScore,
      });
    }
  };

  // Handle click transcript item
  const handleTranscriptClick = (index) => {
    setCurrentIndex(index);
    const sentence = lesson.sentences[index];
    seekToTime(sentence.startTime);
    setUserTranscript('');
    setShowResult(false);
    setResult(null);
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
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-sm px-4 py-2 bg-dark-border hover:bg-primary text-dark-text hover:text-white rounded-button transition-colors"
              >
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showTranscript ? 'lg:grid-cols-[1fr,400px]' : 'grid-cols-1'}`}>
          {/* Left Section */}
          <div className="space-y-6">
            {/* YouTube Player */}
            <div className="bg-dark-card rounded-card overflow-hidden">
              <YouTubePlayer
                videoId={lesson.youtubeId}
                startTime={currentSentence.startTime}
                endTime={currentSentence.endTime}
                className={largeVideo ? 'aspect-video' : 'h-96'}
              />

              {/* Controls */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="autoStop"
                      checked={autoStop}
                      onChange={(e) => setAutoStop(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="autoStop" className="text-sm text-dark-text cursor-pointer">
                      Auto Stop
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="largeVideo"
                      checked={largeVideo}
                      onChange={(e) => setLargeVideo(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="largeVideo" className="text-sm text-dark-text cursor-pointer">
                      Large-sized video
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Sentence */}
            <div className="bg-dark-card rounded-card p-6 text-center">
              <ruby className="text-3xl font-japanese font-bold text-dark-text block mb-3">
                {currentSentence.japanese}
              </ruby>
              <p className="text-dark-text-secondary italic mb-4">{currentSentence.romaji}</p>
              <p className="text-dark-text">{currentSentence.vietnamese}</p>
            </div>

            {/* Recording Controls */}
            <div className="bg-dark-card rounded-card p-6">
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => seekToTime(currentSentence.startTime)}
                  className="flex-1 bg-dark-border hover:bg-primary text-dark-text hover:text-white py-3 rounded-button transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Play sample
                </button>
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  disabled={!isSpeechRecognitionSupported()}
                  className={`flex-1 py-3 rounded-button font-bold transition-all flex items-center justify-center gap-2 ${
                    isRecording
                      ? 'bg-danger text-white'
                      : 'bg-secondary hover:bg-purple-600 text-white disabled:opacity-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                  {isRecording ? `Recording... ${recordingTime.toFixed(1)}s` : 'Record'}
                </button>
              </div>

              {/* Result Display */}
              {showResult && result && (
                <div className="space-y-4 border-t border-dark-border pt-4">
                  {/* Score */}
                  <div className="text-center">
                    <div className={`text-5xl font-bold mb-2 ${
                      result.accuracy >= 80 ? 'text-success' :
                      result.accuracy >= 50 ? 'text-accent' : 'text-danger'
                    }`}>
                      {result.accuracy}%
                    </div>
                    <p className="text-dark-text-secondary">Độ chính xác</p>
                  </div>

                  {/* User transcript with highlighting */}
                  <div className="bg-dark-bg rounded-button p-4">
                    <p className="text-sm text-dark-text-secondary mb-2">Câu bạn nói:</p>
                    <div className="flex flex-wrap gap-1 font-japanese text-lg">
                      {result.comparedChars.map((char, i) => (
                        <span
                          key={i}
                          className={`px-1 rounded ${
                            char.isCorrect ? 'bg-success bg-opacity-20 text-success' :
                            char.isMissing ? 'bg-dark-border text-dark-text-secondary line-through' :
                            'bg-danger bg-opacity-20 text-danger'
                          }`}
                        >
                          {char.user || char.correct}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Correct answer */}
                  <div className="bg-dark-bg rounded-button p-4">
                    <p className="text-sm text-dark-text-secondary mb-2">Đáp án đúng:</p>
                    <p className="font-japanese text-lg text-success">{currentSentence.japanese}</p>
                  </div>

                  {/* Feedback */}
                  <div className="bg-primary bg-opacity-10 rounded-button p-4">
                    {result.feedback.map((fb, i) => (
                      <p key={i} className="text-sm text-primary">{fb}</p>
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={handleNext}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-button transition-colors"
                  >
                    {currentIndex < lesson.sentences.length - 1 ? 'Next →' : 'Finish'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Transcript */}
          {showTranscript && (
            <div className="bg-dark-card rounded-card p-4 h-fit sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-dark-text">Transcript</h3>
                <div className="text-sm text-dark-text-secondary">
                  {currentIndex + 1} / {lesson.sentences.length}
                </div>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {lesson.sentences.map((sentence, index) => (
                  <div
                    key={index}
                    onClick={() => handleTranscriptClick(index)}
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
                        <p className="font-japanese text-dark-text text-sm mb-1">{sentence.japanese}</p>
                        <p className="text-xs text-dark-text-secondary">{sentence.vietnamese}</p>
                      </div>
                      {answers.find(a => a.sentence === sentence) && (
                        <div className={`text-xs font-bold ${
                          answers.find(a => a.sentence === sentence).isCorrect ? 'text-success' : 'text-danger'
                        }`}>
                          {answers.find(a => a.sentence === sentence).score}%
                        </div>
                      )}
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
