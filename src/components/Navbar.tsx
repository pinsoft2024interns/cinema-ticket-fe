import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [profileId, setProfileId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                try {
                    const userObj = JSON.parse(user);
                    setProfileId(userObj.id);
                } catch (error) {
                    console.error('Error parsing user from localStorage', error);
                }
            }
        }
    }, []);

    return (
        <nav>
            <Link href="/login" className="text-blue-300 hover:underline mx-2">
                Giriş Yap
            </Link>
            <Link href="/signup" className="text-blue-300 hover:underline mx-2">
                Üye Ol
            </Link>
            {profileId && (
                <Link href={`/profile/${profileId}`} className="text-blue-300 hover:underline mx-2">
                    Profil
                </Link>
            )}
        </nav>
    );
};

export default Navbar;
