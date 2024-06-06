import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './Components/Dashboard/Layout/DashboardLayout.tsx';
import MyOrder from './Components/Dashboard/Pages/MyOrder/MyOrder.tsx';
import Orders from './Components/Dashboard/Pages/Orders/Orders.jsx';
import Profile from './Components/Dashboard/Pages/Profile/Profile.tsx';
import Layout from './Components/Layout/Layout.tsx';
import Cart from './Components/Pages/Cart/Cart.tsx';
import CheckoutPage from './Components/Pages/CheckOut/CheckoutPage.tsx';
import Home from './Components/Pages/Home/Home.tsx';
import Login from './Components/Pages/Login/Login.tsx';
import Register from './Components/Pages/Register/Register.tsx';
import PrivateRoute from './Components/Route/PrivateRoute.tsx';
import AuthProvider from './Providers/AuthProvider/AuthProvider.tsx';
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './Components/Pages/Medicines/ProductContext/ProductContext.tsx';
import Products from './Components/Pages/Medicines/Products.tsx';
import MedWishList from './Components/Pages/Medicines/ProductItem/ProductWishList.tsx';
import Payment from './Components/Pages/Payment/Payment.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/Products',
                element: <Products></Products>
            },
            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: '/wishlist',
                element: <MedWishList></MedWishList>
            },
            {
                path: '/checkout',
                element: <CheckoutPage></CheckoutPage>
            },
            {
                path: '/payment',
                element: <Payment></Payment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                path: '/dashboard/profile',
                element: <Profile></Profile>
            },
            {
                path: '/dashboard/orders',
                element: <Orders />
            },
            {
                path: '/dashboard/myorder',
                element: <MyOrder></MyOrder>
            }
        ]
    }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ProductProvider>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        <div className="bg-[#EEF2FB]">
                            <RouterProvider router={router} />
                        </div>
                    </QueryClientProvider>
                </AuthProvider>
            </ProductProvider>
        </React.StrictMode>
    );
} else {
    // handle the case when the element with id 'root' is not found
    render(<div>Root elemeent Not found</div>, document.body);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
