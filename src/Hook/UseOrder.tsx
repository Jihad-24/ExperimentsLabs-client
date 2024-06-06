import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth.tsx';
import UseAxiosPublic from './UseAxiosPublic.tsx';

const UseOrder = () => {
    const axiosPublic = UseAxiosPublic();
    const { user } = UseAuth();

    const { data: order = [], refetch } = useQuery({
        queryKey: ['order', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/order/${user?.email}`);
            // console.log('useOrderhook',res?.data[0]);
            return res?.data[0];
        }
    });

    return [order, refetch];
};

export default UseOrder;
