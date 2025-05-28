// AIHomePage.js
import React, { useRef } from 'react'; // Import useRef
import {
  HandRaisedIcon,
  UserIcon as UserSolidIcon,
  LinkIcon,
  ArrowRightIcon,
  UserCircleIcon,
  EnvelopeIcon,
  CpuChipIcon,
} from '@heroicons/react/24/solid';

const AIHomePage = () => {
  const suggestionCardsData = [
    // ... (same data as before)
    {
      id: 1,
      icon: UserCircleIcon,
      text: 'Write a to-do list for a personal project or task',
    },
    {
      id: 2,
      icon: EnvelopeIcon,
      text: 'Generate an email to job offer',
    },
    {
      id: 3,
      icon: CpuChipIcon,
      text: 'How dose AI work in a technical capacity',
    },
    {
      id: 4,
      icon: UserCircleIcon,
      text: 'Draft a blog post about sustainable travel',
    },
    {
      id: 5,
      icon: EnvelopeIcon,
      text: 'Explain quantum computing in simple terms',
    },
  ];

  const scrollableContainerRef = useRef(null); // Create a ref for the scrollable container

  return (
    <div className="min-h-screen bg-[#F9F8FF] flex flex-col text-slate-800 font-sans">
      {/* Header ... (same as before) */}
      <header className="w-full px-6 py-5 sm:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-800 p-2 rounded-lg">
              <HandRaisedIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-700">Hello AI</span>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://via.placeholder.com/40/334155/FFFFFF?text=SA"
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content ... (same as before) */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center pt-12 pb-8 sm:pt-16">
        <div className="mb-10 sm:mb-16">
          <p className="text-xl sm:text-2xl text-slate-600 mb-2">Hi Safatul Islam Aly</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4">
            What would like to know?
          </h1>
          <p className="text-base sm:text-lg text-slate-500">
            Use one of the most common prompts below
            <br className="hidden sm:block" /> or use your own to being
          </p>
        </div>

        {/* Suggestion Cards - Horizontally Scrollable with conditional scrollbar */}
        <div className="w-full max-w-7xl mx-auto mb-10 sm:mb-16">
          {/*
            - `group` class on this outer container allows children to use `group-hover:`
            - `tabIndex={0}` makes this div focusable, allowing `:focus-within:` on children or direct focus styles
            - `outline-none` to remove default focus outline if not desired on this specific element
          */}
          <div
            ref={scrollableContainerRef}
            tabIndex={0} // Make it focusable
            className="
              w-[80%] sm:w-4/5 mx-auto
              overflow-x-hidden
              hover:overflow-x-auto focus-within:overflow-x-auto
              pb-4 outline-none group
              scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-rounded-full
            "
            // The scrollbar-* classes above require tailwindcss-scrollbar plugin.
            // If not using the plugin, you'll need custom CSS for thin scrollbars (see below).
          >
            <div className="flex space-x-4 whitespace-nowrap py-2">
              {suggestionCardsData.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-xl p-5 shadow-lg min-w-[260px] sm:min-w-[280px] md:min-w-[300px] inline-block cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col items-start space-y-3 h-full">
                      <IconComponent className="w-6 h-6 text-slate-500 mb-1" />
                      <p className="text-slate-700 text-sm text-left whitespace-normal leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Input Area ... (same as before) */}
      <footer className="w-full px-4 pb-8 sm:pb-12">
        <div className="w-[80%] sm:w-4/5 max-w-2xl mx-auto">
          <div className="bg-white rounded-full p-2 sm:p-3 shadow-xl flex items-center">
            <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mx-2 sm:mx-3" />
            <input
              type="text"
              placeholder="Ask whatever you want"
              className="flex-grow bg-transparent outline-none px-2 text-sm sm:text-base text-slate-700 placeholder-slate-400"
            />
            <button
              type="button"
              className="bg-purple-100 text-purple-600 rounded-full p-2 sm:p-3 ml-2 hover:bg-purple-200 transition-colors duration-200"
              aria-label="Submit"
            >
              <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIHomePage;