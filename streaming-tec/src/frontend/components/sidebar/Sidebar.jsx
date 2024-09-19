import React from 'react'
import './Sidebar.css'
import { Nav } from 'react-bootstrap'
import SidebarPag from '../sidebarPage/SidebarPage'
import { FaHome, FaMusic } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { GiPopcorn } from "react-icons/gi";


export default function Sidebar() {

    const pagesRoutes = ["/", "/series", "/audios", "/favorite/:user"]
    const pagesText = ["Home", "Series", "Music", "My List",]
    const pagesIcon = [FaHome, GiPopcorn, FaMusic, MdFavorite]

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