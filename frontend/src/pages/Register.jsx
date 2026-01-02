import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define validation schema with Zod
const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Please confirm your password" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { register: registerUser, loading: isSubmitting } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        setRegisterError('');
        setSuccess(false);

        try {
            const result = await registerUser({
                name: data.name,
                email: data.email,
                password: data.password
            });

            if (!result.success) {
                throw new Error(result.error || 'Registration failed');
            }

            // Set success state and show message
            setSuccess(true);

            // Redirect to verification page or login after a delay
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            setRegisterError(error.message || 'An error occurred during registration');
        }
    }; return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg animate-fade-in">
                <div className="bg-white py-8 px-8 shadow-purple rounded-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-neutral-800 font-heading">Create Account</h2>
                        <p className="mt-2 text-neutral-500">Join us today and start shopping</p>
                    </div>

                    {registerError && (
                        <div className="p-4 mb-6 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg animate-slide-up">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path>
                                </svg>
                                {registerError}
                            </div>
                        </div>
                    )}                    {success && (
                        <div className="p-5 mb-6 text-sm bg-primary-50 border border-primary-200 text-primary-700 rounded-lg animate-slide-up">
                            <div className="flex items-center">
                                <div className="mr-3 flex-shrink-0 bg-primary-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-primary-800 mb-1">Registration successful!</p>
                                    <p className="text-primary-700">Please check your email for verification instructions. Redirecting to login...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    {...register('name')}
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    className={`appearance-none block w-full px-4 py-3 border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
                                        } rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                                Email Address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    {...register('email')}
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`appearance-none block w-full px-4 py-3 border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
                                        } rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    {...register('password')}
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    className={`appearance-none block w-full px-4 py-3 border ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
                                        } rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                    placeholder="********"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    {...register('confirmPassword')}
                                    id="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    className={`appearance-none block w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
                                        } rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                    placeholder="********"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting || success}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-neutral-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a
                                href="/login"
                                className="w-full flex justify-center py-3 px-4 border border-neutral-300 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out"
                            >
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
