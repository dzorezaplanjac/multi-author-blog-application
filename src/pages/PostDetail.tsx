import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Loader, Edit } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAuthors, usePosts } from '../hooks/useSupabase';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { authors, loading: authorsLoading } = useAuthors();
  const { posts, loading: postsLoading } = usePosts();

  const post = posts.find(p => p.slug === slug);
  const author = post ? authors.find(a => a.id === post.author_id) : null;

  const canEditPost = post && user && post.author_id === user.id;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-RS', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
            {paragraph.replace('# ', '')}
          </h1>
        );
      }
      
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8 font-serif">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 leading-relaxed mb-2">
            {paragraph.replace('- ', '')}
          </li>
        );
      }
      
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
          {paragraph.split('**').map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
          )}
        </p>
      );
    }).filter(Boolean);
  };

  if (postsLoading || authorsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Učitava se sadržaj...</p>
        </div>
      </div>
    );
  }

  if (!post || !author) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Članak nije pronađen</h1>
          <Link to="/posts" className="text-primary-600 hover:text-primary-700">
            Vrati se na sve članke
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Edit Button for Post Owner */}
        {canEditPost && (
          <div className="absolute top-6 right-6">
            <Link
              to={`/write?edit=${post.id}`}
              className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-primary-600 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Edit className="h-4 w-4 mr-2" />
              Уреди чланак
            </Link>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/posts"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazad na članke
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center space-x-2">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{author.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time} min čitanja</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>

          {/* Author Bio */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex items-start space-x-4">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <Link to={`/author/${author.id}`} className="hover:text-primary-600 transition-colors">
                    {author.name}
                  </Link>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;