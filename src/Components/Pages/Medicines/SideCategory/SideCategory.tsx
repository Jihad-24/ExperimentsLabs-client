import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import UseAxiosPublic from '../../../../Hook/UseAxiosPublic.tsx';
import { useProductContext } from '../ProductContext/ProductContext.tsx';

const SideCategory = ({ filter, setFilter }) => {
    const [Products, setProducts] = useState([]);
    const { setSelectedCategory } = useProductContext();
    const AxiousPublic = UseAxiosPublic();

    const { data: ProductData = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const result = await AxiousPublic.get('/products');
            return result.data;
        }
    });

    useEffect(() => {
        if (ProductData.length > 0) {
            setProducts(ProductData);
        }
    }, [ProductData]);

    // console.log(ProductData);
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setFilter((previousValue) => ({
            ...previousValue,
            sortBy: category
        }));
    };

    return (
        <div className="flex items-stretch my-4 px-2">
            {!isLoading ? (
                <select
                    className="cursor-pointer w-full rounded-full border border-[#0360D9] focus:outline-none md:px-1 py-2 text-center text-[#0360D9]"
                    name="sortBy"
                    id="sortBy"
                    value={filter.sortBy}
                    onChange={handleCategoryChange}
                >
                    <option value="">Sort By Category</option>
                    {Array.from(new Set(Products?.map((Product) => Product.category))).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            ) : (
                <div className=" rounded-md mx-auto max-w-fit ">
                    <div className="animate-pulse">
                        {/* Product Title Skeleton */}
                        <div className=" w-[100px] lg:w-[170px] h-10 rounded-lg bg-[#9FADC2] mb-4"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideCategory;
