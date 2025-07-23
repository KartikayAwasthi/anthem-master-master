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
    <div className="min-h-screen bg-[#1c1c1c] text-white pt-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#ba6a5a] mb-4">
            3D Room Visualizer
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Experience how our ceiling fans look in a realistic 3D room environment
          </p>
        </div>

        {/* Controls Panel */}
        <div className="bg-[#2f2f2f] rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#e49385] mb-4">Room Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Wall Color Control */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wall Color
              </label>
              <select
                value={wallColor}
                onChange={(e) => setWallColor(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-[#ba6a5a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#e49385]"
              >
                <option value="lightblue">Light Blue</option>
                <option value="beige">Beige</option>
                <option value="white">White</option>
                <option value="lightgray">Light Gray</option>
                <option value="cream">Cream</option>
              </select>
            </div>

            {/* Fan Model Control */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fan Model
              </label>
              <select
                value={fanModel}
                onChange={(e) => setFanModel(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-[#ba6a5a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#e49385]"
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

            {/* Fan Rotation Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rotation"
                checked={isRotating}
                onChange={(e) => setIsRotating(e.target.checked)}
                className="accent-[#ba6a5a]"
              />
              <label htmlFor="rotation" className="text-gray-300">
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
              <label htmlFor="furniture" className="text-gray-300">
                Show Furniture
              </label>
            </div>

            {/* Light Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="light"
                checked={isBulbOn}
                onChange={(e) => setIsBulbOn(e.target.checked)}
                className="accent-[#ba6a5a]"
              />
              <label htmlFor="light" className="text-gray-300">
                Room Light
              </label>
            </div>
          </div>
        </div>

        {/* 3D Room Display */}
        <div className="bg-[#2f2f2f] rounded-lg overflow-hidden" style={{ height: '70vh' }}>
          <Room3D 
            wallColor={wallColor}
            fanModel={fanModel}
            isRotating={isRotating}
            fanSpeed={fanSpeed}
            showFurniture={showFurniture}
            isBulbOn={isBulbOn}
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-[#2f2f2f] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#e49385] mb-4">How to Use</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• <strong>Mouse Controls:</strong> Left click and drag to rotate the view</li>
            <li>• <strong>Zoom:</strong> Use mouse wheel to zoom in and out</li>
            <li>• <strong>Pan:</strong> Right click and drag to pan around the room</li>
            <li>• <strong>Customize:</strong> Use the controls above to change room settings</li>
            <li>• <strong>Fan Models:</strong> Switch between different Anthem fan models</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
