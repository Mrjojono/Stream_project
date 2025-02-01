
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { motion } from "motion/react";


function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-950 w-auto rounded">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type={showPassword ? "text" : "password"} id="password" name="password" className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        <input type="checkbox" id="show-password" className="mr-2" onChange={togglePasswordVisibility} /> <span>show Password </span>
                        <div className='flex flex-row gap-9'>
                            <label>
                            <input type="checkbox" id="show" className="mr-2"/> <span>Remember me </span>
                            </label>
                            <a href="#" className="text-sm text-blue-500">Forgot password?</a>
                        </div>
                        
                    </div>
  
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
                    <button type="button" className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Login with Google</button>
                    <p className='text-center justify-center mt-6' ><Link to='/Register'  >Don't have an account? Register</Link> </p>
                </form>
            </div>

           

        </section>
    );
}

export default LoginForm;