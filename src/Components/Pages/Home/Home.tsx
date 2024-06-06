import React from 'react';
import Products from '../Medicines/Products.tsx';
import Banner from './Banner/Banner.tsx';
import HomePoster from './HomePoster/HomePoster.tsx';
import Reviews from './Reviews/Reviews.tsx';

function Home() {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <HomePoster></HomePoster>
            <Reviews></Reviews>
        </div>
    );
}

export default Home;
