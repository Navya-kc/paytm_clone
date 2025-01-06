import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function UserPage() {
  const { userId } = useParams();

  // State to store user data
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Function to get user data from localStorage
  const getUserDataFromStorage = () => {
    const storedUserData = localStorage.getItem(`user-${userId}`);
    if (storedUserData) {
      return JSON.parse(storedUserData);
    }
    return null;
  };

  // Fetch user data from API or use stored data
  useEffect(() => {
    const storedUserData = getUserDataFromStorage();

    if (storedUserData) {
      setUserData(storedUserData); // If data exists in localStorage, use it
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
          const fetchedUserData = response.data;
          setUserData(fetchedUserData);

          // Store the fetched data in localStorage
          localStorage.setItem(`user-${userId}`, JSON.stringify(fetchedUserData));
        } catch (err) {
          setError("Failed to fetch user data.");
          console.error(err);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  // Render loading, error, or user data
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="bg-white text-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        <div className="space-y-4">
          <div>
            <strong>First Name:</strong> {userData.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {userData.lastName}
          </div>
          <div>
            <strong>Email:</strong> {userData.username}
          </div>
          <div>
            <strong>Account Created On:</strong> {new Date(userData.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
