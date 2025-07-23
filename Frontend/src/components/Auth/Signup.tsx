"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import{ Link }from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  codeClubRole: z.string().min(1, "Club role is required"),
  yearOfPursuing: z.string().min(1, "Year of pursuing is required"),
  yearOfPassing: z.string().min(1, "Year of passing is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("form data -->", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black px-4">
      <Card className="w-full max-w-md bg-zinc-900 text-white border border-zinc-800/50 rounded-3xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Create your account</CardTitle>
          <p className="text-sm text-zinc-400 mt-1">Join the club and get started today</p>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name" className="font-medium">Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Roni Bhakta"
                className="focus:ring-2 focus:ring-blue-500"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="text-xs text-red-400">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="roni123@gmail.com"
                className="focus:ring-2 focus:ring-blue-500"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password" className="font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="focus:ring-2 focus:ring-blue-500"
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && <p id="password-error" className="text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {/* Code Club Role */}
            <div className="space-y-1">
              <Label htmlFor="codeClubRole" className="font-medium">Club Role</Label>
              <Input
                id="codeClubRole"
                {...register("codeClubRole")}
                placeholder="President"
                className="focus:ring-2 focus:ring-blue-500"
                aria-describedby={errors.codeClubRole ? "codeClubRole-error" : undefined}
              />
              {errors.codeClubRole && <p id="codeClubRole-error" className="text-xs text-red-400">{errors.codeClubRole.message}</p>}
            </div>

            {/* Year Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="yearOfPursuing" className="font-medium">Pursuing Year</Label>
                <Input
                  id="yearOfPursuing"
                  {...register("yearOfPursuing")}
                  placeholder="3rd"
                  className="focus:ring-2 focus:ring-blue-500"
                  aria-describedby={errors.yearOfPursuing ? "yearOfPursuing-error" : undefined}
                />
                {errors.yearOfPursuing && <p id="yearOfPursuing-error" className="text-xs text-red-400">{errors.yearOfPursuing.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="yearOfPassing" className="font-medium">Passing Year</Label>
                <Input
                  id="yearOfPassing"
                  {...register("yearOfPassing")}
                  placeholder="2026"
                  className="focus:ring-2 focus:ring-blue-500"
                  aria-describedby={errors.yearOfPassing ? "yearOfPassing-error" : undefined}
                />
                {errors.yearOfPassing && <p id="yearOfPassing-error" className="text-xs text-red-400">{errors.yearOfPassing.message}</p>}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <Label htmlFor="bio" className="font-medium">Bio</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Tell us about yourself..."
                className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
                aria-describedby={errors.bio ? "bio-error" : undefined}
              />
              {errors.bio && <p id="bio-error" className="text-xs text-red-400">{errors.bio.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center ">
                <Button
                type="submit"
                className="w-full cursor-pointer  bg-zinc-100 hover:bg-zinc-300 text-black font-medium transition-colors disabled:opacity-50"
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
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Submitting...
                    </span>
                ) : (
                    "Register"
                )}
                </Button>

            </div>
            
            {/* Sign In Link */}
            <div className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link to="/user/login" className="text-blue-400 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}