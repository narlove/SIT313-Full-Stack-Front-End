import { Component, StrictMode } from 'react'
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
import Post from './Post.jsx';
import FindQuestion from './FindQuestion.jsx';

import { PersistenceProvider } from './PersistenceContext.jsx';
import { UserProvider } from './UserContext.jsx';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: NavBar,
            children: [
                { index: true, element: <Homepage /> },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                {
                    path: "/post",
                    element: <Post />
                },
                {
                    path: "/findQuestion",
                    element: <FindQuestion />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <PersistenceProvider>
                <App />
            </PersistenceProvider>
        </UserProvider>
    </StrictMode>,
)
