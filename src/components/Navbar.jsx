// ============================================
// NAVBAR COMPONENT
// Thanh điều hướng chính, sticky top
// ============================================

export default function Navbar({ currentView, onNavigate }) {
  return (
    <nav className="sticky top-0 z-50 bg-dark-card border-b border-dark-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
            onClick={() => onNavigate('topics')}
          >
            <span className="text-3xl">🐦‍⬛</span>
            <span className="text-2xl font-bold text-primary">Karasu</span>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('topics')}
              className={`font-medium ${
                currentView === 'topics'
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Topics
            </button>
            <button
              onClick={() => onNavigate('progress')}
              className={`font-medium ${
                currentView === 'progress'
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              My Progress
            </button>
            <button
              onClick={() => onNavigate('vocabulary')}
              className={`font-medium ${
                currentView === 'vocabulary'
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Vocabulary
            </button>
          </div>

          {/* Avatar/Login */}
          <div className="flex items-center gap-4">
            {/* Theme toggle (optional) */}
            <button className="text-dark-text-secondary hover:text-dark-text">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform">
              VN
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-3 flex gap-4 overflow-x-auto">
          <button
            onClick={() => onNavigate('topics')}
            className={`whitespace-nowrap px-3 py-1 rounded-button text-sm font-medium ${
              currentView === 'topics'
                ? 'bg-primary text-white'
                : 'text-dark-text-secondary hover:bg-dark-border'
            }`}
          >
            Topics
          </button>
          <button
            onClick={() => onNavigate('progress')}
            className={`whitespace-nowrap px-3 py-1 rounded-button text-sm font-medium ${
              currentView === 'progress'
                ? 'bg-primary text-white'
                : 'text-dark-text-secondary hover:bg-dark-border'
            }`}
          >
            My Progress
          </button>
          <button
            onClick={() => onNavigate('vocabulary')}
            className={`whitespace-nowrap px-3 py-1 rounded-button text-sm font-medium ${
              currentView === 'vocabulary'
                ? 'bg-primary text-white'
                : 'text-dark-text-secondary hover:bg-dark-border'
            }`}
          >
            Vocabulary
          </button>
        </div>
      </div>
    </nav>
  );
}
