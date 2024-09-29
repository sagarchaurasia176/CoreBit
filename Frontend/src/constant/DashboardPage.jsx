import React from 'react'
import LeftMenuBar from './Menu/LeftMenuBar'
import RightMenuBar from './Menu/RightMenuBar'

const DashboardPage = () => {
  return (
    <div className='   gap-3 h-screen bg-white  text-white  w-full md:max-w-full'>
      {/* left menu */}
      <div className=' bg-yellow-50  flex-grow-0   flex flex-row '>
        <LeftMenuBar/>
        <RightMenuBar/>
      </div>
      {/* right menu */}  

    </div>
  )
}

export default DashboardPage
