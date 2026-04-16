// ============================================
// MODE SELECTION MODAL (Dark Theme)
// Modal cho phép chọn chế độ Dictation hoặc Shadowing
// ============================================

export default function ModeSelectionModal({ lesson, onClose, onSelectMode }) {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-dark-card rounded-card max-w-2xl w-full shadow-2xl overflow-hidden border border-dark-border animate-fade-in">
        {/* Header với thumbnail */}
        <div className="h-32 bg-dark-border flex items-center justify-center relative">
          <span className="text-6xl">{lesson.emoji}</span>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-dark-text mb-2">
            {lesson.title}
          </h2>

          {/* Description */}
          <p className="text-dark-text-secondary mb-2">{lesson.description}</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary text-sm font-medium rounded-full">
              {lesson.topic}
            </span>
            <span className="px-3 py-1 bg-accent bg-opacity-20 text-accent text-sm font-bold rounded-full">
              {lesson.level}
            </span>
            <span className="px-3 py-1 bg-dark-border text-dark-text-secondary text-sm font-medium rounded-full">
              {lesson.sentences?.length || 0} câu
            </span>
          </div>

          {/* Mode Selection Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Dictation Mode */}
            <button
              onClick={() => onSelectMode('dictation')}
              className="group bg-dark-border hover:bg-primary hover:bg-opacity-20 border-2 border-dark-border hover:border-primary rounded-card p-6 text-left transition-all"
            >
              <div className="text-4xl mb-3">🎧</div>
              <h3 className="text-xl font-bold text-dark-text mb-2">DICTATION</h3>
              <p className="text-sm text-dark-text-secondary mb-3">
                Luyện nghe & chép lại câu tiếng Nhật
              </p>
              <ul className="text-xs text-dark-text-secondary space-y-1">
                <li>✓ Cải thiện khả năng nghe</li>
                <li>✓ Học chính tả và từ vựng</li>
                <li>✓ Phản hồi chi tiết từng từ</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                <span>Bắt đầu</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>

            {/* Shadowing Mode */}
            <button
              onClick={() => onSelectMode('shadowing')}
              className="group bg-dark-border hover:bg-secondary hover:bg-opacity-20 border-2 border-dark-border hover:border-secondary rounded-card p-6 text-left transition-all"
            >
              <div className="text-4xl mb-3">🎤</div>
              <h3 className="text-xl font-bold text-dark-text mb-2">SHADOWING</h3>
              <p className="text-sm text-dark-text-secondary mb-3">
                Luyện phát âm & bắt chước giọng bản ngữ
              </p>
              <ul className="text-xs text-dark-text-secondary space-y-1">
                <li>✓ Cải thiện phát âm</li>
                <li>✓ Học ngữ điệu tự nhiên</li>
                <li>✓ Đánh giá giọng nói AI</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all">
                <span>Bắt đầu</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
