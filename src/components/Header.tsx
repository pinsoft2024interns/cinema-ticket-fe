import Link from 'next/link';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">
                <Link href="/">Film Rezervasyon</Link>
            </h1>
            <Navbar />
        </header>
    );
};

export default Header;
