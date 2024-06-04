

import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">
                <Link style={{color:"white"}} href="/">Sinemalar</Link>
            </h1>
            <nav>
                <Link href="/login" className="text-blue-300 hover:underline mx-2">Login </Link>

                <Link href="/signup" className="text-blue-300 hover:underline mx-2"> Signup </Link>

                <Link href={`/profile/${JSON.parse(localStorage.getItem("user") as string).id}`} className="text-blue-300 hover:underline mx-2">
                    Profil
                </Link>
            </nav>
        </header>
    );
};

export default Header;
