import React from 'react';
import { Link } from 'react-router-dom';
import UseAuth from '../../../Hook/UseAuth.tsx';
import DrawerRoute from './DrawerRoute.tsx';
import Container from '../Container/Container.tsx';

import { FaCartPlus } from 'react-icons/fa';
import UseCart from '../../../Hook/UseCart.tsx';

const Navbar = () => {
    const { user, logoutUser } = UseAuth();
    const [cart] = UseCart();

    const handleLogOut = () => {
        logoutUser()
            .then(() => console.log('You logged out successfully'))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <header className="px-2 py-7  bg-[#E1EEFF] ">
                <Container>
                    <div className=" flex items-center justify-between  h-16 ">
                        <div className="flex justify-start items-center">
                            <DrawerRoute></DrawerRoute>
                            <div className="justify-start flex">
                                <Link to="/">
                                    {' '}
                                    <img className="lg:w-[80px] w-[80px] ml-0 " src="/logo.svg" alt="" />
                                </Link>
                            </div>
                        </div>

                        <ul className=" hidden space-x-3 lg:flex">
                            <Link to={'/'}>
                                <li className="flex">
                                    <p className="flex items-center px-4 -mb-1 text-xl hover:text-[#0360D9] hover:underline ">Home</p>
                                </li>
                            </Link>
                            <Link to={'/Products'}>
                                <li className="flex">
                                    <p className="flex items-center px-4 -mb-1 text-xl hover:text-[#0360D9] hover:underline ">Products</p>
                                </li>
                            </Link>
                        </ul>

                        <div className=" flex items-center  justify-end gap-5  ">
                            <Link to="/cart">
                                <div className="relative cursor-pointer">
                                    <FaCartPlus className="text-2xl cursor-pointer " />
                                    <p className="absolute -top-4 -right-2 p-1 bg-[#0360D9] rounded-full text-white text-[12px]">{cart?.length}</p>
                                </div>
                            </Link>

                            {user ? (
                                <>
                                    <div className="dropdown  dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img className="rounded-full w-7 lg:w-14" src={user?.photoURL} alt="" />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                            <Link to={'/dashboard/profile'}>
                                                <li>
                                                    <p className="justify-between">Profile</p>
                                                </li>
                                            </Link>
                                            <Link to={'/dashboard/profile'}>
                                                <li>
                                                    <p>DashBoard</p>
                                                </li>
                                            </Link>

                                            <li>
                                                {' '}
                                                <p onClick={handleLogOut}>Log Out</p>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <div className="flex gap-3">
                                    <Link
                                        to="/login"
                                        className=" rounded-full lg:px-10 p-1 font-semibold lg:text-xl bg-[#E1EEFF] hover:bg-[#0360D9] text-[#0360D9] hover:text-white border-2 border-[#0360D9]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className=" rounded-full lg:px-10 p-1 font-semibold lg:text-xl bg-[#E1EEFF] hover:bg-[#0360D9] text-[#0360D9] hover:text-white border-2 border-[#0360D9]"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </header>
        </div>
    );
};

export default Navbar;
