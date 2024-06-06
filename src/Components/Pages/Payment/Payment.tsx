import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import UseOrder from '../../../Hook/UseOrder.tsx';
import CheckoutForm from './CheckoutForm.tsx';

const stripePromise = loadStripe('pk_test_51OESIIAeh5T4QBVZK0MTo3KbKkiIkkG2bYVnd2rdEHQ4i8Ty0t2OSHVO80rEkCyKLjY6WxoSmeb7XIRaYmyfyMJH005huFgbK4');
const Payment = () => {
    const [order] = UseOrder();
    // console.log('order', order);
    return (
        <div>
            <div className="">
                <div className="divider"></div>
                <h1 className="text-center text-2xl md:text-4xl font-bold my-2">Pay Now </h1>
                <div className="divider"></div>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm selectedItem={order}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
