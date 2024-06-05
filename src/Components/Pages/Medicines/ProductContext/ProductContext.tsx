import { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

export const useProductContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    return <ProductContext.Provider value={{ selectedCategory, setSelectedCategory }}>{children}</ProductContext.Provider>;
};
