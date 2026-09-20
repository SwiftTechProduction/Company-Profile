import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Backendless from '../config/backendless';


const navItems = [
    { name: "Home", href: '/' },
    { name: "About Us", href: '/about' },
    { name: "Services", href: '/services' },
    { name: "Teams", href: '/teams' },
    { name: "Blogs", href: '/blogs' },
];


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // menyimpan nama user yang login
    const [userName, setUserName] = useState("");

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // mengetahui halaman sekarang
    const location = useLocation();

    // untuk pindah halaman setelah logout
    const navigate = useNavigate();


    // CEK APAKAH USER SUDAH LOGIN
    useEffect(() => {

        const checkLogin = async () => {

            try {

                const isLoggedIn =
                    await Backendless.UserService.isValidLogin();

                // kalau belum login
                if (!isLoggedIn) {
                    setUserName("");
                    return;
                }

                // ambil data user yang sedang login
                const user =
                    await Backendless.UserService.getCurrentUser(true) as any;

                setUserName(
                    user?.name ||
                    user?.email ||
                    "User"
                );

            } catch (error) {

                console.log(error);
                setUserName("");

            }

        };

        checkLogin();

    }, [location.pathname]);


    // LOGOUT
    const handleLogout = async () => {

        try {

            // hapus session login Backendless
            await Backendless.UserService.logout();

            // kosongkan nama user
            setUserName("");

            // balik ke homepage
            navigate("/");

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <nav className='fixed w-full bg-gray-50 top-0 left-0 right-0 z-50'>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-12
                lg:px-20 py-3 md:py-4 flex items-center justify-between'>


                {/* LOGO */}
                <div className='flex items-center text-xl sm:text-2xl
                    font-bold text-gray-900'>

                    <div className='w-8 h-8 sm:h-10 sm:w-10
                        flex items-center justify-center
                        rounded-full border-3 sm:border-4
                        border-pink-600 text-pink-600 mr-2'>

                        H

                    </div>

                    <span>

                        <span className='text-yellow-500'>
                            Group
                        </span>

                    </span>

                </div>


                {/* LINKS */}
                <ul className='hidden md:flex items-center gap-6 lg:gap-8
                    text-gray-700 font-medium'>

                    {navItems.map(({ name, href }) => (

                        <li key={name}>

                            <a
                                href={href}
                                className='hover:text-green-500 cursor-pointer
                                transition-colors'
                            >

                                {name}

                            </a>

                        </li>

                    ))}

                </ul>


                {/* ===================================== */}
                {/* INI BAGIAN YANG MENGGANTIKAN LOGIN */}
                {/* ===================================== */}

                <div className='hidden md:flex items-center gap-2'>

                    {userName ? (

                        <>
                            {/* kalau SUDAH login */}

                            <Link
                                to="/create-blog"
                                className='px-4 py-2 sm:px-5 sm:py-2
                                rounded-lg sm:rounded-xl
                                bg-pink-500 text-white font-medium
                                hover:bg-pink-600 transition-colors'
                            >

                                Hi, {userName}

                            </Link>


                            <button
                                onClick={handleLogout}
                                className='px-4 py-2 sm:px-5 sm:py-2
                                rounded-lg sm:rounded-xl
                                bg-gray-200 text-gray-700 font-medium
                                hover:bg-gray-300 transition-colors'
                            >

                                Logout

                            </button>

                        </>

                    ) : (

                        // kalau BELUM login

                        <Link
                            to="/login"
                            className='px-4 py-2 sm:px-5 sm:py-2
                            rounded-lg sm:rounded-xl
                            bg-pink-500 text-white font-medium
                            hover:bg-pink-600 transition-colors'
                        >

                            Login

                        </Link>

                    )}

                </div>


                {/* MENU MOBILE */}
                <div className="md:hidden">

                    <button
                        onClick={toggleMenu}
                        className="p-1 rounded-md focus:outline-none
                        focus:ring-2 focus:ring-pink-500"
                    >

                        {isMenuOpen ? (

                            <X className="w-6 h-6 text-gray-700" />

                        ) : (

                            <Menu className="w-6 h-6 text-gray-700" />

                        )}

                    </button>

                </div>

            </div>


            {/* MOBILE MENU */}

            {isMenuOpen && (

                <div className="md:hidden bg-white shadow-lg border-t
                    border-gray-200">

                    <div className="px-4 py-3 space-y-3">


                        {navItems.map(({ name, href }) => (

                            <a
                                key={name}
                                href={href}
                                className="block py-2 px-4 text-gray-700
                                hover:bg-gray-100 rounded-lg
                                hover:text-green-500 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >

                                {name}

                            </a>

                        ))}


                        <div className="pt-2">

                            {userName ? (

                                <>
                                    <Link
                                        to="/create-blog"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className="block w-full py-2
                                        rounded-lg bg-pink-500
                                        text-white font-medium
                                        hover:bg-pink-600
                                        transition-colors text-center"
                                    >

                                        Hi, {userName}

                                    </Link>


                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="block w-full py-2 mt-2
                                        rounded-lg bg-gray-200
                                        text-gray-700 font-medium
                                        hover:bg-gray-300
                                        transition-colors text-center"
                                    >

                                        Logout

                                    </button>

                                </>

                            ) : (

                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setIsMenuOpen(false)
                                    }
                                    className="block w-full py-2 rounded-lg
                                    bg-pink-500 text-white font-medium
                                    hover:bg-pink-600
                                    transition-colors text-center"
                                >

                                    Login

                                </Link>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </nav>
    )
}

export default Navbar