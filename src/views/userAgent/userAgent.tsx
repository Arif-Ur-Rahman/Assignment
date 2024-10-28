import React from "react";
import { GetServerSideProps } from "next";
import { BackToHome } from "@/components/backToHome/backToHome"; // Adjust the import path if needed

interface UserAgentProps {
  userAgent: string | null;
}

const UserAgent: React.FC<UserAgentProps> = ({ userAgent }) => {
  return (
    <div>
      <BackToHome />
      <div className="flex font-mono font-semibold text-sm">
        <div className="border p-2">UserAgent</div>
        <div className="border p-2">{userAgent || "No user agent detected"}</div>
      </div>
    </div>
  );
};

// Define the server-side function with TypeScript
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers["user-agent"] || null;

  console.log("User Agent from headers:", userAgent); // Log the user agent for debugging

  return {
    props: {
      userAgent,
    },
  };
};

export default UserAgent;
