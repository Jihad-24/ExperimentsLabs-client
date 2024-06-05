import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer.tsx';
import Navbar from '../Shared/Navbar/Navbar.tsx';

const Layout = () => {
    return (
        <div className="overflow-hidden">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
