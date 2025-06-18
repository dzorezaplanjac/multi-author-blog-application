import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, PenTool, Settings, ChevronDown, Plus, FileText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAuthors } from '../hooks/useSupabase';
import MyPostsModal from './MyPostsModal';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { authors } = useAuthors();
  const [isOpen, setIsOpen] = useState(false);
  const [isMyPostsOpen, setIsMyPostsOpen] = useState(false);

  if (!user) return null;

  const author = authors.find(a => a.id === user.id);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleMyPosts = () => {
    setIsMyPostsOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          {author?.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-600" />
            </div>
          )}
          <span className="hidden md:block">
            {author?.name || user.email?.split('@')[0]}
          </span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {author?.name || 'Аутор'}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                
                <Link
                  to="/write"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Нови чланак</span>
                </Link>
                
                <button 
                  onClick={handleMyPosts}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Моји чланци</span>
                </button>
                
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Подешавања</span>
                </button>
                
                <div className="border-t border-gray-100">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Одјави се</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <MyPostsModal 
        isOpen={isMyPostsOpen} 
        onClose={() => setIsMyPostsOpen(false)} 
      />
    </>
  );
};

export default UserMenu;