import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth.tsx';
import UseAxiosPublic from './UseAxiosPublic.tsx';

const UseCart = () => {
    const axiosPublic = UseAxiosPublic();
    const { user } = UseAuth();

    const { data: cart = [], refetch } = useQuery({
        queryKey: ['CartProduct', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/CartProduct/${user?.email}`);
            // console.log('usecarthook',res?.data);
            return res?.data;
        }
    });

    return [cart, refetch];
};

export default UseCart;
