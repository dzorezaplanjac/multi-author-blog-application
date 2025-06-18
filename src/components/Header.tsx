import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Settings, LogIn, Star, Clock, PenTool, Shield, FileEdit } from 'lucide-react';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';
import { useAuth } from '../hooks/useAuth';
import { useAuthors, usePosts } from '../hooks/useSupabase';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const location = useLocation();
  const { user, loading } = useAuth();
  const { authors } = useAuthors();
  const { posts } = usePosts();

  const navigation = [
    { name: 'Чланци', href: '/posts' },
    { name: 'Аутори', href: '/authors' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Get featured and latest posts
  const featuredPost = posts.find(post => post.featured);
  const latestPost = posts.filter(post => !post.featured).sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )[0];

  const getAuthor = (authorId: string) => {
    return authors.find(author => author.id === authorId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-RS', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <BookOpen className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                Zaplanjska priča Đore
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center space-x-4">
                      <Link
                        to="/write"
                        className="flex items-center px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <PenTool className="h-4 w-4 mr-1" />
                        Пиши
                      </Link>
                      <Link
                        to="/admin"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                        title="Админ панел"
                      >
                        <Shield className="h-4 w-4" />
                      </Link>
                      <UserMenu />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleOpenAuth('login')}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                      >
                        <LogIn className="h-4 w-4 mr-1" />
                        Пријава
                      </button>
                    </div>
                  )}
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {!loading && user && (
                <>
                  <Link
                    to="/write"
                    className="p-2 rounded-md text-primary-600 hover:text-primary-700 hover:bg-gray-100 transition-colors"
                    title="Пиши чланак"
                  >
                    <PenTool className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/admin"
                    className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                    title="Админ панел"
                  >
                    <Shield className="h-5 w-5" />
                  </Link>
                </>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!loading && !user && (
                  <div className="pt-2 border-t border-gray-200 space-y-2">
                    <button
                      onClick={() => {
                        handleOpenAuth('login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    >
                      Пријава
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>

        {/* Enhanced Header Content - Only show on homepage */}
        {location.pathname === '/' && (
          <div className="bg-gradient-to-r from-primary-50/80 to-primary-100/80 backdrop-blur-sm border-t border-primary-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Featured and Latest Stories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Featured Story */}
                {featuredPost && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-white/50">
                    <div className="flex items-center space-x-2 mb-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                        Истакнута прича
                      </span>
                    </div>
                    <Link to={`/post/${featuredPost.slug}`} className="group">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {getAuthor(featuredPost.author_id)?.name}
                        </span>
                        <span>{formatDate(featuredPost.published_at)}</span>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Latest Story */}
                {latestPost && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-white/50">
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                        Најновија прича
                      </span>
                    </div>
                    <Link to={`/post/${latestPost.slug}`} className="group">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {latestPost.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {latestPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {getAuthor(latestPost.author_id)?.name}
                        </span>
                        <span>{formatDate(latestPost.published_at)}</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Header;