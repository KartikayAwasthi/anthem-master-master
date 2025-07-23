import React, { useState } from "react";
import { motion } from "framer-motion";

// Example store data
const stores = [
  {
    name: "Betora Store",
    pin: "403401",
    address: "92PJ+8W Betora, Goa",
    lat: 15.3827,
    lng: 74.0596,
  },
  {
    name: "CoolAir Distributors",
    pin: "110005",
    address: "Karol Bagh, Delhi",
    lat: 28.6517178,
    lng: 77.1900487,
  },
  {
    name: "Sethi Electricals",
    pin: "400058",
    address: "Andheri West, Mumbai",
    lat: 19.1196776,
    lng: 72.8462184,
  },
  {
    name: "Shree Fans Mart",
    pin: "560041",
    address: "Jayanagar, Bangalore",
    lat: 12.9250076,
    lng: 77.5938034,
  },
  {
    name: "Vaibhav Enterprises",
    pin: "226001",
    address: "Hazratganj, Lucknow",
    lat: 26.850000,
    lng: 80.949997,
  },
];

const StoreLocator = () => {
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.pin.includes(search)
  );

  const mapCenter = selectedStore
    ? { lat: selectedStore.lat, lng: selectedStore.lng }
    : { lat: 15.386037770764117, lng: 74.03248843465708 };

  return (
    <div className="bg-[#1c1c1c] text-white py-10 w-full" id="store-locator">
      <div className="px-4 md:px-12 max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-[#ba6a5a]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Store Locator
        </motion.h2>
        <motion.p
          className="text-gray-300 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Find Anthem Fans stores near you by name or PIN code.
        </motion.p>
        <motion.div
          className="mb-4 w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search by store name or PIN code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#ba6a5a] bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:border-[#efb4a5] transition"
          />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Store List */}
          <div className="md:w-1/2 space-y-4">
            {filteredStores.length === 0 && (
              <motion.div
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                No stores found.
              </motion.div>
            )}
            {filteredStores.map((store, idx) => (
              <motion.div
                key={idx}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedStore?.name === store.name
                    ? "border-[#efb4a5] bg-slate-800 shadow-md"
                    : "border-white/10 bg-slate-800 hover:border-[#ba6a5a]"
                }`}
                onClick={() => setSelectedStore(store)}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="font-semibold text-lg text-[#e49385]">
                  {store.name}
                </div>
                <div className="text-gray-300">{store.address}</div>
                <div className="text-gray-400 text-sm">PIN: {store.pin}</div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    store.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ba6a5a] underline text-xs hover:text-[#efb4a5]"
                >
                  View on Google Maps
                </a>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            className="md:w-1/2 h-96 rounded-lg overflow-hidden border border-[#ba6a5a]/20 bg-slate-800 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <iframe
              title="Store Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, minHeight: "350px" }}
              src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`}
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
