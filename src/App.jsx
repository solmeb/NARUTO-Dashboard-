import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function NarutoDashboard() {
  const [photos, setPhotos] = useState([]);
  const [dragActive, setDragActive] = useState(false);

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
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Ninja pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 animate-pulse-slow" style={{
            fontFamily: '"Bebas Neue", "Impact", sans-serif',
            textShadow: '0 0 40px rgba(236, 72, 153, 0.5)'
          }}>
            SHINOBI GALLERY
          </h1>
          <p className="text-pink-300 text-lg tracking-widest uppercase" style={{
            fontFamily: '"Rajdhani", sans-serif'
          }}>
            Tableau de Bord • 忍者の道
          </p>
        </div>

        {/* Upload Zone */}
        <div className="mb-12">
          <div 
            className={`relative border-4 border-dashed rounded-2xl p-12 transition-all duration-300 ${
              dragActive 
                ? 'border-pink-500 bg-pink-500/10 scale-105' 
                : 'border-pink-500/30 hover:border-pink-500/60 bg-black/40'
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
                Télécharger des Photos
              </h3>
              <p className="text-pink-300 text-lg mb-4">
                Glissez vos images ici ou cliquez pour parcourir
              </p>
              <div className="inline-block px-8 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-full hover:from-pink-500 hover:to-red-500 transition-all transform hover:scale-105 shadow-lg shadow-pink-500/50">
                SÉLECTIONNER DES FICHIERS
              </div>
            </label>
          </div>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3" style={{fontFamily: '"Rajdhani", sans-serif'}}>
              <ImageIcon className="text-pink-500" />
              Ma Galerie ({photos.length})
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo, index) => (
                <div 
                  key={photo.id}
                  className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-pink-500/20 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 hover:-rotate-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideIn 0.5s ease-out forwards'
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold truncate text-sm">
                        {photo.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {photos.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-3xl border-2 border-pink-500/20 mb-6">
              <ImageIcon className="w-24 h-24 text-pink-500/50 mx-auto" />
            </div>
            <p className="text-pink-300/60 text-xl" style={{fontFamily: '"Rajdhani", sans-serif'}}>
              Aucune photo pour le moment. Téléchargez vos images préférées !
            </p>
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

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
