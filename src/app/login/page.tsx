"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Logged in Successfully");
      toast.success("Logged in Successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-3xl mb-4"> {loading ? "Loading..." : "Login"} </h1>

      {/* Email */}
      <label htmlFor="email" className=" text-gray-200">
        email
      </label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="border border-gray-200 p-2 rounded-md mt-2 mb-4"
      />

      {/* Password */}
      <label htmlFor="password" className=" text-gray-200">
        password
      </label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="border border-gray-200 p-2 rounded-md mt-2 mb-4"
      />

      {/* Submit */}
      <button
        onClick={onLogin}
        className="bg-cyan-700 hover:bg-cyan-600 text-white px-9 py-2 rounded-full mt-2 mb-4"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>

      <p className="text-gray-200 ">
        New to website{" "}
        <Link className=" px-1 text-blue-300" href="/signup">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
