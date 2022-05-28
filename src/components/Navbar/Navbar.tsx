import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routingPath";

const Navbar = () => {
    const style = {
        display:'block',
        marginBlock:'25px'
    }
    return (
        <ul style={style}>
            <li><NavLink to={PATH.PROFILE_PAGE}>
                Profile
            </NavLink></li>
            <li><NavLink to={PATH.EDIT_PROFILE_PAGE}>
                Edit Profile
            </NavLink></li>
            <li><NavLink to={PATH.LOGIN_PAGE}>
                Login
            </NavLink></li>
            <li><NavLink to={PATH.REGISTRATION_PAGE}>
                Registration
            </NavLink></li>
            <li><NavLink to={PATH.RECOVER_PASSWORD_PAGE}>
                Recover password
            </NavLink>
            </li><li><NavLink to={PATH.NEW_PASSWORD_PAGE}>
                New password
            </NavLink></li>
            <li><NavLink to={PATH.PAGE_404}>
                404
            </NavLink></li>
            <li><NavLink to={PATH.TEST}>
                Test super elements
            </NavLink></li>
        </ul>
    );
};

export default Navbar;