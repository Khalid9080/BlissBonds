import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Common/Footer';

const Main_Layout = () => {
    return (
        <div >
            <div className='flex min-h-screen flex-col'>
             
                    <Navbar></Navbar>
                
                
                <div className='max-w-screen-2xl mx-auto flex-grow'>
                    <Outlet></Outlet>
                </div>
                
                {/* <div className='min-h-[calc(100vh-100px)]'></div> */}
                <Footer></Footer>
            </div>

        </div>
    );
};

export default Main_Layout;