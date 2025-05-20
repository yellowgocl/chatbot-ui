import React from 'react';
import logo from '../assets/react.svg'; // Assuming you have a logo file
import Bg from '../assets/login_bg.png'
const LoginPage = () => {
  return (
    // Main container for the login page, using flex to center content
    <div className="flex items-center justify-center h-full bg-white"> {/* Changed min-h-screen to h-full and bg-gray-100 to bg-white for consistency with App.jsx conditional background */}
      
      {/* Container to hold the login form and the illustration, using flex for horizontal layout */}
      <div className="flex items-center justify-center">

        {/* Login Form Container */}
        <div className="px-8 pb-6 text-left bg-white rounded-lg z-10"> {/* Added z-10 to ensure form is above background elements */}

          <h2 className="text-2xl font-bold text-gray-800 mb-5">Sign in to Rehau<br/>Analysis Dashboard</h2> {/* Updated text and style to match image */}

          <form>
            <div className="mt-4">
              {/* Email Address Input */}
              <div>
                <label className="block text-sm text-gray-700" htmlFor="email">Email Address</label> {/* Changed label to Email Address */}
                <input 
                  type="email" // Changed type to email
                  placeholder="peter.parker@mail.com" // Updated placeholder
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300" // Adjusted styling slightly
                />
              </div>

              {/* Password Input */}
              <div className="mt-4">
                <label className="block text-sm text-gray-700" htmlFor="password">Password</label>
                <input 
                  type="password" 
                  placeholder="" // Placeholder is empty in the image
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              {/* Sign In Button */}
              <div className="mt-6">
                <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900">Sign in</button> {/* Updated button styling and text */}
              </div>
            </div>
          </form>
        </div>
        
        {/* Illustration Area - Placeholder */}
        {/* You need to add your illustration here, either as an SVG, image, or a component. */}
        {/* The styling below provides a container next to the form. Adjust width/margin as needed. */}
        <div className="hidden md:flex items-center justify-center ml-10"> {/* Hidden on small screens, flex on medium and up */}
            {/* Insert your illustration component or img tag here */}
            <img src={Bg} alt="Analysis Dashboard Illustration" className="max-w-md h-auto" />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;