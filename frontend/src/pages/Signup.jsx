import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      email,
      password
    });
    alert("Signup successful");
  };

  return (
    <div>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}