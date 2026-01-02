import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const [verifying, setVerifying] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { verifyEmail } = useAuth();

    useEffect(() => {
        const verify = async () => {
            if (!code) {
                setVerifying(false);
                setError('Verification code is missing');
                return;
            }

            try {
                const result = await verifyEmail(code);

                if (result.success) {
                    setSuccess(true);
                    // Redirect to login page after a delay
                    setTimeout(() => {
                        navigate('/login');
                    }, 5000);
                } else {
                    setError(result.error || 'Verification failed');
                }
            } catch (error) {
                setError(error.message || 'An error occurred during verification');
            } finally {
                setVerifying(false);
            }
        };

        verify();
    }, [code, navigate, verifyEmail]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md animate-fade-in">
                <div className="bg-white py-8 px-8 shadow-purple rounded-2xl">
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-neutral-800 font-heading">Email Verification</h2>
                    </div>

                    <div className="py-6">
                        {verifying && (
                            <div className="flex flex-col items-center justify-center">
                                <svg className="animate-spin h-10 w-10 text-primary-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="text-neutral-600">Verifying your email address...</p>
                            </div>
                        )}                        {!verifying && success && (
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                                    <svg className="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-neutral-800 mb-2 font-heading">Verification Successful</h3>
                                <p className="text-neutral-600 mb-6">Your email has been verified successfully!</p>
                                <p className="text-sm text-primary-600">You will be redirected to the login page in a few seconds...</p>
                            </div>
                        )}

                        {!verifying && error && (
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                    <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-neutral-800 mb-2">Verification Failed</h3>
                                <p className="text-neutral-500 mb-6">{error}</p>                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-purple text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    Go to Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
