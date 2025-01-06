import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchBalance = async (setBalance, setIsLoading, setError) => {
  try {
    setIsLoading(true);
    const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setBalance(response.data.balance);
    setError(null);
  } catch (error) {
    console.error("Error fetching balance:", error);
    setError("Failed to fetch balance. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBalance(setBalance, setIsLoading, setError);
  }, []);

  return (
    <div>
      {/* Appbar */}
      <Appbar />

      {/* Main Content */}
      <div className="container mx-auto my-8 p-4">
        {/* Balance Section */}
        <div className="bg-blue-100 rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Your Balance</h2>
          {isLoading ? (
            <p className="text-gray-600">Loading balance...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Balance value={balance.toFixed(2)} />
          )}
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
          <Users onTransactionSuccess={() => fetchBalance(setBalance, setIsLoading, setError)} />
        </div>
      </div>
    </div>
  );
};
