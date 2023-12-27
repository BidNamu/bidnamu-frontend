import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import BidInfo from "./pages/BidInfo";
import {Provider} from "jotai";
import SignUp from "./pages/SignUp";
import SignUpForm from "./features/Users/SignUp/SignUpForm";


const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "",
            element: <Home/>
        },
        {
            path: "sign-up",
            element: <SignUpForm/>
        },
        {
            path: "bid-info",
            element: <BidInfo/>
        },
    ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   /* <React.StrictMode>*/
        <Provider>
                <RouterProvider router={router}/>
        </Provider>
    /*</React.StrictMode>*/
);

