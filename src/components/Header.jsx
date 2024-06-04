import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import Tracker from './Tracker';
import GLR from '../assets/GLR.png'

export default function Header(loggedin) {
    const startContent = (
        <React.Fragment>
            <img src={GLR} />
        </React.Fragment>
    );

    const centerContent = (
        <div className="flex flex-wrap align-items-center gap-3">
            <h4 style={{ color: '#000000' }}>GLR REPORTING</h4>
        </div>
    );

    const endContent = (
        <React.Fragment>
            {/* <div style={{ marginRight: "20px" }}>
                <Tracker />
            </div> */}
            {loggedin ? (<>
                <div className="flex align-items-center gap-2">
            <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                <span style={{ color: '#000000' }}>Test User</span>
            </div></>) : <span style={{ color: '#000000' }}>Sign In</span>}
        </React.Fragment>
    );

    return (
        <div>
            <Toolbar start={startContent} center={centerContent} end={endContent} style={{ borderRadius: '3rem' }} />
        </div>
    );
}
