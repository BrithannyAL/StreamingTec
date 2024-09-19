import React from 'react'
import { Nav } from 'react-bootstrap';
import './SidebarPage.css'

export default function SidebarPag({ navLinkHref, classNameIcon: Icon, navLinkText}) {
    return (
        <>
            <Nav.Link href={navLinkHref}>
                <Icon className="sidebar-icon" /> {navLinkText}
            </Nav.Link>
        </>
    );
}