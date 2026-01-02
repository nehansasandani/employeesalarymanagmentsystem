import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define validation schema with Zod
const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
});

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login, loading: isSubmitting } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        setLoginError('');

        try {
            const result = await login(data.email, data.password);

            if (!result.success) {
                throw new Error(result.error || 'Login failed');
            }

            // Navigate to dashboard on successful login
            navigate('/');

        } catch (error) {
            setLoginError(error.message || 'An error occurred during login');
        }
    }; return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md animate-fade-in">
                <div className="bg-white py-10 px-10 shadow-xl rounded-2xl border border-purple-100">
                    <div className="flex flex-col items-center mb-8">
                        <div className="h-20 w-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-5 shadow-md ring-4 ring-purple-50">
                            <svg className="h-10 w-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-violet-700 font-heading">Welcome Back</h2>
                        <p className="mt-2 text-gray-600">Please enter your credentials to login</p>
                    </div>                    {loginError && (
                        <div className="p-5 mb-6 text-sm bg-red-50 border-l-4 border-red-400 text-red-600 rounded-lg animate-slide-up shadow-sm">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path>
                                </svg>
                                <span className="font-medium">{loginError}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">                        <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                        </label>
                        <div className="mt-1 relative">
                            <input
                                {...register('email')}
                                id="email"
                                type="email"
                                autoComplete="email"
                                className={`appearance-none block w-full px-4 py-3.5 border-2 ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : 'border-purple-100 focus:border-purple-300 focus:ring-purple-100'
                                    } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-opacity-30 transition-all duration-200`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    {...register('password')}
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={`appearance-none block w-full px-4 py-3.5 border-2 ${errors.password ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : 'border-purple-100 focus:border-purple-300 focus:ring-purple-100'
                                        } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-opacity-30 transition-all duration-200`}
                                    placeholder="********"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-5 w-5 text-purple-600 focus:ring-purple-400 border-purple-200 rounded-md focus:ring-offset-1"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-600 hover:text-purple-700 transition-colors underline underline-offset-2 decoration-purple-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-0 transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-purple-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-600 font-medium">
                                    Don't have an account?
                                </span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <a
                                href="/register"
                                className="w-full flex justify-center py-4 px-4 border-2 border-purple-200 rounded-xl shadow-sm bg-white text-base font-medium text-purple-700 hover:bg-purple-50 hover:border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 ease-in-out"
                            >
                                Create an account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
