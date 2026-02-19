import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles, Zap } from 'lucide-react';

export default function NarutoDashboard() {
  // Images Naruto pré-chargées
  const defaultImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
      name: 'Naruto Uzumaki',
      character: 'Naruto'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&q=80',
      name: 'Sasuke Uchiha',
      character: 'Sasuke'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80',
      name: 'Kakashi Sensei',
      character: 'Kakashi'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1611419010196-a360856fc42f?w=800&q=80',
      name: 'Sakura Haruno',
      character: 'Sakura'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
      name: 'Itachi Uchiha',
      character: 'Itachi'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&q=80',
      name: 'Gaara',
      character: 'Gaara'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80',
      name: 'Hinata Hyuga',
      character: 'Hinata'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1612036781124-847f8939b154?w=800&q=80',
      name: 'Rock Lee',
      character: 'Rock Lee'
    }
  ];

  const [photos, setPhotos] = useState(defaultImages);
  const [dragActive, setDragActive] = useState(false);
  const [showHero, setShowHero] = useState(true);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotos(prev => [...prev, {
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name,
            character: 'Custom'
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
    setShowHero(false);
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background with multiple layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-950 to-black"></div>
        
        {/* Animated blobs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>

        {/* Ninja stars pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        {showHero && (
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              {/* Animated title */}
              <div className="mb-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-32 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent blur-xl"></div>
                </div>
                <h1 className="relative text-8xl md:text-9xl font-black mb-4 leading-none" style={{
                  fontFamily: '"Bebas Neue", "Impact", sans-serif',
                  background: 'linear-gradient(135deg, #ec4899 0%, #ef4444 50%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(236, 72, 153, 0.8)',
                  animation: 'glow 2s ease-in-out infinite'
                }}>
                  SHINOBI
                </h1>
                <h2 className="text-6xl md:text-7xl font-black" style={{
                  fontFamily: '"Bebas Neue", "Impact", sans-serif',
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  GALLERY
                </h2>
              </div>

              {/* Japanese subtitle */}
              <div className="mb-12">
                <p className="text-pink-300 text-3xl tracking-[0.5em] mb-4" style={{
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 700
                }}>
                  忍者の道
                </p>
                <p className="text-pink-400/60 text-xl tracking-widest uppercase">
                  Le Chemin du Ninja
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-12 mb-16">
                <div className="text-center">
                  <div className="text-5xl font-black text-pink-500 mb-2">{photos.length}</div>
                  <div className="text-pink-300/80 text-sm tracking-wider uppercase">Photos</div>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-pink-500 to-transparent"></div>
                <div className="text-center">
                  <div className="text-5xl font-black text-orange-500 mb-2">∞</div>
                  <div className="text-pink-300/80 text-sm tracking-wider uppercase">Possibilités</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowHero(false)}
                className="group relative inline-flex items-center gap-3 px-12 py-6 text-2xl font-bold text-white overflow-hidden rounded-full transition-all duration-300 hover:scale-105"
                style={{fontFamily: '"Rajdhani", sans-serif'}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <Sparkles className="relative z-10 animate-spin-slow" />
                <span className="relative z-10">ENTRER DANS LA GALERIE</span>
                <Zap className="relative z-10 animate-bounce" />
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!showHero && (
          <div className="container mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-6xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-500" style={{
                fontFamily: '"Bebas Neue", "Impact", sans-serif',
                textShadow: '0 0 40px rgba(236, 72, 153, 0.5)'
              }}>
                SHINOBI GALLERY
              </h1>
              <p className="text-pink-300 text-lg tracking-widest uppercase" style={{
                fontFamily: '"Rajdhani", sans-serif'
              }}>
                忍者の道 • {photos.length} Photos
              </p>
            </div>

            {/* Upload Zone */}
            <div className="mb-12">
              <div 
                className={`relative border-4 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                  dragActive 
                    ? 'border-pink-500 bg-pink-500/10 scale-105' 
                    : 'border-pink-500/30 hover:border-pink-500/60 bg-black/40 backdrop-blur-sm'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                
                <label 
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-pink-500 to-red-600 p-8 rounded-full">
                      <Upload className="w-16 h-16 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2" style={{fontFamily: '"Rajdhani", sans-serif'}}>
                    Ajouter Plus de Photos
                  </h3>
                  <p className="text-pink-300 text-lg mb-4">
                    Glissez vos images ici ou cliquez pour parcourir
                  </p>
                  <div className="inline-block px-8 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-full hover:from-pink-500 hover:to-red-500 transition-all transform hover:scale-105 shadow-lg shadow-pink-500/50">
                    TÉLÉCHARGER
                  </div>
                </label>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3" style={{fontFamily: '"Rajdhani", sans-serif'}}>
                <ImageIcon className="text-pink-500" />
                Collection Shinobi ({photos.length})
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo, index) => (
                  <div 
                    key={photo.id}
                    className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-pink-500/20 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 hover:-rotate-1"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'slideIn 0.5s ease-out forwards'
                    }}
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={photo.url} 
                        alt={photo.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Character badge */}
                      {photo.character && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-pink-500/50">
                          <span className="text-pink-300 text-xs font-bold tracking-wider">{photo.character}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-bold text-lg mb-1">
                          {photo.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-pink-400" />
                          <span className="text-pink-300 text-sm">Naruto Shippuden</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Hero Button */}
            <div className="text-center">
              <button
                onClick={() => setShowHero(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 text-pink-300 rounded-full transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet" />

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(236, 72, 153, 1));
          }
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
