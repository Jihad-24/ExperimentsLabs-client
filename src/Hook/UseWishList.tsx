import React from 'react';
import UseAuth from './UseAuth.tsx';
import UseAxiosPublic from './UseAxiosPublic.tsx';
import { useQuery } from '@tanstack/react-query';

const UseWishList = () => {
    const axiosPublic = UseAxiosPublic();
    const { user } = UseAuth();

    const { data: wishList = [], refetch } = useQuery({
        queryKey: ['Products', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Products?email=${user?.email}`);
            return res.data;
        }
    });

    return [wishList, refetch];
};

export default UseWishList;
