import { Author } from '../types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Marko Petrović',
    bio: 'Pisac i novinar iz Beograda. Piše o kulturi, istoriji i društvenim temama.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'marko@example.com',
    socialLinks: {
      twitter: 'https://twitter.com/markop',
      website: 'https://markoblog.com'
    }
  },
  {
    id: '2',
    name: 'Ana Jovanović',
    bio: 'Književnica i profesorka srpskog jezika. Specijalizovana za savremenu književnost.',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'ana@example.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/anaj'
    }
  },
  {
    id: '3',
    name: 'Stefan Nikolić',
    bio: 'Istoričar i istraživač tradicije Zaplanskog kraja. Autor nekoliko knjiga o lokalnoj istoriji.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'stefan@example.com',
    socialLinks: {
      website: 'https://stefannikolic.rs'
    }
  }
];