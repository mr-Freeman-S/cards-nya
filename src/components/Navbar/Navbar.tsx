import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routingPath";

const Navbar = () => {
    const style = {
        display: 'grid',
        justifyItems: 'center',
        gridTemplateColumns: 'repeat(8,1fr)'

    }

    return (
        <div style={style}>
            <span><NavLink to={PATH.PROFILE_PAGE}>
                Profile
            </NavLink></span>
            <span><NavLink to={PATH.EDIT_PROFILE_PAGE}>
                Edit Profile
            </NavLink></span>
            <span><NavLink to={PATH.LOGIN_PAGE}>
                Login
            </NavLink></span>
            <span><NavLink to={PATH.REGISTRATION_PAGE}>
                Registration
            </NavLink></span>
            <span><NavLink to={PATH.RECOVER_PASSWORD_PAGE}>
                Recover password
            </NavLink>
            </span>
            <span><NavLink to={PATH.NEW_PASSWORD_PAGE}>
                New password
            </NavLink></span>
            <span><NavLink to={PATH.PAGE_404}>
                404
            </NavLink></span>
            <span><NavLink to={PATH.TEST}>
                Test super elements
            </NavLink></span>
            <span><NavLink to={PATH.PACK_LIST}>
                Pack List
            </NavLink></span>
        </div>
    );
};

export default Navbar;