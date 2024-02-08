import React, { useState, useEffect } from 'react';

function BarSide() {
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    const handleOutsideClick = (e) => {
        if (!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <aside className="chat-sidebar">
            <a href="#" className="chat-sidebar-logo">
                <i className="ri-chat-1-fill"></i>
            </a>
            <ul className="chat-sidebar-menu">
                <li className="chat-sidebar-profile">
                    <button type="button" className="chat-sidebar-profile-toggle" onClick={toggleSidebar}>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" />
                    </button>
                    <ul className="chat-sidebar-profile-dropdown" onClick={toggleSidebar}>
                        <li><a href="#"><i className="ri-user-line"></i> Profile</a></li>
                        <li><a href="#"><i className="ri-logout-box-line"></i> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}
export default BarSide;