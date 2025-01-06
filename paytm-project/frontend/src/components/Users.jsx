import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = ({ onTransactionSuccess }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then(response => {
        console.log(response.data.user);
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">
        Users
      </div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map(user => (
          <User key={user._id} user={user} onTransactionSuccess={onTransactionSuccess} />
        ))}
      </div>
    </>
  );
};



function User({ user, onTransactionSuccess }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500">
            UPI ID: {user.upiId}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            navigate("/send", { state: { userId: user._id, upiId: user.upiId } });
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
