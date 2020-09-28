
import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';

import './Layout.css';

const Layout = (props) => {
    return (
        <Auxiliary>
            <div>Toolbar, sideDrawer, backDrop</div>
            <main className = 'content'>
                {props.children}
            </main>
        </Auxiliary>
    );
};

export default Layout;