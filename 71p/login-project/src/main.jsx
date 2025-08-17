import { Component, StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './Homepage.jsx'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import NavBar from './NavBar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.jsx';
import Register from './Register.jsx';

import { PersistenceLayer } from './persistenceLayer.js';

function AppWithPersistence() {
    const persistenceLayer = useMemo(() => new PersistenceLayer(), []);
    
    const router = createBrowserRouter([
        {
            path: "/",
            Component: NavBar,
            children: [
                { index: true, element: <Homepage /> },
                { 
                    path: "/login", 
                    element: <Login persistenceLayer={persistenceLayer} />
                },
                { 
                    path: "/register", 
                    element: <Register persistenceLayer={persistenceLayer} />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppWithPersistence />
    </StrictMode>,
)
