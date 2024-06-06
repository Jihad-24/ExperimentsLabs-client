import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hook/UseAuth.tsx';
import UseAxiosPublic from '../../../Hook/UseAxiosPublic.tsx';
import UseCart from '../../../Hook/UseCart.tsx';

const CheckoutForm = ({ selectedItem }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [transctionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = UseAxiosPublic();
    const { user } = UseAuth();
    const totalPrice = parseInt(selectedItem.price);
    const [, refetchCart] = UseCart();
    // console.log(totalPrice);
    // console.log(user?.email);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosPublic.post('/create-payment-intent', { price: totalPrice }).then((res) => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [axiosPublic, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
        } else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transctionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: selectedItem._id,
                    status: 'paid'
                };

                const res = await axiosPublic.post('/payments', payment);
                // console.log('payment saved', res.data);
                try {
                    axiosPublic.delete(`/deleteFullCart/${user?.email}`).then((res) => {
                        refetchCart();
                    });
                } catch (error) {
                    console.error('Error deleting cart:', error);
                }

                if (res.data?.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'payment successfull',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/cart');
                }
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4'
                                }
                            },
                            invalid: {
                                color: '#9e2146'
                            }
                        }
                    }}
                />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transctionId && (
                    <p className="text-green-600">
                        Your transction id:
                        {transctionId}
                    </p>
                )}
            </form>
        </div>
    );
};
CheckoutForm.propTypes = {
    selectedItem: PropTypes.object
};

export default CheckoutForm;
