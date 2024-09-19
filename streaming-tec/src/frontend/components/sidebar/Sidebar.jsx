import React from 'react'
import './Sidebar.css'
import { Nav } from 'react-bootstrap'
import SidebarPag from '../sidebarPage/SidebarPage'
import { FaPhotoVideo, FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";


export default function Sidebar() {

    const pagesRoutes = ["/", "/favorite/:user", "/video/:url"]
    const pagesText = ["Home", "My List", "Video"]
    const pagesIcon = [FaPhotoVideo, MdFavorite, FaHome]

    return (
        <div className="sidebar">
            <h1>StreamingTec</h1>
            <Nav className="flex-column">
                {pagesRoutes.map((href, index) => (
                    <SidebarPag
                        key={index}
                        navLinkHref={href}
                        classNameIcon={pagesIcon[index]}
                        navLinkText={pagesText[index]} />
                ))}
            </Nav>
        </div>
    );
}