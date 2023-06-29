import { Outlet } from 'react-router-dom';

export default function () {
  return (
    <>
      {/* <div>Interview</div> */}
      
      {/* Outlet相当于是子路由的占位符 */}
      <Outlet></Outlet>
    </>
  )
}
