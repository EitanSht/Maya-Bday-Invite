import React from "react";
import whatsappIcon from "../assets/icons/whatsapp.svg?url";
import googleMapsIcon from "../assets/icons/google-maps.svg?url";
import wazeIcon from "../assets/icons/waze.svg?url";

export default function InviteCard({ popped }) {
  const message = `Maya turns two! 🎉 Come splash play with bubbles and enjoy backyard fun with friends!\nSaturday Aug 2nd – 4:30 PM\n16710 NE 16th Pl, Bellevue`;
  const encodedAddress = encodeURIComponent("16710 NE 16th Pl, Bellevue");
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${message}\n\n${window.location.href}`
  )}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;

  // Confetti colors for static rendering with Tailwind
  const confettiColors = [
    "bg-pink-300", "bg-pink-400", "bg-pink-500",
    "bg-blue-300", "bg-blue-400", "bg-blue-500",
    "bg-yellow-300", "bg-yellow-400", "bg-yellow-500",
    "bg-purple-300", "bg-purple-400", "bg-purple-500"
  ];

  return (
    <div className="absolute inset-4 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto relative max-w-sm w-full bg-gradient-to-br from-white/80 to-pink-50/90 bg-clip-border backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-hidden border-4 border-transparent transform transition-all hover:scale-[1.02] animate-fadeIn">
        {/* Card Decorative Blobs */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-pink-300/30 rounded-full animate-float-slow"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-300/30 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-0 w-16 h-16 bg-yellow-200/30 rounded-full animate-float-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-pink-400 rounded-full opacity-70 blur-md animate-float"></div>
        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-400 rounded-full opacity-70 blur-md animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/4 right-0 w-8 h-8 bg-yellow-300 rounded-full opacity-60 blur-sm animate-float" style={{ animationDelay: "2s" }}></div>
        
        {/* Confetti pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => {
            const colorClass = confettiColors[i % confettiColors.length];
            return (
              <div 
                key={i}
                className={`absolute w-2 h-2 rounded-full ${colorClass}`}
                style={{
                  top: `${Math.floor(Math.random() * 100)}%`,
                  left: `${Math.floor(Math.random() * 100)}%`,
                  transform: `rotate(${Math.floor(Math.random() * 360)}deg) scale(${0.5 + Math.random().toFixed(2)})`,
                }}
              />
            );
          })}
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-1">
            <span className="inline-block bg-gradient-to-r from-pink-200 to-purple-200 text-pink-600 text-xs font-semibold px-4 py-1 rounded-full mb-2 animate-pulse">Birthday Invitation</span>
          </div>
          
          <h1 className="text-[2.75rem] leading-tight sm:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 mb-1 text-center animate-gradient">
            Maya turns two!
          </h1>
          
          {/* Wavy underline */}
          <svg className="mx-auto mb-4" width="140" height="16" viewBox="0 0 140 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8C10 8 10 0 20 0C30 0 30 8 40 8C50 8 50 0 60 0C70 0 70 8 80 8C90 8 90 0 100 0C110 0 110 8 120 8C130 8 130 0 140 0" stroke="url(#grad)" strokeWidth="4" strokeLinecap="round"/>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9A8D4"/>
                <stop offset="1" stopColor="#C084FC"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Optional hint */}
          <p className={`font-body text-sm text-gray-500 mb-3 text-center transition-opacity duration-500 ${popped ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
            Tap a bubble to pop it!
          </p>
          
          {/* Description */}
          <p className="font-body text-lg sm:text-xl text-gray-700 mb-6 text-center leading-relaxed max-w-sm mx-auto">
            Come splash play with bubbles and enjoy backyard fun with friends!
          </p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-5 shadow-inner font-body">
            {/* Date & Time - single line */}
            <div className="flex items-center justify-center gap-2 mb-3 flex-wrap sm:flex-nowrap whitespace-nowrap">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-800 whitespace-nowrap">
                Sat Aug&nbsp;2 • 4:30&nbsp;PM
              </p>
            </div>
            
            {/* Address */}
            <div className="flex items-center gap-2 sm:gap-3 justify-center mt-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800 text-center sm:text-left">
                16710&nbsp;NE&nbsp;16th&nbsp;Pl, Bellevue
              </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-2 pb-1">
            {/* WhatsApp */}
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="flex items-center justify-center w-[60px] h-[60px] bg-gradient-to-br from-green-200 to-green-400 hover:from-green-300 hover:to-green-500 rounded-full shadow-lg text-white transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-200/50">
                <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2">Share</span>
            </a>
            {/* Google Maps */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="flex items-center justify-center w-[60px] h-[60px] bg-gradient-to-br from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 rounded-full shadow-lg text-white transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-200/50">
                <img src={googleMapsIcon} alt="Maps" className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2">Maps</span>
            </a>
            {/* Waze */}
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="flex items-center justify-center w-[60px] h-[60px] bg-gradient-to-br from-cyan-200 to-cyan-400 hover:from-cyan-300 hover:to-cyan-500 rounded-full shadow-lg text-white transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-200/50">
                <img src={wazeIcon} alt="Waze" className="w-9 h-9" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2">Waze</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 