"use client";

import LoginForm from "@/components/ui/login/LoginForm";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return <LoginForm login={handleLogin}></LoginForm>;
};

export default Login;
