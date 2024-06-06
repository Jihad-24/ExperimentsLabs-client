import React from 'react';

const ShippingProduct = ({ item }) => {
    const { name, image, price, category, company, _id } = item?.Product;
    return (
        <div key={item._id} className="flex justify-between items-center">
            <div className="flex gap-1 items-end">
                <div className="w-[50px]">
                    <img className="w-full" src={image} alt="" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[15px] font-medium"> {name}</h2>
                    <h2 className="text-[12px]"> {company}</h2>
                </div>
            </div>

            <div className="sm:text-lg text-base ">
                {item?.quantity} x {price}
            </div>
        </div>
    );
};

export default ShippingProduct;
