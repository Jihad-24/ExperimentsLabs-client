import { uuidv4 } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAuth from '../../../../Hook/UseAuth.tsx';
import UseAxiosPublic from '../../../../Hook/UseAxiosPublic.tsx';
import UseCart from '../../../../Hook/UseCart.tsx';
import Cart from '../../../../assets/Icons/Cart.tsx';
import LoveFill from '../../../../assets/Icons/LoveFill.tsx';
import LoveLine from '../../../../assets/Icons/LoveLine.tsx';
import { useProductContext } from '../ProductContext/ProductContext.tsx';

const ProductItem = ({ filter }) => {
    const { user } = UseAuth();
    const [Product, setProduct] = useState([]);
    const [, refetch] = UseCart();
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [priceRange, setPriceRange] = useState(90);
    // const [isLoading, setISLoading] = useState(false);
    const { selectedCategory } = useProductContext();
    const AxiousPublic = UseAxiosPublic();
    // console.log(Product);
    const [visibleProducts, setVisibleProducts] = useState(6);

    const handleShowMore = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 6);
    };

    const handlePriceChange = (event) => {
        setPriceRange(event.target.value);
    };

    useEffect(() => {
        const rangeProduct = Product?.filter((item) => item?.Price <= priceRange);
        // console.log(rangeProduct);
        setProduct(rangeProduct);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceRange]);
    // console.log(priceRange);
    const handleToggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((ProductId) => ProductId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const { data: ProductData = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const result = await AxiousPublic.get('/products');
            return result.data;
        }
    });

    useEffect(() => {
        if (ProductData.length > 0) {
            setProduct(ProductData);
        }
    }, [ProductData]);

    useEffect(() => {
        const debounceFilter = setTimeout(() => {
            let tempFilteredProduct = [...Product];
            if (filter.keyword) {
                tempFilteredProduct = tempFilteredProduct?.filter((item) => item.name.toLowerCase().includes(filter.keyword.toLowerCase()));
            }
            if (selectedCategory) {
                tempFilteredProduct = tempFilteredProduct?.filter((item) => item.category === selectedCategory);
            }

            if (filter.sortBy === 'price_asc') {
                tempFilteredProduct = tempFilteredProduct?.sort((a, b) => a.Price - b.Price);
            } else if (filter.sortBy === 'price_desc') {
                tempFilteredProduct = tempFilteredProduct?.sort((a, b) => b.Price - a.Price);
            }

            setFilteredProduct(tempFilteredProduct);
        }, 600);
        return () => clearTimeout(debounceFilter);
    }, [filter, Product, selectedCategory]);

    const handleAddtoCart = (item) => {
        const cartItem = {
            ProductId: item?.id,
            OrderId: uuidv4(),
            email: user?.email,
            Product: item,
            quantity: 1
        };
        AxiousPublic.post('/CartProduct', cartItem)
            .then((res) => {
                // console.log(res.data);
                if (res.data) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Product added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isFavorite = (id) => favorites.includes(id);

    return (
        <>
            <div className="mx-2 space-y-2 mb-5 -mt-2 mr-5">
                <h1 className="text-xl font-bold text-center text-[#0360D9]">Set Price Range</h1>
                <input className="w-full range range-xs md:range-sm range-primary" type="range" value={priceRange} onChange={handlePriceChange} max={90} min={0} step={15} />
                <div className="w-full flex justify-between">
                    <span></span>
                    {[25, 50, 75, 100, 150, 200].map((step) => (
                        <span key={step} className="text-[#021526] text-xs font-bold hover:text-[#0360D9]">
                            ${step}
                        </span>
                    ))}
                </div>
            </div>
            {!isLoading ? (
                <>
                <div className="container mx-auto grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3">
                   {filteredProduct?.slice(0, visibleProducts).map((Product) => (
                <div className="space-y-3 " key={Product?._id}>
                    <div className="flex items-center justify-center rounded-md border border-[#0360D9]/30 bg-white p-4">
                        <Link to={`/detailsMed/${Product._id}`}>
                            <img className="max-w-[144px] h-40" src={Product?.image} alt={Product?.name} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <div className="space-y-3 pl-2">
                            <h4 className="text-lg font-bold lg:text-xl">{Product?.name}</h4>
                            <p className="text-xs lg:text-sm flex gap-2">
                                <input type="checkbox" checked readOnly />
                                By : <span>{Product?.company}</span>
                            </p>
                            <p className="text-xs lg:text-sm flex gap-2">
                                <input type="checkbox" checked readOnly />
                                Category : <span>{Product?.category}</span>
                            </p>
                            <p className="text-sm mt-2 flex items-center cursor-pointer hover:text-[#0360D9] hover:bg-white hover:rounded-xl hover:px-5">
                                <svg viewBox="0 0 1024 1024" className="icon w-6 h-6 hover:bg-white" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M531.8 385v483.3h0.1V385h-0.1z" fill="#343535"></path>
                                        <path
                                            d="M670.9 497.1h86v16h-86zM670.9 625.1h86v16h-86zM233.9 241.1h86v16h-86zM384 241.1h86v16h-86zM233.9 369h86v16h-86zM384 369h86v16h-86zM234 497.5h86v16h-86zM384 497.2h86v16h-86z"
                                            fill="#39393A"
                                        ></path>
                                        <path
                                            d="M398.3 704.4c-11.9-11.9-28.4-19.3-46.5-19.3-36.2 0-65.8 29.6-65.8 65.8v117.4h20V750.9c0-12.2 4.8-23.6 13.5-32.3 8.7-8.7 20.2-13.5 32.3-13.5 12.2 0 23.6 4.8 32.3 13.5 8.7 8.7 13.5 20.2 13.5 32.3v117.4h20V750.9c0-18.1-7.4-34.5-19.3-46.5z"
                                            fill="#E73B37"
                                        ></path>
                                        <path d="M575.8 429v437.9h0.1V429h-0.1zM286.2 868.3h131.6-131.6z" fill="#343535"></path>
                                        <path
                                            d="M896 868.3V385H575.9V111.6H128v756.7H64v44h896v-44h-64z m-364.1 0H172V155.6h359.9v712.7z m320.1-1.5H575.8V429H852v437.8z"
                                            fill="#39393A"
                                        ></path>
                                    </g>
                                </svg>{' '}
                                : {Product.company}
                            </p>

                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold lg:text-xl">Price : ${Product?.price}</h4>
                            </div>
                        </div>
                        <div className="flex gap-3 text-xs lg:text-sm justify-between md:px-2">
                            <button
                                className="flex min-w-[132px] items-center justify-center gap-1 rounded-md bg-[#0360D9] py-1.5 text-white transition-all hover:opacity-80 lg:py-1.5"
                                onClick={() => handleAddtoCart(Product)}
                            >
                                <Cart />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => handleToggleFavorite(Product?._id)}
                                className={`flex min-w-[132px] items-center justify-center gap-1 rounded-md ${
                                    isFavorite(Product?._id) ? 'bg-[#DC2954]/[14%] text-[#0360D9] hover:bg-[#DC2954]/[24%]' : 'bg-[#0360D9]/[14%] text-[#1C4336] hover:bg-[#0360D9]/[24%]'
                                } py-1.5 transition-all lg:py-1.5`}
                            >
                                {isFavorite(Product?._id) ? <LoveFill /> : <LoveLine />}
                                Favourite
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            
                </div>
                {visibleProducts < filteredProduct.length && (
                <div className="flex justify-center mt-16 mb-5">
                    <button
                        className="rounded-md bg-[#0360D9] py-2 px-4 text-white transition-all hover:opacity-80 "
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                </div>
            )}
                </>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="w-[400px] md:w-[300px] bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse">
                            <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                                <div className="flex gap-1">
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between items-center font-medium">
                                <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                                <div className="h-10 w-24  bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="w-[400px] md:w-[300px] bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse hidden md:block">
                            <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                                <div className="flex gap-1">
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between items-center font-medium">
                                <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                                <div className="h-10 w-24  bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="w-[400px] md:w-[300px] bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse hidden lg:block">
                            <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                                <div className="flex gap-1">
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between items-center font-medium">
                                <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                                <div className="h-10 w-24  bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 gap-6">
                        <div className="w-[400px] md:w-[300px] bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse">
                            <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                                <div className="flex gap-1">
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between items-center font-medium">
                                <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                                <div className="h-10 w-24  bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="w-[400px] md:w-[300px] bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse hidden md:block">
                            <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                                <div className="flex gap-1">
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between items-center font-medium">
                                <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                                <div className="h-10 w-24  bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="w-[400px] md:w-[300px] bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse hidden lg:block">
                            <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                                <div className="flex gap-1">
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between items-center font-medium">
                                <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                                <div className="h-10 w-24  bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductItem;
