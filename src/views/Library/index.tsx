import { Outlet } from 'react-router-dom';

export default function Library() {
  return (
    <>
      <div>Library</div>

      {/* Outlet相当于是子路由的占位符 */}
      <Outlet></Outlet>
    </>
  )
}
