'use client';

import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './LoginForm.scss';

const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    console.log("username:", username, "password:", password);

    const loginUser = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        if (!username || !password) {
            console.error('Lütfen tüm alanları doldurun.');
            return;
        }
        try {
            const formData = {
                username: username,
                password: password,
            };

            console.log('Form verileri:', formData);

            const response = await fetch("http://localhost:8080/api/authenticate", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('API yanıtı:', response);

            if (response.ok) {
                const data = await response.json();
                const userToken = data.token;
                const userId = data.id;

                console.log('Kullanıcı Token:', userToken);
                console.log('Kullanıcı ID:', userId);

                // Kullanıcı bilgilerini local storage'a kaydet
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('userToken', userToken);

                // var object1=localStorage.getItem('user',)
                console.log(localStorage.getItem('user'))
                // Profil sayfasına yönlendir
                router.push(`/profile/${userId}`);
            } else {
                const errorText = await response.text();
                console.error('Giriş başarısız:', response.statusText, 'Yanıt metni:', errorText);
            }
        } catch (error) {
            console.error("Giriş yapılırken hata:", error);
        }
    };

    return (
        <div className="login-form-container bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Film Rezervasyon</h3>
                <form className="login-form" onSubmit={loginUser}>
                    <div className="login-form-element mb-4 flex items-center">
                        <FaUser className="login-form-icon mr-2" />
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            className="login-form-input w-full p-2 border rounded text-gray-900"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="login-form-element mb-4 flex items-center">
                        <FaLock className="login-form-icon mr-2" />
                        <input
                            type="password"
                            placeholder="Şifre"
                            className="login-form-input w-full p-2 border rounded text-gray-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-form-input w-full p-2 bg-blue-500 text-white rounded">
                        Giriş Yap
                    </button>
                </form>
                <a href="/signup" className="block text-center text-gray-500 mt-4 underline">Kayıt Ol</a>
            </div>
        </div>
    );
};

export default LoginForm;
