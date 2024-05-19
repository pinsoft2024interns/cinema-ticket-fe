

import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">
                <Link href="/">Film Rezervasyon</Link>
            </h1>
            <nav>
                <Link href="/login" className="text-blue-300 hover:underline mx-2">
                    Giriş Yap
                </Link>
                <Link href="/signup" className="text-blue-300 hover:underline mx-2">
                    Üye Ol
                </Link>
            </nav>
        </header>
    );
};

export default Header;
