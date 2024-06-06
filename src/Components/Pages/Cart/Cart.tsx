import React, { useEffect, useState } from 'react';
import UseCart from '../../../Hook/UseCart.tsx';
import Container from '../../Shared/Container/Container.tsx';
import CartProducts from './CartProduct/CartProducts.tsx';
import Checkout from './Checkout/Checkout.tsx';

const Cart = () => {
    const [cartProduct, refetchCart] = UseCart();
    const [AllPrice, setAllPrice] = useState(0);
    useEffect(() => {
        let Price = 0;
        for (let item of cartProduct) {
            Price += item?.Product?.price * item?.quantity;
        }
        setAllPrice(Price?.toFixed(2));
    }, [cartProduct]);

    return (
        <Container>
            <div className="flex my-20 lg:flex-row flex-col w-full  gap-10">
                <div className="flex flex-col lg:w-[75%] w-full">
                    <h1 className="lg:text-3xl sm:text-2xl text-xl font-medium">Your Product Cart</h1>

                    <div className="w-full">
                        <CartProducts Products={cartProduct} refetchCart={refetchCart}></CartProducts>
                    </div>
                </div>
                <div className="lg:w-[25%] w-full mt-16">
                    <Checkout priceData={AllPrice}></Checkout>
                </div>
            </div>
        </Container>
    );
};

export default Cart;
