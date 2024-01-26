"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-3xl mb-4">{loading ? "Processing..." : "Signup"}</h1>

      {/* Username */}
      <label htmlFor="username" className="text-gray-200">
        username
      </label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="border border-gray-200 p-2 rounded-md mt-2 mb-4"
      />

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
        onClick={onSignup}
        className="bg-cyan-700 hover:bg-cyan-600 text-white px-9 py-2 rounded-full mt-2 mb-4"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <p className="text-gray-200 ">
        Already have an account{" "}
        <Link className=" px-1 text-blue-300" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
