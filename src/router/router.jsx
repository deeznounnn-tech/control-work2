import { createBrowserRouter } from "react-router-dom";

import Header from "../components/Header";

import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";
import FavoritesPage from "../pages/FavoritesPage";
import LoginPage from "../pages/LoginPage";

import OrderForm from "../components/OrderForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "product/:id",
                element: <ProductPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "checkout",
                element: <OrderForm />,
            },
            {
                path: "orders",
                element: <OrdersPage />,
            },
            {
                path: "favorites",
                element: <FavoritesPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
        ],
    },
]);