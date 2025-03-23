import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import Auth from "../authentification/Auth";
import UserContext from "./userContext";
function LoginForm({ onLogin }) {
  // Ajoutez onLogin comme prop
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  
  const { setUser } = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await Auth.authenticate(email, password);

    if (error) {
      console.log(error);
      setMessage("Une erreur s'est produite verifier vos identifiant.");
      setEmail("");
      setPassword("");
      return;
    }

    if ((data.message = "Login successful")) {
      localStorage.setItem("userToken", data.token);
      onLogin(true);
      setUser(data.data);
      navigate("/",{ state: data.data });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-500 to-gray-900  w-auto rounded">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {message && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }} 
            className="error_message  rounded-lg"
          >
            <p className="text-red-500 text-center mt-4">{message}</p>
          </motion.div>
        )}

        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="checkbox"
              id="show-password"
              className="mr-2"
              onChange={togglePasswordVisibility}
            />
            <span>Show Password</span>
            <div className="flex flex-row gap-9">
              <label>
                <input type="checkbox" id="show" className="mr-2" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login with Google
          </button>
          <p className="text-center justify-center mt-6">
            <Link to="/Register">Don't have an account? Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
