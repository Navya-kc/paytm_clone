import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!username || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username); // Store username in local storage
      setMessage("Sign in successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // Redirect to dashboard after 1.5 seconds
    } catch (error) {
      console.error("Error signing in:", error);
      setMessage("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 h-screen flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        {/* Header */}
        <Heading label={"Welcome Back!"} />
        <SubHeading label={"Sign in to access your account"} className="text-gray-600 mt-2" />

        {/* Username Input */}
        <div className="mt-6">
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Enter your email"}
            label={"Email"}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter your password"}
            label={"Password"}
            type="password"
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sign In Button */}
        <div className="mt-6">
          <Button
            onClick={handleSignin}
            label={isLoading ? "Signing In..." : "Sign In"}
            className={`w-full py-3 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold rounded-md shadow-md transition duration-300`}
            disabled={isLoading}
          />
        </div>

        {/* Feedback Message */}
        {message && (
          <p
            className={`mt-4 ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            } text-sm text-center`}
          >
            {message}
          </p>
        )}

        {/* Sign Up Link */}
        <div className="mt-6">
          <BottomWarning
            label={"New to our platform?"}
            buttonText={"Sign up"}
            to={"/signup"}
            className="text-blue-600 hover:underline"
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
