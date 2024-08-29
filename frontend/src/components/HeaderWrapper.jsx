import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderComponent from "./HeaderComponent";

const HeaderWrapper = ({ children }) => {
    const location = useLocation();
    const hideHeaderPaths = ['/login', '/signup', '/signin'];

    return (
        <>
            {!hideHeaderPaths.includes(location.pathname) && <HeaderComponent />}
            {children}
        </>
    );
};

export default HeaderWrapper;
