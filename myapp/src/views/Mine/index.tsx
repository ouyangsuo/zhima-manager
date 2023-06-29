import { Outlet } from 'react-router-dom';

export default function Mine() {
    return (
        <>
            <div>Mine</div>
            
            {/* Outlet相当于是子路由的占位符 */}
            <Outlet></Outlet>
        </>
    )
}
