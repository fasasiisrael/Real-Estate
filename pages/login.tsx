// components/Login.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <button onClick={login} className="p-2 bg-blue-600 text-white rounded">
      Login with Google
    </button>
  );
};

export default Login;
