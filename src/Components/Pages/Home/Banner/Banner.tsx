import React from 'react';
import Container from '../../../Shared/Container/Container.tsx';

const Banner = () => {
    return (
        <div className="mb-[110px] bg-[#E1EEFF]">
            <Container>
                <div className="lg:flex justify-around relative items-center  gap-5">
                    <div className="px-1 md:px-5 lg:px-0 pb-5">
                        <h1 className="lg:text-6xl mb-3 text-3xl font-bold">
                            Find & Search Your <br />
                            <span className="text-[#0360D9]">Constituent</span> Product
                        </h1>
                        <p className="mb-5">
                            {' '}
                            ExperimentsLabs is one of the largest e home decor store that provides Products on prescription & <br /> OTC. Order Product online & get fastest delivery in your city.
                        </p>
                        <div className="flex gap-1 md:gap-6">
                            <button  className="btn bg-[#0360D9] hover:bg-[#0360D9] text-white">
                                Contact Us
                            </button>

                        </div>
                    </div>

                    <div className='pb-5'>
                        <img className=" w-[798px]  h-auto border border-[#0360D9] rounded-md" src="/Asset/Banner/istockphoto-1190440285-612x612.jpg" alt="" />
                    </div>
                </div>
            </Container>
            <div className="bg-[#0360D9]">
                <Container>
                    <div className=" z-10 -bottom-[110px] py-4  lg:px-[120px] flex  justify-start px-3  gap-10  text-white w-full">
                        <div>
                            <h1 className="lg:text-6xl text-xl font-bold">24/7 </h1>
                            <p>Online Support</p>
                        </div>
                        <div>
                            <h1 className="lg:text-6xl text-xl font-bold">100+ </h1>
                            <p>Home Decor</p>
                        </div>

                        <div>
                            <h1 className="lg:text-6xl text-xl font-bold">1M+</h1>
                            <p>Active Order's</p>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Banner;
