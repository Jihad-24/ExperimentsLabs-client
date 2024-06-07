import React from 'react';

const MyPaymentRow = ({ payment }) => {
    const { transctionId, email, price, status } = payment;

    return (
        <>
            <tr className="bg-[#FFFFFF] hover:bg-[#fafafa7e]">
                <td className="border-t px-6 py-4  ">{transctionId}</td>
                <td className="border-t px-6 py-4  ">{email}</td>
                <td className="border-t px-6 py-4 text-center font-medium">
                    ${price} 
                </td>
                <td className="border-t px-6 py-4 text-center">{status}</td>
            </tr>
        </>
    );
};

export default MyPaymentRow;
