"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

import { userSigninInput,UserSigninInput } from "@nasirnadaf/codeclubagpit-common";


export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserSigninInput>({
    resolver: zodResolver(userSigninInput),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: UserSigninInput) => {
    setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/signin`, data);
      const token = response.data; // Hono router returns JWT as text
      localStorage.setItem("token", token);
      console.log("JWT:", token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black px-4">
      <Card className="w-full max-w-md bg-zinc-900 text-white border border-zinc-800/50 rounded-3xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Login</CardTitle>
          <p className="text-sm text-zinc-400 mt-1">Enter your credentials to access your account</p>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-6">
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-zinc-100 hover:bg-zinc-300 text-black font-medium transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <div className="text-center text-sm text-zinc-400">
              Don’t have an account?{" "}
              <Link to="/user/signup" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}