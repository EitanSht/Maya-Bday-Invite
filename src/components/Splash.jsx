import React, { useMemo } from "react";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

const Splash = ({ color, size, rotation, top, left }) => {
  // generate random star-burst path once per splash
  const { pathD, droplets } = useMemo(() => {
    const points = [];
    const drops = [];
    const spikes = Math.floor(rand(8, 14)); // More spikes for more organic look
    const innerR = 40;
    const outerR = 80;
    
    for (let i = 0; i < spikes; i++) {
      const angle = (Math.PI * 2 * i) / spikes;
      // Make the splash more organic by varying the radius more
      const r = rand(innerR * 0.8, outerR * 1.2);
      // Add some randomness to the angle for more natural look
      const angleVariation = rand(-0.1, 0.1);
      const finalAngle = angle + angleVariation;
      const x = r * Math.cos(finalAngle);
      const y = r * Math.sin(finalAngle);
      
      // Add control points for bezier curves to make splash more organic
      if (i === 0) {
        points.push(`M${x.toFixed(1)},${y.toFixed(1)}`);
      } else {
        // Create a bezier curve instead of a straight line
        const prevAngle = (Math.PI * 2 * (i - 1)) / spikes;
        const prevX = points[i - 1].split(',')[0].substring(1);
        const prevY = points[i - 1].split(',')[1];
        
        // Control point 1 - between previous and current point
        const cp1x = parseFloat(prevX) + (x - parseFloat(prevX)) * 0.5 + rand(-15, 15);
        const cp1y = parseFloat(prevY) + (y - parseFloat(prevY)) * 0.5 + rand(-15, 15);
        
        points.push(`S${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`);
      }
      
      // add more frequent droplets with varied sizes
      if (Math.random() < 0.6) {
        const drDistance = rand(outerR + 5, outerR + 40);
        const drAngle = angle + rand(-0.2, 0.2); // Slight angle variation for droplets
        drops.push({
          cx: drDistance * Math.cos(drAngle),
          cy: drDistance * Math.sin(drAngle),
          r: rand(3, 12),
          opacity: rand(0.6, 1)
        });
      }
    }
    
    // Close the path with a smooth curve
    points.push('Z');
    return { pathD: points.join(' '), droplets: drops };
  }, []);

  const wrapperStyle = {
    position: "absolute",
    top,
    left,
    width: size,
    height: size,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  };

  const svgStyle = {
    width: "100%",
    height: "100%",
    transform: `rotate(${rotation}deg)`,
    transformOrigin: "center center",
    animation: "splatScale 0.5s cubic-bezier(0.12,0.9,0.53,1.3) forwards, fadeSplash 1.5s 0.5s forwards",
  };

  // Create a lighter version of the color for the highlight
  const getRGBA = (colorStr) => {
    // Parse the rgba values
    const match = colorStr.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
    if (!match) return "rgba(255,255,255,0.4)"; // Default highlight
    
    // Extract values
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    
    // Create a lighter version for the highlight
    return `rgba(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${Math.min(255, b + 40)},0.7)`;
  };
  
  const highlightColor = getRGBA(color);

  return (
    <div style={wrapperStyle}>
      <svg style={svgStyle} viewBox="-120 -120 240 240">
        {/* Base splash */}
        <path d={pathD} fill={color} />
        
        {/* Highlight effect */}
        <path d={pathD} fill={highlightColor} transform="scale(0.7)" opacity="0.6" />
        
        {/* Droplets with varied opacity */}
        {droplets.map((d, idx) => (
          <circle 
            key={idx} 
            fill={color} 
            cx={d.cx} 
            cy={d.cy} 
            r={d.r} 
            opacity={d.opacity}
            filter="url(#dropShadow)" 
          />
        ))}
        
        {/* Define filters */}
        <defs>
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Splash; 