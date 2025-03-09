import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Our History</h2>
          <p className="mb-4">
            Founded in 2023, RAPIDERT has been dedicated to helping individuals achieve their fitness goals. Our journey began with a small team of fitness enthusiasts who wanted to create a platform that makes fitness accessible to everyone.
          </p>
          <p className="mb-4">
            Over the years, we have grown into a community of trainers, athletes, and fitness lovers. Our mission is to inspire and empower people to lead healthier lives through personalized fitness programs, expert guidance, and a supportive environment.
          </p>
          <p className="mb-4">
            We believe that every day is a chance to become better, and we are committed to helping you on your fitness journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;