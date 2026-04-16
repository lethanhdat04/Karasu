// ============================================
// TEXT COMPARISON UTILITIES
// Hàm so sánh text và tính accuracy cho Dictation
// ============================================

// Chuẩn hóa text để so sánh
function normalizeText(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')  // Loại bỏ khoảng trắng
    .replace(/[、。！？]/g, '');  // Loại bỏ dấu câu tiếng Nhật
}

// Chuyển romaji sang hiragana/katakana đơn giản (mock)
function romajiToKana(romaji) {
  const map = {
    'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
    'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
    'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
    'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
    'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
    'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
    'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
    'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
    'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
    'wa': 'わ', 'wo': 'を', 'n': 'ん',
    'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
    'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
    'da': 'だ', 'de': 'で', 'do': 'ど',
    'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
    'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
  };

  let result = romaji.toLowerCase();
  // Thay thế các cụm dài trước
  Object.entries(map).sort((a, b) => b[0].length - a[0].length).forEach(([rom, kana]) => {
    result = result.replace(new RegExp(rom, 'g'), kana);
  });

  return result;
}

// So sánh 2 text và trả về kết quả chi tiết
export function compareTexts(userInput, correctJapanese, correctRomaji) {
  const normalizedUser = normalizeText(userInput);
  const normalizedCorrect = normalizeText(correctJapanese);

  // Nếu user nhập romaji, convert sang kana
  let processedUser = normalizedUser;
  if (!/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(normalizedUser)) {
    // Không có ký tự Nhật nào -> là romaji
    processedUser = romajiToKana(normalizedUser);
  }

  // Tính Levenshtein distance
  const distance = levenshteinDistance(processedUser, normalizedCorrect);
  const maxLength = Math.max(processedUser.length, normalizedCorrect.length);
  const accuracy = maxLength === 0 ? 100 : Math.round((1 - distance / maxLength) * 100);

  // So sánh từng ký tự để highlight
  const comparedTokens = compareCharacters(processedUser, normalizedCorrect);

  return {
    accuracy: Math.max(0, Math.min(100, accuracy)),
    isCorrect: accuracy >= 80,
    comparedTokens,
  };
}

// Levenshtein distance algorithm
function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

// So sánh từng ký tự
function compareCharacters(userText, correctText) {
  const tokens = [];
  const maxLen = Math.max(userText.length, correctText.length);

  for (let i = 0; i < maxLen; i++) {
    const userChar = userText[i] || '';
    const correctChar = correctText[i] || '';

    let status;
    if (userChar === correctChar) {
      status = 'correct';
    } else if (isSimilar(userChar, correctChar)) {
      status = 'partial';
    } else {
      status = 'incorrect';
    }

    tokens.push({
      userToken: userChar,
      correctToken: correctChar,
      status,
    });
  }

  return tokens;
}

// Kiểm tra ký tự tương tự (hiragana/katakana)
function isSimilar(char1, char2) {
  // Chuyển đổi giữa hiragana và katakana
  const hiraganaToKatakana = (char) => {
    const code = char.charCodeAt(0);
    if (code >= 0x3041 && code <= 0x3096) {
      return String.fromCharCode(code + 0x60);
    }
    return char;
  };

  const katakanaToHiragana = (char) => {
    const code = char.charCodeAt(0);
    if (code >= 0x30A1 && code <= 0x30F6) {
      return String.fromCharCode(code - 0x60);
    }
    return char;
  };

  return hiraganaToKatakana(char1) === hiraganaToKatakana(char2) ||
         katakanaToHiragana(char1) === katakanaToHiragana(char2);
}

// Mock pronunciation scoring cho Shadowing
export function mockPronunciationScore() {
  // Random score từ 60-95%
  const baseScore = 60 + Math.random() * 35;
  return {
    overallScore: Math.round(baseScore),
    feedback: generateFeedback(baseScore),
    wordScores: [],
  };
}

function generateFeedback(score) {
  if (score >= 85) {
    return [
      "Phát âm rất tốt! 🎉",
      "Intonation tự nhiên",
      "Giọng rõ ràng"
    ];
  } else if (score >= 70) {
    return [
      "Khá tốt! Tiếp tục luyện tập",
      "Một số âm cần rõ hơn",
      "Intonation ổn"
    ];
  } else {
    return [
      "Cần luyện tập thêm",
      "Chú ý phát âm các âm đặc biệt",
      "Nghe mẫu nhiều lần hơn"
    ];
  }
}
