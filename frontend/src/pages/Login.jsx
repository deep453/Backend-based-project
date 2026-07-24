import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import logo from "../assets/logo.svg";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            const response = await loginUser(data);

            console.log(response);

            // Save logged-in user in Context
            login(response.data.user);

            toast.success("Welcome Back!");

            reset();

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center justify-center px-6">

            {/* Background Gradient */}

            <div className="absolute inset-0">

                <div className="absolute -top-52 -left-44 h-[420px] w-[420px] rounded-full bg-red-600/20 blur-[180px]" />

                <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[180px]" />

                <div className="absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[150px]" />

            </div>

            {/* Tiny Grid */}

            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
                    backgroundSize: "70px 70px"
                }}
            />

            {/* Main Container */}

            <div className="relative z-10 flex w-full max-w-xl flex-col gap-8 items-center">

                {/* Logo */}

                <div className="flex justify-center mb-32">
    <img
        src={logo}
        alt="VideoTube"
        className="w-56 drop-shadow-[0_0_35px_rgba(255,0,0,0.45)] transition duration-500 hover:scale-105"
    />
</div>

                {/* Brand */}


                {/* Glass Card */}

                <div
                    className="
                    w-full
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    backdrop-blur-3xl
                    px-14
                    py-14
                    shadow-[0_30px_80px_rgba(0,0,0,0.65)]
                    "
                >

                    {/* Heading */}

                    <h2 className="mb-10 text-center text-3xl font-bold text-white">

                        Sign In

                    </h2>

                    {/* Form */}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8"
                    >

                        {/* Email */}

                        <div>

                            <label
                                className="
                                mb-0.5
                                ml-1
                                block
                                text-sm
                                font-medium
                                text-gray-300
                                "
                            >

                                Email

                            </label>

                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    register={register}
                                    name="email"
                                    required
                                    className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    py-12
                                    px-12
                                    pr-4
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    transition
                                    focus:border-red-500
                                    focus:ring-2
                                    focus:ring-red-500/20
                                    "
                                />

                            </div>

                            {errors.email && (

                                <p className="mt-2 text-sm text-red-400">

                                    Email is required

                                </p>

                            )}

                        </div>

                        {/* Password */}

                        <div>

                            <label
                                className="
                                mb-0.5
                                ml-1
                                block
                                text-sm
                                font-medium
                                text-gray-300
                                "
                            >

                                Password

                            </label>

                            <div className="relative">
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    register={register}
                                    name="password"
                                    required
                                    className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    py-4
                                    px-5
                                    pr-12
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    transition
                                    focus:border-red-500
                                    focus:ring-2
                                    focus:ring-red-500/20
                                    "
                                />


                            </div>

                            {errors.password && (

                                <p className="mt-2 text-sm text-red-400">

                                    Password is required

                                </p>

                            )}

                        </div>
                                                {/* Remember Me + Forgot Password */}

                        <div className="flex items-center justify-between pt-1">

                            <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">

                                <input
                                    type="checkbox"
                                    className="
                                    h-4
                                    w-4
                                    rounded
                                    border-gray-500
                                    bg-transparent
                                    accent-red-600
                                    "
                                />

                                Remember Me

                            </label>

                            <button
                                type="button"
                                className="
                                text-sm
                                font-medium
                                text-red-400
                                transition
                                duration-300
                                hover:text-red-300
                                "
                            >

                                Forgot Password?

                            </button>

                        </div>

                        {/* Login Button */}

                        <Button
                            type="submit"
                            loading={loading}
                            className="
                            mt-2
                            w-full
                            rounded-xl
                            bg-gradient-to-r
                            from-red-600
                            via-red-500
                            to-pink-500
                            py-4
                            text-lg
                            font-semibold
                            tracking-wide
                            text-white
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_10px_35px_rgba(239,68,68,0.45)]
                            "
                        >

                            Login →

                        </Button>

                    </form>

                    {/* Divider */}

                    <div className="my-8 flex items-center">

                        <div className="h-px flex-1 bg-white/10"></div>

                        <span className="mx-4 text-sm tracking-widest text-gray-500">

                            OR

                        </span>

                        <div className="h-px flex-1 bg-white/10"></div>

                    </div>

                    {/* Google Login */}

                    <button
                        className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        py-4
                        font-medium
                        text-white
                        transition-all
                        duration-300
                        hover:border-white/20
                        hover:bg-white/10
                        "
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="h-6 w-6"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611 20.083H42V20H24v8h11.303C33.653 32.657 29.225 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                            />
                            <path
                                fill="#FF3D00"
                                d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.732 0-14.41 4.388-17.694 10.691z"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.164 35.091 26.715 36 24 36c-5.204 0-9.618-3.329-11.283-7.946l-6.52 5.025C9.437 39.556 16.227 44 24 44z"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.611 20.083H42V20H24v8h11.303c-.793 2.379-2.353 4.389-4.494 5.571l6.19 5.238C36.972 38.602 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
                            />
                        </svg>

                        Continue with Google

                    </button>

                    {/* Register */}

                    <p className="mt-8 text-center text-gray-300">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="
                            font-semibold
                            text-red-400
                            transition
                            duration-300
                            hover:text-red-300
                            "
                        >

                            Register

                        </Link>

                    </p>

                </div>
                            </div>

        </div>

    );

};

export default Login;