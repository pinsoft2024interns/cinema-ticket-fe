'use client';

import Header from '@/components/Header';
import SignupForm from '@/components/SignupForm';

const SignupPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="p-6 flex items-center justify-center">
                <SignupForm />
            </main>
        </div>
    );
};

export default SignupPage;
