"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("User Details");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl">Profile</h1>
      <p className="text-2xl mb-6">Welcome to your profile</p>
      <h2>
        {data === "User Details" ? (
          "User Details"
        ) : (
          <Link
            href={`/profile/${data}`}
            className="rounded-full border border-gray-200 px-8 py-2 mt-6"
          >
            {data}
          </Link>
        )}
      </h2>
      <button
        onClick={getUserDetails}
        className="rounded-full border border-gray-200 px-8 py-2 mt-6"
      >
        Get User Details
      </button>
      <button
        onClick={logout}
        className=" rounded-full border border-gray-200 px-8 py-2 mt-6 bg-cyan-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
