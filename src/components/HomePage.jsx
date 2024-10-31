import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold">Welcome to TikTok Services</h1>
      <p className="text-lg text-center mb-8">
        Boost your TikTok presence with our professional growth services.
      </p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  );
}

export default HomePage;
