"use client"

import React, { useState } from 'react';

const Home: React.FC = () => {
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  const askTheAI = async () => {
    try {
      // Make a POST request to the /api/openai endpoint
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput }),
      });

      // Handle the response
      if (response.ok) {
        const responseData = await response.json();
        const aiResponse = `Assistant: ${responseData.response}`;

        // Add the user's message and AI's response to the message history
        setMessageHistory((prevHistory) => [...prevHistory, `User: ${userInput}`, aiResponse]);

        // Clear the textarea after asking the AI
        setUserInput('');
      } else {
        console.error('Error:', response.status, response.statusText);
        // Handle errors and display a user-friendly message
        setMessageHistory((prevHistory) => [...prevHistory, `Error: Unable to get AI response.`]);
      }
    } catch (error) {
      console.error('Error handling API request:', error);
      // Handle errors and display a user-friendly message
      setMessageHistory((prevHistory) => [...prevHistory, `Error: Internal Server Error.`]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800 p-4 text-center">
        <a href="https://github.com/PragathTSiva" target="_blank" rel="noopener noreferrer">
          <img
            className="h-8 w-8 inline-block mr-2"
            src="/GitHub-Mark.png"  // Replace with your GitHub icon image
            alt="GitHub Icon"
          />
          Visit GitHub
        </a>
      </div>

      {/* Conversation History */}
      <div className="max-w-lg w-full p-4 mb-4 bg-white rounded-md shadow-md overflow-y-auto text-gray-800 mx-auto mt-8">
        {messageHistory.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>

      {/* Bigger Textarea */}
      <textarea
        className="max-w-lg w-full h-40 p-4 mb-4 bg-white rounded-md shadow-md resize-none text-gray-800 mx-auto"
        placeholder="Type your message here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      {/* Ask the AI Button */}
      <button
        className="max-w-lg w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-auto"
        onClick={askTheAI}
      >
        Ask the AI
      </button>

      {/* Author Section */}
      <div className="text-center mt-8">
        <p className="text-black-500">Project by Pragath Siva</p>
      </div>
    </div>
  );
};

export default Home;
