import React from 'react'
import {Outlet} from 'react-router-dom'
import BannerMenu from './BannerMenu'

const DashLayout = () => {
  return (
    <React.Fragment>
    <div className='body__container'>
        <BannerMenu />
        <Outlet />
    </div>
    </React.Fragment>
  )
}

export default DashLayout