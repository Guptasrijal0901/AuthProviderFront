import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/signup", form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Signup successful:", response.data);
      alert("Signup successful!");
      navigate("/login"); // Redirect to login page

    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Signup failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="auth-box">
        <h2>Signup</h2>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={form.username} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={form.email} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={form.password} required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
