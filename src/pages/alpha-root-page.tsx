import React, { useState, useEffect, FormEvent } from "react";
import "./App.css";
import { AuthenticateUser } from "../services/users-service";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const response = await AuthenticateUser(username, password);

      if (response.success) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); 
      } else {
        setError(`Login Unsuccessful: ${response.message}`);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed due to an error.");
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn'); 
    setIsLoggedIn(false); 
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          <>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
              <div className="container">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="error">{error}</div>}
              <button type="submit">Login</button>
            </form>
          </>
        ) : (
          <>
            <h2>Chat </h2>
            <div className="chatbox"></div>
            <input value={""} type="text" placeholder="Type a message..." />
            <button>Send</button>
            <button onClick={logout}>Logout</button> 
          </>
        )}
      </header>
    </div>
  );
}

export default App;
