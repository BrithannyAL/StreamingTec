import React from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

export default function Layout() {
    return (
        <div className='layout'>
            <Sidebar />
            <main style={{backgroundColor: '#1f2226'}} className='content'>
                <Outlet/>
            </main>
        </div>
    )
}