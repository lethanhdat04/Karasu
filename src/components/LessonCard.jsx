// ============================================
// LESSON CARD COMPONENT
// Card hiển thị thông tin bài học - Simple design, no gradients
// ============================================

export default function LessonCard({ lesson, onClick }) {
  // Random view count và PRO status (mock)
  const viewCount = Math.floor(Math.random() * 50000) + 10000;
  const isPro = lesson.id % 3 === 0; // Mock: mỗi bài thứ 3 là PRO

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${Math.floor(views / 1000)},${String(views % 1000).padStart(3, '0')}`;
    }
    return views;
  };

  return (
    <div
      onClick={onClick}
      className="group bg-dark-card rounded-card overflow-hidden cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary"
    >
      {/* Thumbnail - YouTube Video Thumbnail */}
      <div className="relative h-48 bg-dark-border overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${lesson.youtubeId}/maxresdefault.jpg`}
          alt={lesson.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault is not available
            e.target.onerror = null;
            e.target.src = `https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg`;
          }}
        />

        {/* PRO Badge */}
        {isPro && (
          <div className="absolute top-3 left-3 bg-accent text-gray-900 px-3 py-1 rounded-button text-xs font-bold flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            PRO
          </div>
        )}

        {/* View Count */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          {formatViews(viewCount)}
        </div>

        {/* Level Badge */}
        <div className="absolute bottom-3 right-3 bg-primary text-white px-3 py-1 rounded-button text-sm font-bold">
          {lesson.level}
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {lesson.duration}
        </div>

        {/* Youtube Icon */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-gray-700">
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Youtube
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-base text-dark-text mb-2 line-clamp-2 min-h-[3rem]">
          {lesson.title}
        </h3>

        {/* Dictation & Shadowing buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="text-xs py-2 border border-dark-border rounded-button text-dark-text hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1">
            Dictation
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="text-xs py-2 border border-dark-border rounded-button text-dark-text hover:border-secondary hover:text-secondary transition-colors flex items-center justify-center gap-1">
            Shadowing
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
