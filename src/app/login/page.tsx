'use client';

import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="p-6 flex items-center justify-center">
                <LoginForm />
            </main>
        </div>
    );
};

export default LoginPage;
