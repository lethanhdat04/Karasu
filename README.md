# 🐦‍⬛ Karasu - Học Tiếng Nhật Mỗi Ngày

Ứng dụng học tiếng Nhật theo phương pháp **Dictation & Shadowing**, lấy cảm hứng từ [Parroto.app](https://parroto.app).

**Tên gọi**: "Karasu" (カラス - con quạ) - biểu tượng thông minh trong văn hóa Nhật Bản.

## ✨ Tính Năng Chính

### 🎧 Dictation Mode
- Nghe và chép lại câu tiếng Nhật
- **Word Reveal System**: Click để hiện từng từ khi cần gợi ý
- 3 mức độ khó: Easy / Normal / Hard
- Kiểm tra chính tả tự động với highlight từng từ
- Hỗ trợ nhập cả tiếng Nhật và romaji
- Navigation controls đầy đủ (prev/play/next/replay/speed)

### 🎤 Shadowing Mode
- Luyện phát âm theo giọng bản ngữ
- Ghi âm và đánh giá giọng nói (mock AI)
- Auto Stop & Large-sized video options
- Transcript sidebar với IPA/Translation toggle
- Phân tích từng âm với điểm số chi tiết
- Play recorded audio để so sánh

### 📚 12 Bài Học Đa Dạng
- **N5 (Beginner)**: Tự giới thiệu, Gọi món, Thời tiết
- **N4 (Elementary)**: Hỏi đường, Mua sắm, Bưu điện, Đặt khách sạn
- **N3 (Intermediate)**: Hẹn bác sĩ, Anime, Lễ hội, JLPT N3
- **N2 (Upper Int.)**: Phỏng vấn

### 🎨 Modern Dark Theme Design
- **Màu chính**: Xanh dương (#4A90E2) - Parroto inspired
- **Màu phụ**: Tím (#6C5CE7), Vàng (#FFB703)
- **Dark Mode**: Background tối (#1a1d29), Cards (#252836)
- Font: Inter (UI) + Noto Sans JP (tiếng Nhật)
- Responsive mobile-first
- Smooth animations & transitions

## 🚀 Cài Đặt và Chạy

### Yêu Cầu
- Node.js 16+
- npm hoặc yarn

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Bước 3: Build production
```bash
npm run build
```

Build files sẽ nằm trong thư mục `dist/`

## 📁 Cấu Trúc Project

```
Karasu/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Thanh điều hướng dark theme
│   │   ├── TopicsPage.jsx          # Trang chủ với tabs & filter tags
│   │   ├── LessonCard.jsx          # Card bài học Parroto-style
│   │   ├── ModeSelectionModal.jsx  # Modal chọn chế độ
│   │   ├── DictationScreen.jsx     # Màn hình Dictation + word reveal
│   │   ├── ShadowingScreen.jsx     # Màn hình Shadowing + transcript
│   │   └── ResultScreen.jsx        # Màn hình kết quả
│   ├── data/
│   │   └── mockData.js             # Mock data 12 bài học
│   ├── utils/
│   │   └── textComparison.js       # Logic so sánh text
│   ├── App.jsx                     # Component chính
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind CSS + custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js              # Dark theme colors
└── README.md
```

## 🎯 Hướng Dẫn Sử Dụng

### 1. Chọn Bài Học
- Vào trang Topics
- Chọn tab "For Beginners" hoặc "For Experienced Learners"
- Lọc theo tags (Movie short clip, Daily Conversation, v.v.)
- Click vào card bài học bất kỳ

### 2. Chọn Chế Độ
- **Dictation**: Luyện nghe và viết
- **Shadowing**: Luyện phát âm

### 3. Luyện Tập

#### Dictation:
1. Chọn độ khó (Easy/Normal/Hard)
2. Nghe câu mẫu (play/replay/speed control)
3. Gõ lại câu vừa nghe
4. Click từng từ để hiện gợi ý (tính là sai)
5. Hoặc "Show all words" để xem đáp án
6. Next để chuyển câu tiếp

#### Shadowing:
1. Nghe câu mẫu
2. Toggle Auto Stop / Large video nếu cần
3. Nhấn Record 🎤
4. Đọc theo câu mẫu (3 giây)
5. Xem điểm số và phân tích
6. Play recorded audio để nghe lại
7. Next để chuyển câu tiếp

### 4. Xem Kết Quả
- Độ chính xác tổng
- Số câu đúng/sai
- Streak liên tiếp
- Danh sách từ vựng mới

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS 3 (Dark Theme)
- **Build Tool**: Vite 5
- **Font**: Google Fonts (Inter, Noto Sans JP)

## 🎨 Design System

### Colors
```css
Primary (Blue):   #4A90E2
Secondary (Purple): #6C5CE7
Accent (Gold):    #FFB703
Danger (Red):     #E74C3C
Success (Green):  #2ECC71

Dark Theme:
  - Background:   #1a1d29
  - Card:         #252836
  - Border:       #2d3142
  - Text:         #e8eaed
  - Text-2nd:     #9ca3af
```

### Components
- **Border Radius**: 12px (cards), 8px (buttons)
- **Shadows**: Subtle dark shadows
- **Animations**: Smooth transitions
- **Furigana**: HTML `<ruby>` tags
- **Icons**: Heroicons (SVG)

## 📝 Mock Features

⚠️ Các tính năng sau đây được **giả lập** (không cần backend):

- ✅ Ghi âm (mock: 3 giây → hiện kết quả random)
- ✅ Đánh giá phát âm AI (random 60-95%)
- ✅ Video player (div với gradient)
- ✅ Playback audio (button giả lập)
- ✅ Streak counter (cố định 5 ngày)
- ✅ View count (random cho mỗi bài)
- ✅ PRO badges (mỗi bài thứ 3)

## 🆕 Điểm Nổi Bật (So Với Parroto)

1. **Word Reveal System** - Click để hiện từng từ khi cần gợi ý
2. **Dark Theme** - Giao diện tối mắt, modern
3. **Dual Language** - Tiếng Việt UI + Tiếng Nhật content
4. **3-Level Difficulty** - Easy/Normal/Hard cho Dictation
5. **Mascot Karasu** - Con quạ đen xuất hiện khi ẩn video
6. **Rich Transcript** - Sidebar với đầy đủ chức năng

## 🚧 Tính Năng Sẽ Phát Triển

- [ ] Backend API thật
- [ ] Ghi âm thật với Web Audio API
- [ ] AI phát âm thật với speech recognition
- [ ] Video/audio thật cho từng câu (Youtube embed)
- [ ] Authentication & user profiles
- [ ] Database lưu tiến độ
- [ ] Flashcard system
- [ ] Social features (leaderboard, sharing)
- [ ] Real-time progress tracking
- [ ] Custom playlists

## 📄 License

MIT License - Free to use for learning purposes

## 🙏 Credits

- Inspired by [Parroto](https://parroto.app)
- Japanese content: Educational purpose
- Design: Parroto + Custom dark theme
- Icons: Heroicons

---

**🐦‍⬛ Karasu** - Thông minh như con quạ, tiến bộ mỗi ngày!

*Note: Đây là phiên bản demo với mock data. Để sử dụng thực tế, cần tích hợp backend, database và API thật.*
