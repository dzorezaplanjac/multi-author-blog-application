import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/useSupabase';
import { supabase } from '../lib/supabase';

const Write: React.FC = () => {
  const { user } = useAuth();
  const { posts, refetch } = usePosts();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    reading_time: 5,
    tags: '',
    featured: false,
    published: true
  });

  // Load post for editing
  useEffect(() => {
    if (editId) {
      const post = posts.find(p => p.id === editId);
      if (post) {
        // Check if user owns this post
        if (post.author_id !== user?.id) {
          setError('Немате дозволу да уредите овај чланак');
          return;
        }
        
        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          cover_image: post.cover_image || '',
          reading_time: post.reading_time || 5,
          tags: post.tags ? post.tags.join(', ') : '',
          featured: post.featured || false,
          published: !!post.published_at
        });
      } else {
        setError('Чланак није пронађен');
      }
    }
  }, [editId, posts, user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[čć]/g, 'c')
      .replace(/[đ]/g, 'd')
      .replace(/[š]/g, 's')
      .replace(/[ž]/g, 'z')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const slug = generateSlug(formData.title);

      const postData = {
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.cover_image,
        author_id: user.id,
        reading_time: formData.reading_time,
        tags,
        featured: formData.featured,
        published_at: formData.published ? new Date().toISOString() : null
      };

      if (editId) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', editId);

        if (error) throw error;
        
        await refetch();
        navigate(`/post/${slug}`);
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('posts')
          .insert([postData])
          .select()
          .single();

        if (error) throw error;
        
        await refetch();
        navigate(`/post/${slug}`);
      }
    } catch (error) {
      setError('Грешка при чувању чланка: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return <br key={index} />;
      
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 font-serif">
            {paragraph.replace('# ', '')}
          </h1>
        );
      }
      
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mb-3 mt-6 font-serif">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 mb-2 mt-4">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 leading-relaxed mb-1 ml-4">
            {paragraph.replace('- ', '')}
          </li>
        );
      }
      
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {paragraph.split('**').map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full mx-4">
          <div className="flex items-center space-x-3 text-red-600 mb-4">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Грешка</h2>
          </div>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/posts')}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Назад на чланке
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/posts')}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Назад
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {editId ? 'Уреди чланак' : 'Напиши нови чланак'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Уреди' : 'Преглед'}
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.title.trim()}
                className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Чува...' : (editId ? 'Ажурирај' : 'Објави')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewMode ? (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="max-w-4xl mx-auto">
              {formData.cover_image && (
                <img
                  src={formData.cover_image}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                {formData.title || 'Наслов чланка'}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {formData.excerpt || 'Кратак опис чланка...'}
              </p>
              <div className="prose prose-lg max-w-none">
                {formatContent(formData.content)}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Основне информације</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Наслов *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Унесите наслов чланка..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Кратак опис *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Кратак опис који ће се приказати на листи чланака..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover слика URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.cover_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/slika.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Време читања (мин)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.reading_time}
                        onChange={(e) => setFormData(prev => ({ ...prev, reading_time: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Тагови
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="традиција, култура, историја"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Издвојен чланак</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Објави одмах</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Markdown Help */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Markdown форматирање</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <div><code># Наслов</code> - Главни наслов</div>
                  <div><code>## Поднаслов</code> - Поднаслов</div>
                  <div><code>**текст**</code> - Подебљан текст</div>
                  <div><code>- ставка</code> - Листа</div>
                </div>
              </div>
            </div>

            {/* Right Column - Content Editor */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Садржај чланка</h2>
              <textarea
                required
                rows={25}
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none"
                placeholder="Користите Markdown формат:

# Главни наслов
## Поднаслов
### Мањи наслов

**Подебљан текст**

- Листа ставки
- Друга ставка

Обичан параграф текста..."
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Write;