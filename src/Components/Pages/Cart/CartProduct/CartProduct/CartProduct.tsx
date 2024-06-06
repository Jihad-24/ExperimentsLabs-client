import React from 'react';
import { FiMinus } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import UseAxiosPublic from '../../../../../Hook/UseAxiosPublic.tsx';
const CartProduct = ({ Product, refetchCart }) => {
    const { name, image, price, category, company, _id } = Product?.Product;
    const AxiousPublic = UseAxiosPublic();
    // console.log(Product);
    const handleRemove = (id) => {
        console.log(id);
        AxiousPublic.delete(`/CartProduct/${id}`)
            .then((res) => {
                // console.log(res?.data);
                if (res?.data?.deletedCount > 0) {
                    refetchCart();
                } else {
                    console.error('Failed to delete the cart item.');
                }
            })
            .catch((error) => {
                console.error('An error occurred while deleting the cart item:', error);
            });
    };

    const UpdateQuantity = (way, id) => {
        let final = Product?.quantity;
        if (way === 'add') {
            final = final + 1;
        } else if (way === 'minus') {
            final -= 1;
        }
        AxiousPublic.put(`/updateQuantity/${id}`, { quantity: final }).then((res) => {
            console.log(res.data);
            refetchCart();
        });
    };

    return (
        <li className="flex flex-col md:flex-row justify-between items-start gap-4 py-4 border-b border-gray-300">
            <div className="flex flex-row items-center gap-8 sm:min-w-[500px] space-y-4 md:space-y-0 md:space-x-4">
                <img alt={name} className="w-16 h-16 bg-gray-200 rounded object-cover" src={image} />
                <div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">{name}</h3>
                    <p className="md:text-sm sm:text-[14px] text-[12px]  text-gray-600">Category: {category}</p>
                    <p className="md:text-sm sm:text-[14px] text-[12px] text-gray-600">Seller: {company}</p>
                    <div onClick={() => handleRemove(Product?._id)} className="flex space-x-2 mt-3">
                        <button className="md:px-4 px-2 md:py-2 py-1 md:text-sm sm:text-[14px] text-[12px] bg-red-600 hover:scale-110 scale-100 rounded transition-all duration-200 text-white text-sm">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center  md:text-xl sm:text-lg text-sm ">
                    {Product?.quantity === 1 ? (
                        <>
                            <div className="px-2 bg-red-300 text-white  rounded-full py-2 text-[12px]">
                                <FiMinus />
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                onClick={() => {
                                    UpdateQuantity('minus', Product?._id);
                                }}
                                className="px-2 bg-red-500 text-white cursor-pointer rounded-full py-2 text-[12px]"
                            >
                                <FiMinus />
                            </div>
                        </>
                    )}

                    <span className="text-lg md:text-xl">{Product?.quantity}</span>
                    <div
                        onClick={() => {
                            UpdateQuantity('add', Product?._id);
                        }}
                        className="px-2 bg-[#0360D9] cursor-pointer text-white rounded-full py-2 text-[12px]"
                    >
                        <IoMdAdd />
                    </div>
                </div>
                <div className="text-right ">
                    <p className="text-lg font-semibold">${price * Product?.quantity}</p>
                </div>
            </div>
        </li>
    );
};

export default CartProduct;
