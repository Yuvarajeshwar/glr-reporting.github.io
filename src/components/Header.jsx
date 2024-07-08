import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import Tracker from './Tracker';
import GLR from '../assets/GLR.png'
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';   
import { toUpper } from 'lodash';

export default function Header(props) {
    const startContent = (
        <React.Fragment>
            <img src={GLR} />
        </React.Fragment>
    );
    
    const centerContent = (
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText placeholder="Search" />
        </IconField>
    );
    
    const role = toUpper(props?.role)

    const endContent = (
        
        <React.Fragment>
            {/* <div style={{ marginRight: "20px" }}>
                <Tracker />
            </div> */}
            {<props className="user"></props> ? (<>
                <div className="flex align-items-center gap-2">
            
            <span style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>{props?.name}, {role}</span>
            <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />

            </div></>) : <span style={{ color: '#000000' }}>Sign In</span>}
        </React.Fragment>
    );

    return (
        <div>
            <Toolbar start={startContent} center={centerContent} end={endContent} />
        </div>
    );
}



