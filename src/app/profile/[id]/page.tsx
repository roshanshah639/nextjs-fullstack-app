import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">
        Profile Page Of{" "}
        <span className="border border-gray-200 px-3 py-2 ml-2 rounded-md">
          {params.id}
        </span>
      </h1>
    </div>
  );
};

export default UserProfile;
