import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Room3D from '../components/Room3D';  
import ColorChangeTransition from '../components/ColorChangeTransition';
import { useCart } from '../contexts/CartContext';
import CartButton from '../components/CartButton';

// Import images for cart functionality
const skyroImg = "/Skyro/fan4.png";
const inaraImg = "/Inara/fan5.png";

const RoomPage = () => {
  const { addToCart } = useCart();
  
  const [wallColor, setWallColor] = useState('lightblue');
  const [backWallColor, setBackWallColor] = useState('lightblue');
  const [leftWallColor, setLeftWallColor] = useState('lightblue');
  const [rightWallColor, setRightWallColor] = useState('lightblue');
  const [fanModel, setFanModel] = useState('/fan1.glb');
  const [isRotating, setIsRotating] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(0.1);
  const [showFurniture, setShowFurniture] = useState(true);
  const [isBulbOn, setIsBulbOn] = useState(true);
  const [showColorTransition, setShowColorTransition] = useState(false);

  // Fan data for cart functionality
  const fanData = {
    '/fan1.glb': {
      name: 'SKYRO',
      id: 'skyro',
      price: '₹3,999',
      desc: 'Premium BLDC technology with whisper-quiet operation',
      image: skyroImg
    },
    '/fan2.glb': {
      name: 'INARA', 
      id: 'inara',
      price: '₹4,499',
      desc: 'Smart home ready with LED lighting integration',
      image: inaraImg
    }
  };

  // Handle wall color change with transition animation
  const handleWallColorChange = (color) => {
    if (wallColor !== color) {
      setShowColorTransition(true);
      // Delay the actual color change to sync with animation
      setTimeout(() => {
        setWallColor(color);
        setBackWallColor(color);
        setLeftWallColor(color);
        setRightWallColor(color);
      }, 600);
    }
  };

  // Handle individual wall color changes
  const handleIndividualWallColorChange = (wallType, color) => {
    setShowColorTransition(true);
    // Delay the actual color change to sync with animation
    setTimeout(() => {
      switch(wallType) {
        case 'back':
          setBackWallColor(color);
          break;
        case 'left':
          setLeftWallColor(color);
          break;
        case 'right':
          setRightWallColor(color);
          break;
        default:
          break;
      }
    }, 600);
  };

  // Hide transition animation
  const hideColorTransition = () => {
    setShowColorTransition(false);
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ba6a5a] mb-2 sm:mb-4">
            3D Room Visualizer
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-2">
            Experience how our ceiling fans look in a realistic 3D room environment
          </p>
        </div>

        {/* Main Content Area - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          
          {/* 3D Room Display - First on Mobile, Right Side on Desktop */}
          <div className="lg:flex-1 bg-[#2f2f2f] rounded-lg overflow-hidden order-1 lg:order-2 h-[50vh] sm:h-[60vh] lg:h-[70vh]">
            <Room3D 
              wallColor={wallColor}
              backWallColor={backWallColor}
              leftWallColor={leftWallColor}
              rightWallColor={rightWallColor}
              fanModel={fanModel}
              isRotating={isRotating}
              fanSpeed={fanSpeed}
              showFurniture={showFurniture}
              isBulbOn={isBulbOn}
            />
          </div>

          {/* Controls Panel - Second on Mobile, Left Side on Desktop */}
          <div className="w-full lg:w-80 bg-[#2f2f2f] rounded-lg p-4 sm:p-6 order-2 lg:order-1">
            <h3 className="text-lg sm:text-xl font-semibold text-[#e49385] mb-4 sm:mb-6">Room Controls</h3>
            <div className="space-y-4 sm:space-y-6">
              
              {/* Wall Color Controls */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Wall Colors
                </label>
                
                {/* All Walls Color Control */}
                <div className="mb-4 p-3 bg-[#1c1c1c] rounded-lg border border-[#ba6a5a]/30">
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    All Walls (Quick Set)
                  </label>
                  <select
                    value={wallColor}
                    onChange={(e) => handleWallColorChange(e.target.value)}
                    className="w-full bg-[#2f2f2f] border border-[#ba6a5a] rounded px-2 py-1 text-white focus:outline-none focus:border-[#e49385] text-xs"
                  >
                    <option value="lightblue">Light Blue</option>
                    <option value="beige">Beige</option>
                    <option value="white">White</option>
                    <option value="lightgray">Light Gray</option>
                    <option value="cream">Cream</option>
                  </select>
                </div>

                {/* Individual Wall Controls */}
                <div className="space-y-3">
                  {/* Back Wall */}
                  <div className="flex items-center justify-between p-2 bg-[#1c1c1c] rounded border border-[#ba6a5a]/20">
                    <label className="text-xs text-gray-300 font-medium">Back Wall:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={typeof backWallColor === 'string' && backWallColor.startsWith('#') ? backWallColor : '#87CEEB'}
                        onChange={(e) => handleIndividualWallColorChange('back', e.target.value)}
                        className="w-8 h-6 rounded border border-[#ba6a5a] bg-transparent cursor-pointer"
                        title="Pick back wall color"
                      />
                      <button
                        onClick={() => handleIndividualWallColorChange('back', 'lightblue')}
                        className="px-2 py-1 text-xs bg-[#ba6a5a] text-white rounded hover:bg-[#e49385] transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Left Wall */}
                  <div className="flex items-center justify-between p-2 bg-[#1c1c1c] rounded border border-[#ba6a5a]/20">
                    <label className="text-xs text-gray-300 font-medium">Left Wall:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={typeof leftWallColor === 'string' && leftWallColor.startsWith('#') ? leftWallColor : '#87CEEB'}
                        onChange={(e) => handleIndividualWallColorChange('left', e.target.value)}
                        className="w-8 h-6 rounded border border-[#ba6a5a] bg-transparent cursor-pointer"
                        title="Pick left wall color"
                      />
                      <button
                        onClick={() => handleIndividualWallColorChange('left', 'lightblue')}
                        className="px-2 py-1 text-xs bg-[#ba6a5a] text-white rounded hover:bg-[#e49385] transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Right Wall */}
                  <div className="flex items-center justify-between p-2 bg-[#1c1c1c] rounded border border-[#ba6a5a]/20">
                    <label className="text-xs text-gray-300 font-medium">Right Wall:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={typeof rightWallColor === 'string' && rightWallColor.startsWith('#') ? rightWallColor : '#87CEEB'}
                        onChange={(e) => handleIndividualWallColorChange('right', e.target.value)}
                        className="w-8 h-6 rounded border border-[#ba6a5a] bg-transparent cursor-pointer"
                        title="Pick right wall color"
                      />
                      <button
                        onClick={() => handleIndividualWallColorChange('right', 'lightblue')}
                        className="px-2 py-1 text-xs bg-[#ba6a5a] text-white rounded hover:bg-[#e49385] transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fan Model Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fan Model
                </label>
                <select
                  value={fanModel}
                  onChange={(e) => setFanModel(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#ba6a5a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#e49385] text-sm sm:text-base"
                >
                  <option value="/fan1.glb">SKYRO Model</option>
                  <option value="/fan2.glb">INARA Model</option>
                </select>
              </div>

              {/* Fan Speed Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fan Speed: {fanSpeed.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={fanSpeed}
                  onChange={(e) => setFanSpeed(parseFloat(e.target.value))}
                  className="w-full accent-[#ba6a5a]"
                />
              </div>

              {/* Toggles in Grid Layout for Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {/* Fan Rotation Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rotation"
                    checked={isRotating}
                    onChange={(e) => setIsRotating(e.target.checked)}
                    className="accent-[#ba6a5a]"
                  />
                  <label htmlFor="rotation" className="text-gray-300 text-sm sm:text-base">
                    Fan Rotation
                  </label>
                </div>

                {/* Furniture Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="furniture"
                    checked={showFurniture}
                    onChange={(e) => setShowFurniture(e.target.checked)}
                    className="accent-[#ba6a5a]"
                  />
                  <label htmlFor="furniture" className="text-gray-300 text-sm sm:text-base">
                    Show Furniture
                  </label>
                </div>

                {/* Light Toggle */}
                <div className="flex items-center space-x-2 sm:col-span-2 lg:col-span-1">
                  <input
                    type="checkbox"
                    id="light"
                    checked={isBulbOn}
                    onChange={(e) => setIsBulbOn(e.target.checked)}
                    className="accent-[#ba6a5a]"
                  />
                  <label htmlFor="light" className="text-gray-300 text-sm sm:text-base">
                    Room Light
                  </label>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-600">
                <h4 className="text-base sm:text-lg font-semibold text-[#e49385] mb-3">Add Current Fan to Cart</h4>
                <div className="bg-[#1c1c1c] p-4 rounded-lg border border-[#ba6a5a]/30">
                  {fanData[fanModel] && (
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={fanData[fanModel].image} 
                        alt={fanData[fanModel].name} 
                        className="w-16 h-16 object-contain bg-white/10 rounded-lg p-2"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-white">Anthem {fanData[fanModel].name}</h5>
                        <p className="text-xs text-gray-400 mt-1">{fanData[fanModel].desc}</p>
                        <p className="text-lg font-bold text-[#ba6a5a] mt-2">{fanData[fanModel].price}</p>
                      </div>
                    </div>
                  )}
                  <CartButton 
                    product={{
                      id: fanData[fanModel]?.id,
                      name: fanData[fanModel]?.name,
                      price: fanData[fanModel]?.price,
                      image: fanData[fanModel]?.image,
                      desc: fanData[fanModel]?.desc
                    }}
                    className="py-3 px-4"
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-600">
                <h4 className="text-base sm:text-lg font-semibold text-[#e49385] mb-2 sm:mb-3">How to Use</h4>
                <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>• <strong>Rotate:</strong> Left click + drag</li>
                  <li>• <strong>Zoom:</strong> Mouse wheel</li>
                  <li>• <strong>Pan:</strong> Right click + drag</li>
                  <li>• <strong>Customize:</strong> Use controls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Change Transition Animation */}
      <ColorChangeTransition 
        isVisible={showColorTransition} 
        onComplete={hideColorTransition}
        type="wall"
      />
    </div>
  );
};

export default RoomPage;
