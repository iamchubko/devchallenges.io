import React from 'react';
import './Nav.css';

export default function Nav() {
    return (
        <nav>
            <div className={'logo'}><span>Dev</span>challenges.io</div>
            <ul className={'nav-bar'}>
                <li className={'nav-bar__item'}>Buttons</li>
            </ul>
        </nav>
    );
}