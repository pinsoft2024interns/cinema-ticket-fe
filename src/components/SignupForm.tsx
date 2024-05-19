'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './SignupForm.scss';

const SignupForm = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        if (!username || !email || !password) {
            console.error('Lütfen tüm alanları doldurun.');
            return;
        }
        try {
            const formData = {
                username,
                email,
                password,
            };

            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/login');
            } else {
                const errorText = await response.text();
                console.error('Kayıt başarısız:', response.statusText, 'Yanıt metni:', errorText);
            }
        } catch (error) {
            console.error("Kayıt yapılırken hata:", error);
        }
    };

    return (
        <div className="signup-form-container bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Üye Ol</h3>
                <form className="signup-form" onSubmit={handleSignup}>
                    <div className="signup-form-element mb-4 flex items-center">
                        <FaUser className="signup-form-icon mr-2" />
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            className="signup-form-input w-full p-2 border rounded text-gray-900"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="signup-form-element mb-4 flex items-center">
                        <FaEnvelope className="signup-form-icon mr-2" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="signup-form-input w-full p-2 border rounded text-gray-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="signup-form-element mb-4 flex items-center">
                        <FaLock className="signup-form-icon mr-2" />
                        <input
                            type="password"
                            placeholder="Şifre"
                            className="signup-form-input w-full p-2 border rounded text-gray-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="signup-form-input w-full p-2 bg-blue-500 text-white rounded">
                        Üye Ol
                    </button>
                </form>
                <a href="/login" className="block text-center text-gray-500 mt-4 underline">Giriş Yap</a>
            </div>
        </div>
    );
};

export default SignupForm;
