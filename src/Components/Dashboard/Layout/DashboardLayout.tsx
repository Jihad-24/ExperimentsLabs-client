import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaHome, FaUserCircle } from 'react-icons/fa';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { GiRemedy } from 'react-icons/gi';
import { LuFileStack } from 'react-icons/lu';
import { MdOutlineNotificationsActive, MdProductionQuantityLimits } from 'react-icons/md';
import { PiDotsNineBold } from 'react-icons/pi';
import Drawer from 'react-modern-drawer';
import { Link, NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const [openLayout, setOpenLayout] = useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
    // const [isAdmin] = 'true';

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className="flex h-full relative">
            {/* Sidebar */}
            <div className={` ${openLayout ? 'xl:w-[20%]' : 'xl:w-[6%]'}  fixed h-full overflow-y-auto bg-[#0360D9] w-[0%] text-[#FFF] transition-all duration-300 `}>
                <div className={`${openLayout ? 'flex' : 'hidden'} gap-5 border-b border-white py-4 justify-around xl:text-xl 2xl:text-2xl`}>
                    <Link to="/">
                        {' '}
                        <h2 className="font-semibold">ExperimentsLabs</h2>
                    </Link>
                    <div className="p-1 border border-white rounded-full group-hover:p-3 transition-all duration-200 group cursor-pointer">
                        <MdOutlineNotificationsActive className="group-hover:scale-110  transition-all duration-200"></MdOutlineNotificationsActive>
                    </div>
                </div>
                <div className="p-4 flex gap-2 justify-center my-auto flex-col xl:text-lg 2xl:text-xl">
                    {openLayout ? (
                        <>
                            <NavLink to="/" className=" flex gap-1 items-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] p-2 rounded-2xl transition-all duration-200">
                                <FaHome className=""></FaHome> Home
                            </NavLink>
                            <NavLink to="/dashboard/profile" className=" flex gap-1 items-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] p-2 rounded-2xl transition-all duration-200">
                                <FaUserCircle /> Profile
                            </NavLink>

                            <NavLink to="/dashboard/orders" className=" flex gap-1 items-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] p-2 rounded-2xl transition-all duration-200">
                                <LuFileStack /> Orders
                            </NavLink>

                            <NavLink to="/dashboard/myorder" className=" flex gap-1 items-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] p-2 rounded-2xl transition-all duration-200">
                                <MdProductionQuantityLimits /> My Order
                            </NavLink>
                            <NavLink to="/dashboard/payment" className=" flex gap-1 items-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] p-2 rounded-2xl transition-all duration-200">
                                <FaMoneyCheckDollar />
                                My Payment's
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className=" flex justify-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] px-2 py-3 rounded-2xl transition-all duration-200">
                                <FaHome></FaHome>
                            </NavLink>
                            <NavLink to="/dashboard/profile" className=" flex justify-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] px-2 py-3 rounded-2xl transition-all duration-200">
                                <FaUserCircle />
                            </NavLink>

                            <NavLink to="/dashboard/orders" className=" flex justify-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] px-2 py-3 rounded-2xl transition-all duration-200">
                                <LuFileStack />
                            </NavLink>

                            <NavLink to="/dashboard/myorder" className=" flex justify-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] px-2 py-3 rounded-2xl transition-all duration-200">
                                <MdProductionQuantityLimits />
                            </NavLink>
                            <NavLink to="/dashboard/payment" className=" flex justify-center hover:scale-105 overflow-hidden hover:bg-[#2c7feb] px-2 py-3 rounded-2xl transition-all duration-200">
                                <MdProductionQuantityLimits />
                            </NavLink>
                        </>
                    )}

                    <div
                        onClick={() => {
                            setOpenLayout(!openLayout);
                        }}
                        className={`absolute top-[50%] p-2 border rounded-full hover:scale-110 cursor-pointer transition-all duration-200 hover:right-3 right-1 `}
                    >
                        {openLayout ? <FaArrowLeft /> : <FaArrowRight></FaArrowRight>}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`${openLayout ? 'xl:w-[80%]' : 'xl:w-[95%]'}  ml-auto h-full min-h-screen w-full bg-[#E1EEFF] text-[#021526] transition-all duration-300`}>
                <div className="p-1 md:p-4">
                    <div className="flex gap-5 items-center lg:hidden ">
                        <button className="text-3xl text-[#0360D9]" onClick={toggleDrawer}>
                            <PiDotsNineBold />
                        </button>
                        <Drawer open={isOpen} onClose={toggleDrawer} direction="left" className="bla bla bla ">
                            <div className="mx-5 mt-10 ">
                                <div className="flex items-center gap-6 text-xl font-semibold text-[#0360D9]">
                                    <h1>ExperimentsLabs</h1>
                                    <p>
                                        <MdOutlineNotificationsActive></MdOutlineNotificationsActive>
                                    </p>
                                </div>
                                <hr className="my-5 h-[2px]" />
                                <div className="flex items-center gap-6 text-lg font-semibold text-[#0360D9]">
                                    <p>
                                        <FaHome />
                                    </p>
                                    <NavLink to="/">Home</NavLink>
                                </div>
                                <div className="flex items-center gap-6 text-lg font-semibold my-2 text-[#0360D9]">
                                    <p>
                                        <FaUserCircle />
                                    </p>
                                    <NavLink to="/dashboard/profile">Profile</NavLink>
                                </div>

                                <div className="flex items-center gap-6 text-lg font-semibold my-2 text-[#0360D9]">
                                    <p>
                                        <GiRemedy />
                                    </p>
                                    <NavLink to="/dashboard/myorder">My Order</NavLink>
                                </div>
                                <div className="flex items-center gap-6 text-lg font-semibold my-2 text-[#0360D9]">
                                    <p>
                                        <LuFileStack />
                                    </p>
                                    <NavLink to="/dashboard/orders">Orders</NavLink>
                                </div>
                            </div>
                        </Drawer>
                        <h1 className="text-xl font-semibold text-[#0360D9]">Dashboard</h1>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
