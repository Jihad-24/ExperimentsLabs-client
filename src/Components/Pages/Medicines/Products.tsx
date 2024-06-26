import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Container from '../../Shared/Container/Container.tsx';
import SideSearch from './SideSearch/SideSearch.tsx';
import SideCategory from './SideCategory/SideCategory.tsx';
import SideContent from './SideContent/SideContent.tsx';
import ProductItem from './ProductItem/ProductItem.tsx';

const Products = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState({
        keyword: '',
        sortBy: ''
    });
    // console.log(filter);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    return (
        <Container>
            <div className="grid grid-cols-12 my-10">
                <div className="col-span-12 block md:hidden">
                    <div className="flex justify-between items-center pb-6  px-2">
                        <button onClick={toggleDrawer} className="w-36 h-14 border-2 border-sky-300 text-sky-800 font-black rounded-full hover:text-white duration-300 relative group">
                            <span className="absolute w-12 group-hover:w-[88%] duration-300 flex group-hover:justify-start rounded-full inset-2 bg-sky-300 group-hover:bg-sky-500 group-hover:duration-500 -z-10"></span>
                            Filter
                        </button>
                        <SideSearch filter={filter} setFilter={setFilter} />
                    </div>
                    <Drawer open={isOpen} onClose={toggleDrawer} direction="left" className="bla bla bla">
                        <SideSearch filter={filter} setFilter={setFilter} />
                        <SideCategory filter={filter} setFilter={setFilter} />
                        <SideContent filter={filter} setFilter={setFilter} />
                    </Drawer>
                    <div>
                        <ProductItem filter={filter} setFilter={setFilter} />
                    </div>
                </div>
                <div className="col-span-2 hidden md:block border-r-2 border-gray-300">
                    <SideSearch filter={filter} setFilter={setFilter} />
                    <SideCategory filter={filter} setFilter={setFilter} />
                    <SideContent filter={filter} setFilter={setFilter} />
                </div>
                <div className=" col-span-10 mx-6 hidden md:block">
                    <ProductItem filter={filter} setFilter={setFilter} />
                </div>
            </div>
        </Container>
    );
};

export default Products;
