import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!firstName || !lastName || !username || !password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/signin"), 1500); // Redirect after 1.5 seconds
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        {/* Header */}
        <Heading label={"Create Your Account"} />
        <SubHeading label={"Fill in your details to get started"} className="text-gray-600 mt-2" />

        {/* First Name Input */}
        <div className="mt-6">
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={"Enter your first name"}
            label={"First Name"}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Last Name Input */}
        <div className="mt-4">
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder={"Enter your last name"}
            label={"Last Name"}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Username (Email) Input */}
        <div className="mt-4">
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Enter your email"}
            label={"Email"}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter a strong password"}
            label={"Password"}
            type="password"
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Sign Up Button */}
        <div className="mt-6">
          <Button
            onClick={handleSignup}
            label={isLoading ? "Signing Up..." : "Sign Up"}
            className={`w-full py-3 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            } text-white font-semibold rounded-md shadow-md transition duration-300`}
            disabled={isLoading}
          />
        </div>

        {/* Feedback Message */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Bottom Warning Link */}
        <div className="mt-6">
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
            className="text-purple-600 hover:underline"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
