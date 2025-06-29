import React, { useState } from "react";
import Bubbles from "./components/Bubbles.jsx";
import InviteCard from "./components/InviteCard.jsx";

export default function App() {
  const [popped, setPopped] = useState(false);

  const handleFirstPop = () => setPopped(true);

  return (
    <div className="min-h-[100dvh] w-screen flex items-center justify-center overflow-hidden relative">
      {/* Enhanced background with multiple gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-100 via-white to-pink-100 z-[-1]"></div>
      
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-pink-200/30 to-transparent z-[-1]"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-blue-200/30 to-transparent z-[-1]"></div>
      
      {/* Large decorative circles */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-xl z-[-1]"></div>
      <div className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-xl z-[-1]"></div>
      
      {/* Interactive layers */}
      <Bubbles onFirstPop={handleFirstPop} />
      <InviteCard popped={popped} />
    </div>
  );
} 