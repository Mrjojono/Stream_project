
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Auth from "../authentification/Auth";

function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (Event) => {
        Event.preventDefault();
        setMessage("");

        if (password !== repeatPassword) {
            setMessage("Error: Passwords do not match!");
            return;
        }

     const  datas = {
            email: email,
            password: password,
            name: username
        }
        const { data, error } = await Auth.register(datas);

        if (error) {
            setMessage(error.message);
        }

        if (data) {
            setMessage("User account created!");
        }

        setEmail("");
        setPassword("");
        setUsername("");
        setRepeatPassword("");

    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-950 w-auto rounded">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className={
                    message === "" ? "" :
                        message === "User account created!" ? "success" :
                            message === "Error: Passwords do not match!" ? "error" :
                                "default-class"
                }>
                    {message}
                </div>

                <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} method='post' >
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">username</label>
                        <input type="text" id="username" name="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    {/** email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    {/** password*/}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type={showPassword ? "text" : "password"}
                            id="password" name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                        <label htmlFor="password" className="block text-gray-700">Repeat Password</label>

                        <input type={showPassword ? "text" : "password"}
                            id="repeat-password" name="repeat-password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        
                   



                        <input type="checkbox" id="show-repeat-password" className="mr-2" onChange={togglePasswordVisibility} /> <span>show Password </span>

                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Register</button>
                    <button type="button" className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Login with Google</button>
                    <p className='text-center justify-center mt-6' ><Link to='/Login'  >Do you have an account? Login</Link> </p>
                </form>
            </div>
        </section>
    );
}

export default Register;