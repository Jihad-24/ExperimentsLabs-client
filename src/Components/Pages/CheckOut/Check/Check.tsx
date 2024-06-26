import React from 'react';

const Check = ({ priceData,setTotalPrice }) => {
    const Tax = 14.0;
    
    if(priceData > 0){
        const subtotal = parseFloat(priceData);
        const total = subtotal + Tax;
        const fixed = total.toFixed(2);
        setTotalPrice(fixed)
        // console.log('fixed',fixed);
    }

    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg">
                    <span>Subtotal:</span>
                    <span>${priceData}</span>
                </div>
                <div className="flex justify-between text-lg">
                    <span>Discount:</span>
                    <span className="text-[#bd1e59]">- ${'0.00'}</span>
                </div>
                <div className="flex justify-between text-lg">
                    <span>Tax:</span>
                    <span>+ ${priceData > 0 ? Tax.toFixed(2) : '0.00'}</span>
                </div>
            </div>
            <div className="flex justify-between font-semibold text-xl mb-6">
                <span>Total:</span>
                <span>${priceData > 0 ? (parseInt(priceData) + Tax).toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex items-start justify-between flex-col mb-6">
                <label className="font-semibold text-lg text-start flex justify-start  mb-2" htmlFor="coupon">
                    Have a coupon?
                </label>
                <div className="flex w-full">
                    <input
                        className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border mr-2"
                        id="coupon"
                        placeholder="Add coupon"
                    />
                    <button className="inline-flex items-center justify-center bg-[#0360D9] hover:bg-[#304b6f] text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Check;
