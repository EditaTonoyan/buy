import './Layout.scss'
import {MemoizedSidebar} from "./sidebar/Sidebar";
import {MemoizedNavbar} from "./navbar/Navbar";

function Layout() {
    return (
        <div className='layout-wrapper'>
            <MemoizedNavbar/>
            <MemoizedSidebar/>
        </div>
    )
}

export default Layout
