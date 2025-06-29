import React from "react";
import Bubbles from "./components/Bubbles.jsx";
import InviteCard from "./components/InviteCard.jsx";

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-white to-pink-100 z-0"></div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-pink-200/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-blue-200/30 to-transparent"></div>
      
      {/* Large decorative circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-xl"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        <Bubbles />
        <InviteCard />
      </div>
    </div>
  );
} 