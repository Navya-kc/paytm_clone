import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function SendMoney({ onTransactionSuccess }) {
  const location = useLocation();
  const { userId, upiId: initialUpiId } = location.state || {};
  const [upiId, setUpiId] = useState(initialUpiId || "");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMoney = async () => {
    if (!upiId || !amount || amount <= 0) {
      setMessage("Please provide valid UPI ID and amount.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          toUpiId: upiId,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setMessage("Money sent successfully!");
      setAmount(""); // Reset amount field
      if (onTransactionSuccess) onTransactionSuccess(); // Trigger callback
    } catch (error) {
      console.error("Error sending money:", error);
      setMessage("Failed to send money. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Send Money
        </h1>

        {/* UPI ID Input */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="upi-id">
            UPI ID
          </label>
          <input
            id="upi-id"
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter recipient UPI ID"
            className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Amount Input */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMoney}
          disabled={isLoading}
          className={`w-full py-3 px-4 text-white text-lg font-semibold rounded-md transition duration-200 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? "Processing..." : "Send Money"}
        </button>

        {/* Feedback Message */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-md text-center ${
              message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default SendMoney;
