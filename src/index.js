import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import {Provider} from "jotai";
import SignUp from "./pages/SignUp";
import CreateAuction from "./pages/CreateAuction";


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
            element: <SignUp/>
        },
        {
            path: "create-action",
            element: <CreateAuction/>
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

