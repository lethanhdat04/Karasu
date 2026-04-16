// ============================================
// SPEECH RECOGNITION UTILITIES
// Web Speech API để nhận dạng giọng nói
// ============================================

let recognition = null;

// Initialize speech recognition
export const initSpeechRecognition = (language = 'ja-JP') => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error('Speech Recognition not supported');
    return null;
  }

  recognition = new SpeechRecognition();
  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition;
};

// Start recording
export const startRecording = (onResult, onError) => {
  if (!recognition) {
    recognition = initSpeechRecognition();
  }

  if (!recognition) {
    if (onError) onError(new Error('Speech Recognition not supported'));
    return;
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const confidence = event.results[0][0].confidence;

    if (onResult) {
      onResult({
        transcript,
        confidence,
      });
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
  };

  try {
    recognition.start();
  } catch (error) {
    console.error('Error starting recognition:', error);
    if (onError) onError(error);
  }
};

// Stop recording
export const stopRecording = () => {
  if (recognition) {
    recognition.stop();
  }
};

// Compare user speech with correct text
export const compareTranscripts = (userText, correctText) => {
  // Normalize both texts
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[、。！？]/g, '');
  };

  const normalizedUser = normalizeText(userText);
  const normalizedCorrect = normalizeText(correctText);

  // Split into characters for Japanese
  const userChars = normalizedUser.split('');
  const correctChars = normalizedCorrect.split('');

  const maxLength = Math.max(userChars.length, correctChars.length);
  let matchCount = 0;
  const comparedChars = [];

  for (let i = 0; i < maxLength; i++) {
    const userChar = userChars[i] || '';
    const correctChar = correctChars[i] || '';

    const isMatch = userChar === correctChar;
    if (isMatch) matchCount++;

    comparedChars.push({
      user: userChar,
      correct: correctChar,
      isCorrect: isMatch,
      isMissing: !userChar && !!correctChar,
      isExtra: !!userChar && !correctChar,
    });
  }

  const accuracy = maxLength > 0 ? Math.round((matchCount / maxLength) * 100) : 0;

  return {
    accuracy,
    comparedChars,
    isCorrect: accuracy >= 80,
  };
};

// Get words from text for detailed comparison
export const getWordsComparison = (userText, correctText) => {
  // For Japanese, split by character
  const userChars = userText.split('');
  const correctChars = correctText.split('');

  const maxLen = Math.max(userChars.length, correctChars.length);
  const words = [];

  for (let i = 0; i < maxLen; i++) {
    const userChar = userChars[i] || '';
    const correctChar = correctChars[i] || '';

    words.push({
      user: userChar,
      correct: correctChar,
      isCorrect: userChar === correctChar,
    });
  }

  return words;
};

// Calculate score and generate feedback
export const generateFeedback = (accuracy, userText, correctText) => {
  const feedback = [];

  if (accuracy >= 90) {
    feedback.push('✅ Xuất sắc!');
    feedback.push('Phát âm chính xác');
    feedback.push('Ngữ điệu tự nhiên');
  } else if (accuracy >= 75) {
    feedback.push('👍 Tốt!');
    feedback.push('Phát âm khá chính xác');
    feedback.push('Cần luyện thêm một chút');
  } else if (accuracy >= 50) {
    feedback.push('⚠️ Cần cải thiện');
    feedback.push('Một số từ chưa chính xác');
    feedback.push('Nghe lại và luyện tập thêm');
  } else {
    feedback.push('❌ Cần luyện nhiều hơn');
    feedback.push('Hãy nghe kỹ câu mẫu');
    feedback.push('Thử lại từ từ');
  }

  return feedback;
};

// Check browser support
export const isSpeechRecognitionSupported = () => {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
};
