import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload } from "lucide-react";
import toast from "react-hot-toast";

import logo from "../assets/logo.svg";
import { registerUser } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();

    // ============================
    // Form States
    // ============================

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ============================
    // File States
    // ============================

    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    // ============================
    // Preview States
    // ============================

    const [avatarPreview, setAvatarPreview] = useState("");
    const [coverPreview, setCoverPreview] = useState("");

    // ============================
    // UI States
    // ============================

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    // ============================
    // Avatar Upload
    // ============================

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    // ============================
    // Cover Upload
    // ============================

    const handleCoverChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file));
    };

    // ============================
    // Submit
    // ============================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !fullName ||
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            toast.error("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!avatar) {
            toast.error("Please upload an avatar.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("fullName", fullName);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("avatar", avatar);

            if (coverImage) {
                formData.append("coverImage", coverImage);
            }

            const response = await registerUser(formData);

            console.log(response);

            toast.success("Registration Successful!");

            navigate("/login");

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {
            setLoading(false);
        }
    };
        return (
        <div
            className="
            min-h-screen
            flex
            items-center
            justify-center
            px-6
            py-10
            bg-gradient-to-br
            from-black
            via-gray-950
            to-black
            relative
            overflow-hidden
            "
        >
            {/* Background Blur */}

            <div className="absolute w-96 h-96 bg-red-600/20 rounded-full blur-[130px] -top-24 -left-20" />

            <div className="absolute w-96 h-96 bg-red-500/20 rounded-full blur-[130px] bottom-0 right-0" />

            <div
                className="
                relative
                z-10
                flex
                flex-col
                items-center
                w-full
                "
            >

                {/* Logo */}

                <div className="mb-16">

                    <img
                        src={logo}
                        alt="VideoTube"
                        className="
                        w-72
                        drop-shadow-[0_0_35px_rgba(255,0,0,0.45)]
                        transition
                        duration-500
                        hover:scale-105
                        "
                    />

                </div>

                {/* Register Card */}

                <div
                    className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/10
                    backdrop-blur-2xl
                    shadow-2xl
                    px-12
                    py-12
                    "
                >

                    {/* Heading */}

                    <h2
                        className="
                        text-4xl
                        font-bold
                        text-center
                        text-white
                        mb-12
                        "
                    >
                        Create Account
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >

                        {/* Full Name */}

                        <div>

                            <label
                                className="
                                block
                                text-gray-300
                                text-sm
                                font-medium
                                mb-3
                                pl-2
                                "
                            >
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                className="
                                w-full
                                rounded-xl
                                border
                                border-gray-700
                                bg-black/30
                                px-5
                                py-4
                                text-white
                                placeholder:text-gray-500
                                outline-none
                                focus:border-red-500
                                transition
                                "
                            />

                        </div>

                        {/* Username */}

                        <div>

                            <label
                                className="
                                block
                                text-gray-300
                                text-sm
                                font-medium
                                mb-3
                                pl-2
                                "
                            >
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                className="
                                w-full
                                rounded-xl
                                border
                                border-gray-700
                                bg-black/30
                                px-5
                                py-4
                                text-white
                                placeholder:text-gray-500
                                outline-none
                                focus:border-red-500
                                transition
                                "
                            />

                        </div>

                        {/* Email */}

                        <div>

                            <label
                                className="
                                block
                                text-gray-300
                                text-sm
                                font-medium
                                mb-3
                                pl-2
                                "
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="
                                w-full
                                rounded-xl
                                border
                                border-gray-700
                                bg-black/30
                                px-5
                                py-4
                                text-white
                                placeholder:text-gray-500
                                outline-none
                                focus:border-red-500
                                transition
                                "
                            />

                        </div>

                                            {/* Password */}

                        <div>

                            <label
                                className="
                                block
                                text-gray-300
                                text-sm
                                font-medium
                                mb-3
                                pl-2
                                "
                            >
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-700
                                    bg-black/30
                                    px-5
                                    py-4
                                    pr-14
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    focus:border-red-500
                                    transition
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    hover:text-white
                                    "
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Confirm Password */}

                        <div>

                            <label
                                className="
                                block
                                text-gray-300
                                text-sm
                                font-medium
                                mb-3
                                pl-2
                                "
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-700
                                    bg-black/30
                                    px-5
                                    py-4
                                    pr-14
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    focus:border-red-500
                                    transition
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    hover:text-white
                                    "
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Avatar Upload */}

                        <div>

                            <label
                                className="
                                block
                                text-gray-300
                                text-sm
                                font-medium
                                mb-3
                                pl-2
                                "
                            >
                                Avatar
                            </label>

                            <label
                                className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                w-full
                                h-40
                                rounded-2xl
                                border-2
                                border-dashed
                                border-gray-600
                                cursor-pointer
                                bg-black/20
                                hover:border-red-500
                                transition
                                "
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="avatar"
                                        className="
                                        h-full
                                        w-full
                                        object-cover
                                        rounded-2xl
                                        "
                                    />
                                ) : (
                                    <>
                                        <Upload
                                            size={34}
                                            className="text-gray-400 mb-3"
                                        />
                                        <p className="text-gray-400">
                                            Upload Avatar
                                        </p>
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleAvatarChange
                                    }
                                    className="hidden"
                                />
                            </label>

                        </div>

                        {/* Cover Image */}

                        <div>

                            <label
                                className="
                                block
                                text-gray-300
                                text-sm
                                font-medium
                                mb-3
                                pl-2
                                "
                            >
                                Cover Image
                                <span className="text-gray-500 text-xs ml-2">
                                    (Optional)
                                </span>
                            </label>

                            <label
                                className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                w-full
                                h-40
                                rounded-2xl
                                border-2
                                border-dashed
                                border-gray-600
                                cursor-pointer
                                bg-black/20
                                hover:border-red-500
                                transition
                                "
                            >
                                {coverPreview ? (
                                    <img
                                        src={coverPreview}
                                        alt="cover"
                                        className="
                                        h-full
                                        w-full
                                        object-cover
                                        rounded-2xl
                                        "
                                    />
                                ) : (
                                    <>
                                        <Upload
                                            size={34}
                                            className="text-gray-400 mb-3"
                                        />
                                        <p className="text-gray-400">
                                            Upload Cover Image
                                        </p>
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleCoverChange
                                    }
                                    className="hidden"
                                />
                            </label>

                        </div>

                        {/* Register Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                            w-full
                            py-4
                            rounded-xl
                            font-semibold
                            text-white
                            bg-gradient-to-r
                            from-red-600
                            to-red-500
                            hover:from-red-700
                            hover:to-red-600
                            transition
                            duration-300
                            disabled:opacity-60
                            "
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                        {/* Login Link */}

                        <p
                            className="
                            text-center
                            text-gray-400
                            text-sm
                            "
                        >
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="
                                text-red-500
                                hover:text-red-400
                                font-medium
                                "
                            >
                                Sign In
                            </Link>
                        </p>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Register;