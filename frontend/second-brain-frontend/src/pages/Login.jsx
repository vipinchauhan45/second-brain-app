import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError(null);

    try {
      const url = isSignUp
        ? "http://localhost:3000/api/v1/signup"
        : "http://localhost:3000/api/v1/signin";

      const payload = isSignUp
        ? { username: Username, email, password }
        : { username: Username, password };

      const response = await axios.post(url, payload);

      const token = response.data.token;
      console.log("Received Token:", token);
      setEmail("");
      setUsername("");
      setPassword("");
      localStorage.setItem("token", token);
      alert("Authentication successful!");
      navigate('/')
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <div className="relative w-full max-w-[850px] h-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div
          className={`w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center items-center text-white transition-all duration-500 ${
            isSignUp ? "bg-teal-500" : "bg-white"
          }`}
        >
          <div className="text-center">
            <h2
              className={`text-xl md:text-2xl font-bold mb-4 ${
                isSignUp ? "" : "text-teal-500"
              }`}
            >
              {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <p className="mb-6 text-sm md:text-base px-4">
              {isSignUp
                ? "To keep connected with us please login with your personal info"
                : "Enter your details to start your journey with us"}
            </p>
            <button
              className={`px-6 py-2 border rounded-full font-semibold transition-all duration-300 ${
                isSignUp
                  ? "border-white text-white hover:bg-white hover:text-teal-500 hover:shadow-lg"
                  : "border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white hover:shadow-lg"
              }`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "SIGN IN" : "SIGN UP"}
            </button>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-500 text-center md:text-left">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>

          {/* Social buttons */}
          <div className="flex gap-4 justify-center mb-4">
            {/* Your social buttons here */}
          </div>

          <p className="text-sm text-gray-500 text-center mb-4">
            {isSignUp
              ? "or use your email for registration:"
              : "or sign in with your credentials:"}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {isSignUp && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 hover:shadow-md transition-all"
            >
              {isSignUp ? "SIGN UP" : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
