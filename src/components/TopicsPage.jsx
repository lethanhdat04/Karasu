// ============================================
// TOPICS PAGE
// Trang chính hiển thị danh sách bài học
// ============================================

import { useState } from 'react';
import LessonCard from './LessonCard';
import { lessons, topics, levels, filterLessons } from '../data/mockData';

export default function TopicsPage({ onLessonSelect }) {
  const [learnerType, setLearnerType] = useState("beginner"); // "beginner" | "experienced"
  const [selectedTags, setSelectedTags] = useState([]);

  // Filter tags
  const filterTags = [
    { id: 'movie', label: 'Movie short clip', icon: '🎬' },
    { id: 'conversation', label: 'Daily English Conversation', icon: '💬' },
    { id: 'learning', label: 'Learning resources', icon: '📚' },
    { id: 'shadowing', label: 'Listening Time (Shadowing)', icon: '🎧' },
    { id: 'ielts', label: 'IELTS Listening', icon: '📝' },
    { id: 'songs', label: 'US UK songs', icon: '🎵' },
    { id: 'toeic', label: 'TOEIC Listening', icon: '📋' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { id: 'bbc', label: 'BBC learning english', icon: '📺' },
    { id: 'voa', label: 'VOA Learning English', icon: '🎙️' },
    { id: 'toefl', label: 'Toefl Listening', icon: '🎓' },
    { id: 'science', label: 'Science and Facts', icon: '🔬' },
    { id: 'fairy', label: 'Fairy Tales', icon: '🧚' },
    { id: 'ipa', label: 'IPA', icon: '🔤' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'vietnam', label: 'Vietnam Today', icon: '🇻🇳' },
    { id: 'ted', label: 'TED', icon: '💡' },
    { id: 'travel', label: 'Travel vlog', icon: '✈️' },
    { id: 'animals', label: 'Animals and wildlife', icon: '🦁' },
    { id: 'business', label: 'Business English', icon: '💼' },
  ];

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Filter lessons (simplified for now)
  const filteredLessons = lessons;

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Learner Type Tabs */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* For Beginners */}
          <button
            onClick={() => setLearnerType("beginner")}
            className={`p-6 rounded-card border-2 text-left transition-all ${
              learnerType === "beginner"
                ? 'border-primary bg-dark-card'
                : 'border-dark-border bg-dark-card hover:border-primary-light'
            }`}
          >
            <h3 className="text-xl font-bold text-dark-text mb-2">For Beginners</h3>
            <p className="text-primary-light text-sm">
              Focus on basic pronunciation and listening to simple words and sentences
            </p>
          </button>

          {/* For Experienced */}
          <button
            onClick={() => setLearnerType("experienced")}
            className={`p-6 rounded-card border-2 text-left transition-all ${
              learnerType === "experienced"
                ? 'border-primary bg-white'
                : 'border-dark-border bg-white hover:border-primary-light'
            }`}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">For Experienced Learners</h3>
            <p className="text-primary text-sm">
              Enhance skills with natural speaking speed and more complex topics
            </p>
          </button>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold text-dark-text mb-6">
          Practice shadowing and dictation with videos across various topics
        </h2>

        {/* Filter Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {filterTags.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedTags.includes(tag.id)
                    ? 'bg-primary border-primary text-white'
                    : 'bg-transparent border-dark-border text-dark-text hover:border-primary'
                }`}
              >
                <span className="mr-1">{tag.icon}</span>
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Section */}
        <div className="space-y-8">
          {/* Movie short clip section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-dark-text">
                Movie short clip <span className="text-dark-text-secondary text-base font-normal">(141 lessons)</span>
              </h3>
              <button className="text-primary hover:text-primary-light flex items-center gap-1">
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredLessons.slice(0, 4).map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onClick={() => onLessonSelect(lesson)}
                />
              ))}
            </div>
          </div>

          {/* Daily English Conversation section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-dark-text">
                Daily English Conversation <span className="text-dark-text-secondary text-base font-normal">(147 lessons)</span>
              </h3>
              <button className="text-primary hover:text-primary-light flex items-center gap-1">
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredLessons.slice(4, 8).map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onClick={() => onLessonSelect(lesson)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">😢</span>
            <p className="text-dark-text-secondary text-lg">
              Không tìm thấy bài học phù hợp. Hãy thử bộ lọc khác!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
