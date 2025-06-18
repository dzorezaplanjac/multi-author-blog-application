import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Heart, Loader, Target } from 'lucide-react';
import PostCard from '../components/PostCard';
import AuthorCTA from '../components/AuthorCTA';
import { useAuthors, usePosts } from '../hooks/useSupabase';

const Home: React.FC = () => {
  const { authors, loading: authorsLoading } = useAuthors();
  const { posts, loading: postsLoading } = usePosts();

  const featuredPosts = posts.filter(post => post.featured);

  const getAuthor = (authorId: string) => {
    return authors.find(author => author.id === authorId);
  };

  const transformPost = (post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.cover_image,
    authorId: post.author_id,
    publishedAt: post.published_at,
    readingTime: post.reading_time,
    tags: post.tags,
    featured: post.featured
  });

  const transformAuthor = (author: any) => ({
    id: author.id,
    name: author.name,
    bio: author.bio,
    avatar: author.avatar,
    email: author.email,
    socialLinks: author.social_links
  });

  if (postsLoading || authorsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Учитава се садржај...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
              Zaplanjska priča Đore
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Чувамо традицију, делимо приче и негујемо културу Запланског краја кроз речи наших писаца
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              О нама
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Чувамо традицију, делимо приче и негујемо културу Запланског краја
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
              Наша мисија
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              "Zaplanjska priča Đore" је блог посвећен чувању и преношењу богате традиције, 
              културе и историје Запланског краја. Кроз речи наших талентованих аутора, 
              трудимо се да сачувамо од заборава приче, обичаје и мудрост наших предака.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Овај крај, смештен у срцу Балкана, одувек је био раскрсница култура и цивилизација. 
              Његове планине, реке и села чувају у себи небројене приче које заслужују да буду 
              испричане и пренете будућим генерацијама.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Наш блог је место где се сусрећу прошлост и садашњост, где традиција живи кроз 
              савремене речи, а где сваки чланак представља мост између онога што јесмо и 
              онога одакле долазимо.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center group hover:shadow-lg transition-shadow">
              <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-bold text-gray-900 mb-3">Чување традиције</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Документујемо и чувамо обичаје, приче и мудрост наших предака за будуће генерације.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center group hover:shadow-lg transition-shadow">
              <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-bold text-gray-900 mb-3">Љубав према култури</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Негујемо дубоку љубав према култури и идентитету Запланског краја.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center group hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-bold text-gray-900 mb-3">Заједништво</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Окупљамо ауторе и читаоце око заједничке љубави према нашој баштини.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center group hover:shadow-lg transition-shadow">
              <Target className="h-12 w-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-bold text-gray-900 mb-3">Едукација</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Едукујемо младе о важности чувања културног наслеђа и идентитета.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Издвојени чланци
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Најчитанији и најзанимљивији чланци наших аутора
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => {
                const author = getAuthor(post.author_id);
                if (!author) return null;
                return (
                  <PostCard
                    key={post.id}
                    post={transformPost(post)}
                    author={transformAuthor(author)}
                    featured={true}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Author CTA Section */}
      <AuthorCTA />

      {/* Stats Section */}
      <section className="py-16 bg-primary-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 border border-white/50">
                <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{posts.length}</h3>
                <p className="text-gray-600">Објављених чланака</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 border border-white/50">
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{authors.length}</h3>
                <p className="text-gray-600">Активних аутора</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 border border-white/50">
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">∞</h3>
                <p className="text-gray-600">Љубави према традицији</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;