import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Zaplanjska priča Đore</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Blog posvećen čuvanju i prenošenju tradicije, kulture i priča Zaplanskog kraja.
              Mesto gde se susreću prošlost i sadašnjost kroz reči naših pisaca.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Brze veze</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Početna</a></li>
              <li><a href="/posts" className="text-gray-300 hover:text-white transition-colors">Članci</a></li>
              <li><a href="/authors" className="text-gray-300 hover:text-white transition-colors">Autori</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">O nama</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p className="text-gray-300 mb-2">
              Email: info@zaplanjskaprica.rs
            </p>
            <p className="text-gray-300">
              Telefon: +381 60 123 4567
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Napravljeno sa <Heart className="h-4 w-4 text-red-500 mx-1" /> za čuvanje naše tradicije
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 Zaplanjska priča Đore. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;