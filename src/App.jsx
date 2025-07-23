import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Products from "./pages/Product";
import About from "./pages/About";
import Dealer from "./pages/Dealers";
import Contact from "./pages/contact";
import Chatbot from "./pages/chatbot";
import Support from "./pages/Support";
import FanDetail from "./pages/FanDetail";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <div className="scroll-smooth bg-[#1c1c1c] text-white">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="home" className="py-8">
                  <Home />
                </section>
                <section id="products" className="py-8">
                  <Products />
                </section>
                <section id="about" className="py-8">
                  <About />
                </section>
                <section id="dealer" className="py-8">
                  <Dealer />
                </section>
                <section id="contact" className="py-8">
                  <Contact />
                </section>
                <section id="support" className="py-8">
                  <Support />
                </section>
              </>
            }
          />

          {/* Fan detail page */}
          <Route path="/fan/:fanId" element={<FanDetail />} />

          {/* Room 3D visualizer page */}
          <Route path="/room" element={<RoomPage />} />

          {/* Separate support page route */}
          <Route path="/support" element={<Support />} />

          {/* Redirect unknown routes to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://wa.me/919930101710"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-28 right-6 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
        aria-label="Chat on WhatsApp"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.456-4.438 9.891-9.895 9.891zm8.413-18.306A11.815 11.815 0 0012.05 0C5.495 0 .06 5.435.058 12c0 2.12.555 4.191 1.607 6.013L0 24l6.164-1.637A11.933 11.933 0 0012.048 24h.005c6.555 0 11.99-5.435 11.993-12 .002-3.193-1.243-6.2-3.507-8.267z" />
        </svg>
      </a>

      {/* ✅ Chatbot Floating */}
      <Chatbot />

      {/* Footer always visible */}
      <Footer />
    </div>
  );
}

export default App;
