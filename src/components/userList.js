import React, { useState, useEffect } from "react";

const API_URL = "https://reqres.in/api/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [delayTime, setDelayTime] = useState(3);
  const [error, setError] = useState("");
  const [lastLoadTime, setLastLoadTime] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?delay=${delayTime * 1000}`);
        const data = await response.json();
        setUsers(data.data);
        setLoading(false);
        setLastLoadTime(new Date().toLocaleTimeString());
      } catch (error) {
        setError("Timeout error occurred. Please try again.");
        setLoading(false);
      }
    };

    loadData();
  }, [delayTime]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <button onClick={() => setDelayTime(5)}>Delay API call by 5 seconds</button>
        <p>Last load time: {lastLoadTime}</p>
      </div>
      <div>
        <input type="text" placeholder="Search by name or email" onChange={handleSearchChange} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {filteredUsers.map((user) => (
            <div key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <p>Name: {user.first_name} {user.last_name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;