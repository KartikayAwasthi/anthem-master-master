import React, { useState } from 'react';
import Room3D from '../components/Room3D';

const RoomPage = () => {
  const [wallColor, setWallColor] = useState('lightblue');
  const [fanModel, setFanModel] = useState('/fan1.glb');
  const [isRotating, setIsRotating] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(0.1);
  const [showFurniture, setShowFurniture] = useState(true);
  const [isBulbOn, setIsBulbOn] = useState(true);

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
              
              {/* Wall Color Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wall Color
                </label>
                
                {/* Preset Colors Dropdown */}
                <select
                  value={wallColor}
                  onChange={(e) => setWallColor(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#ba6a5a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#e49385] mb-3 text-sm sm:text-base"
                >
                  <option value="lightblue">Light Blue</option>
                  <option value="beige">Beige</option>
                  <option value="white">White</option>
                  <option value="lightgray">Light Gray</option>
                  <option value="cream">Cream</option>
                  <option value="custom">Custom Color</option>
                </select>

                {/* Custom Color Picker */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <label className="text-xs sm:text-sm text-gray-400">Custom:</label>
                  <input
                    type="color"
                    value={typeof wallColor === 'string' && wallColor.startsWith('#') ? wallColor : '#87CEEB'}
                    onChange={(e) => setWallColor(e.target.value)}
                    className="w-10 h-6 sm:w-12 sm:h-8 rounded border border-[#ba6a5a] bg-transparent cursor-pointer"
                    title="Pick a custom wall color"
                  />
                  <span className="text-xs text-gray-500 flex-1 hidden sm:block">
                    {typeof wallColor === 'string' && wallColor.startsWith('#') ? wallColor.toUpperCase() : 'Select from dropdown or pick custom'}
                  </span>
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
    </div>
  );
};

export default RoomPage;
