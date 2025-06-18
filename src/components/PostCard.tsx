import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Calendar } from 'lucide-react';
import { Post, Author } from '../types';

interface PostCardProps {
  post: Post;
  author: Author;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, author, featured = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-RS', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
      featured ? 'md:col-span-2 lg:col-span-2' : ''
    }`}>
      <div className={`${featured ? 'md:flex' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
          <img
            src={post.coverImage}
            alt={post.title}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              featured ? 'h-64 md:h-full' : 'h-48'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className={`p-6 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors ${
            featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          }`}>
            <Link to={`/post/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>

          <p className={`text-gray-600 mb-4 leading-relaxed ${
            featured ? 'text-lg' : ''
          }`}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <Link 
                  to={`/author/${author.id}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {author.name}
                </Link>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min čitanja</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;