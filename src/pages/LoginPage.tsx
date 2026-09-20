import { useState } from "react";
import { Circle, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Backendless from "../config/backendless";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleLogin = async () => {

        try {

            setLoading(true);
            setError("");

            await Backendless.UserService.login(
                email,
                password,
                true
            );

            navigate("/create-blog");

        } catch (error) {

            console.log(error);

            setError("Email or password is incorrect.");

        } finally {

            setLoading(false);

        }

    };


    return (

        <section
            className='relative overflow-hidden bg-gradient-to-br
            from-gray-50 to-green-50 py-12 px-4 sm:py-16 md:py-20 md:px-12
            min-h-screen'
        >

            <div className='max-w-xl mx-auto'>


                {/* TITLE */}
                <div
                    className='mb-8 md:mb-10 text-center'
                    data-aos='fade-down'
                >

                    <h2 className='text-3xl sm:text-4xl md:text-5xl text-gray-900'>

                        Account{" "}

                        <span className='font-bold text-black'>

                            Login

                            <span className='text-green-500'>
                                .
                            </span>

                        </span>

                    </h2>


                    <div className='flex gap-3 mt-4 justify-center'>

                        <Circle
                            className='text-pink-500 w-5 h-5'
                        />

                        <Circle
                            className='text-yellow-500 w-5 h-5'
                        />

                        <Circle
                            className='text-green-500 w-5 h-5'
                        />

                    </div>


                    <p className='text-gray-600 mt-5'>

                        Login to manage and create blog articles.

                    </p>

                </div>


                {/* LOGIN CARD */}
                <div
                    className='bg-white p-6 sm:p-8 md:p-10
                    rounded-2xl md:rounded-3xl
                    border border-gray-100
                    shadow-lg md:shadow-xl'
                    data-aos='fade-up'
                >


                    {/* EMAIL */}
                    <div className='mb-5'>

                        <label
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Email
                        </label>


                        <input
                            type='email'
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder='Enter your email'
                            className='w-full px-4 py-3
                            border border-gray-200 rounded-xl
                            outline-none
                            focus:border-pink-400'
                        />

                    </div>


                    {/* PASSWORD */}
                    <div className='mb-6'>

                        <label
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Password
                        </label>


                        <input
                            type='password'
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder='Enter your password'
                            className='w-full px-4 py-3
                            border border-gray-200 rounded-xl
                            outline-none
                            focus:border-pink-400'
                        />

                    </div>


                    {/* ERROR */}
                    {error && (

                        <p className='text-red-500 text-sm text-center mb-4'>

                            {error}

                        </p>

                    )}


                    {/* BUTTON */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className='w-full px-6 py-3
                        bg-pink-500 hover:bg-pink-600
                        text-white rounded-full font-medium
                        transition-all shadow-md hover:shadow-lg
                        flex items-center justify-center gap-2
                        disabled:opacity-50
                        disabled:cursor-not-allowed'
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }


                        <LogIn className='w-5 h-5' />

                    </button>

                </div>

            </div>


            {/* DECORATION */}
            <div
                className='hidden md:block absolute border-2
                border-pink-500 bottom-20 left-10
                w-20 h-20 rounded-full opacity-50'
            />


            <div
                className='hidden md:block absolute border-2
                border-green-500 top-40 right-10
                w-28 h-28 rounded-full opacity-50'
            />

        </section>

    );

};

export default LoginPage;