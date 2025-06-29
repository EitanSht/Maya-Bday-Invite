import React, { useEffect, useState, useCallback } from "react";
import Splash from "./Splash"; // Import the new Splash component

// Enhanced bubble colors with matching splash colors - more vibrant and festive
const bubbleColors = [
  { bubble: "rgba(255,105,180,0.5)", splash: "rgba(255,105,180,0.35)" }, // Hot Pink
  { bubble: "rgba(123,104,238,0.5)", splash: "rgba(123,104,238,0.35)" }, // Medium Slate Blue
  { bubble: "rgba(64,224,208,0.5)", splash: "rgba(64,224,208,0.35)" }, // Turquoise
  { bubble: "rgba(255,215,0,0.5)", splash: "rgba(255,215,0,0.35)" }, // Gold
  { bubble: "rgba(147,112,219,0.5)", splash: "rgba(147,112,219,0.35)" }, // Medium Purple
  { bubble: "rgba(0,191,255,0.5)", splash: "rgba(0,191,255,0.35)" }, // Deep Sky Blue
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Bubbles({ onFirstPop }) {
  const [bubbles, setBubbles] = useState([]);
  const [stains, setStains] = useState([]); // Will hold the persistent splashes
  const calledRef = React.useRef(false);

  // Spawn bubbles periodically
  useEffect(() => {
    // drop an initial stain for visual cue
    setStains([{ id: 'initial', top: '50%', left: '50%', size: 180, color: 'rgba(255,182,193,0.45)', rotation: random(0,360)}]);

    // Spawn a batch of bubbles immediately so the screen isn't empty on load
    const initialBubbles = Array.from({ length: 4 }).map(() => {
      const size = random(30, 90);
      const id = Date.now().toString() + Math.random();
      const left = random(5, 85);
      const animationDuration = random(15, 25);
      const wobbleAmount = random(0.5, 1.5);
      const wobbleSpeed = random(2, 5);
      const colorSet = bubbleColors[Math.floor(random(0, bubbleColors.length))];
      return { id, size, left, animationDuration, wobbleAmount, wobbleSpeed, color: colorSet.bubble, splashColor: colorSet.splash };
    });
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length > 30) return prev; // Keep DOM under control
        const size = random(30, 90);
        const id = Date.now().toString() + Math.random();
        const left = random(5, 85); // keep inside viewport
        const animationDuration = random(15, 25);
        const wobbleAmount = random(0.5, 1.5); // Controls how much the bubble wobbles
        const wobbleSpeed = random(2, 5); // Controls wobble speed
        const colorSet = bubbleColors[Math.floor(random(0, bubbleColors.length))];
        return [
          ...prev,
          { 
            id, 
            size, 
            left, 
            animationDuration, 
            wobbleAmount,
            wobbleSpeed,
            color: colorSet.bubble, 
            splashColor: colorSet.splash 
          },
        ];
      });
    }, 1700);
    return () => clearInterval(interval);
  }, []);

  const handlePop = useCallback((id, event) => {
    const bubbleData = bubbles.find((b) => b.id === id);
    const bubbleEl = document.getElementById(`bubble-${id}`);

    if (bubbleData && bubbleEl) {
      const clickX = event.clientX;
      const clickY = event.clientY;
      const bubbleRect = bubbleEl.getBoundingClientRect();

      // Create a persistent stain on the background
      const newStain = {
        id: Date.now(),
        top: clickY, // Use exact click/touch coordinates
        left: clickX, // Use exact click/touch coordinates
        size: bubbleRect.width * random(1.8, 2.5),
        color: bubbleData.splashColor,
        rotation: random(0, 360),
      };
      setStains((current) => [...current, newStain]);

      // Animate and remove the bubble itself
      bubbleEl.style.transition = "transform 0.1s ease-out, opacity 0.1s ease-out";
      bubbleEl.style.transform = "scale(1.2)";
      bubbleEl.style.opacity = "0";

      // Fire one-time callback to hide hint
      if (!calledRef.current && onFirstPop) {
        calledRef.current = true;
        onFirstPop();
      }

      // Play a soft pop sound
      const audio = new Audio();
      audio.src = `data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV`;
      audio.volume = 0.3;
      audio.play().catch(err => console.log("Audio play failed:", err));

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, 100);

      // Remove the stain after fadeSplash completes (4.5s)
      setTimeout(() => {
        setStains((prev) => prev.filter((s) => s.id !== newStain.id));
      }, 2200);
    }
  }, [bubbles, onFirstPop]);

  const onAnimationEnd = useCallback((id) => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
  }, []);


  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-120vh); opacity: 1; }
        }
        @keyframes wobble {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-15px); }
          75% { transform: translateX(15px); }
        }
        @keyframes splatScale {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        @keyframes fadeSplash {
          0%   { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Render persistent stains under the bubbles */}
      <div className="absolute inset-0 z-0">
        {stains.map((s) => (
          <Splash
            key={s.id}
            color={s.color}
            size={s.size}
            top={s.top}
            left={s.left}
            rotation={s.rotation}
          />
        ))}
      </div>

      {/* Render bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          onAnimationEnd={() => onAnimationEnd(b.id)}
          onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); handlePop(b.id, e); }}
          className='absolute bottom-[-64px] pointer-events-auto cursor-pointer'
          style={{
            left: `${b.left}%`,
            animation: `floatUp ${b.animationDuration}s linear forwards`,
          }}
        >
          <div
            id={`bubble-${b.id}`}
            className='relative rounded-full'
            style={{
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle at 30% 30%, white 0%, ${b.color} 70%)`,
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(0,0,0,0.1)',
              animation: `wobble ${b.wobbleSpeed}s ease-in-out infinite alternate, shimmer 3s infinite`,
              transformOrigin: 'center center',
            }}
          >
            {/* Shine effect */}
            <div
              className='absolute rounded-full'
              style={{
                width: '30%',
                height: '30%',
                top: '15%',
                left: '15%',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}