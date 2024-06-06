import React, { useEffect, useState } from 'react';
import Container from '../../Shared/Container/Container.tsx';
import ShippingInfo from './ShippingInfo/ShippingInfo.tsx';
import Check from './Check/Check.tsx';
import ShippingProduct from './ShippingProducts/ShippingProducts.tsx';
import UseCart from '../../../Hook/UseCart.tsx';
import { uuidv4 } from '@firebase/util';
import Swal from 'sweetalert2';
import UseAxiosPublic from './../../../Hook/UseAxiosPublic.tsx';
import UseAuth from '../../../Hook/UseAuth.tsx';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const [AllPrice, setAllPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, refectchCart] = UseCart();
    const Axious = UseAxiosPublic();
    const [Process, setProcess] = useState(false);
    const { user } = UseAuth();
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        name: '',
        mobile: '',
        Emergency_Mobile: '',
        email: user?.email,
        Country: 'Bangladesh',
        City: '',
        Address: ''
    });

    const SubmitShippingInfor = (e) => {
        e?.preventDefault();
        const time = new Date();
        const order = {
            ...address,
            time,
            price: totalPrice,
            Products: cart,
            ID: uuidv4()
        };
        // console.log(order);
        Axious.post('/order', order).then((res) => {
            // console.log(res.data);
            refectchCart();
            Swal.fire({
                icon: 'success',
                title: 'Your order is done',
                showConfirmButton: false,
                timer: 1500
            });

            setProcess(true);
            setAddress({
                name: '',
                mobile: '',
                Emergency_Mobile: '',
                Email: '',
                Country: 'Bangladesh',
                City: '',
                Address: ''
            });
            navigate('/payment');

        });
    };

    useEffect(() => {
        let price = 0;
        for (let item of cart) {
            price += item?.Product?.price * item?.quantity;
        }

        const priceTotal = price?.toFixed(2);
        setAllPrice(priceTotal);
    }, [cart]);
    console.log('TotalPrice',totalPrice);

    return (
        <Container>
            <div className={`flex my-20 lg:flex-row flex-col w-full  gap-10`}>
                <div className="flex flex-col lg:w-[75%] w-full">
                    <h1 className="lg:text-3xl sm:text-2xl text-xl font-medium">Shipping Information</h1>

                    <div className="w-full">
                        <ShippingInfo submit={SubmitShippingInfor} address={address} setAddress={setAddress}></ShippingInfo>
                    </div>
                </div>
                <div className="lg:w-[50%] w-full mt-16 flex flex-col gap-5">
                    <ShippingProduct></ShippingProduct>
                    <Check priceData={AllPrice} setTotalPrice={setTotalPrice}></Check>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutPage;
