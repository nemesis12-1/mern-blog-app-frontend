import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from "react-hot-toast";



const MainLayout = () => {
    return (
        <>
            <main className="w-[100%] mx-auto">
                <Header />
                <Toaster position="top-center"  reverseOrder={false} />
                <Outlet />
                <Footer/>
            </main>
        </>
    )
}

export default MainLayout