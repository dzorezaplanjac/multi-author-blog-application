import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Authors from './pages/Authors';
import PostDetail from './pages/PostDetail';
import AuthorDetail from './pages/AuthorDetail';
import Write from './pages/Write';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/author/:id" element={<AuthorDetail />} />
            <Route path="/write" element={<Write />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;