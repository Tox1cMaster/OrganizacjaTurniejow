import React from 'react'
import userAvatar from '../assets/defaultavatar.png'
import game1 from '../assets/gra1.jpg'



export const UserAccount = () => {
  return (
    <div className="flex min-h-screen bg-indigo-950">
      <div className="bg-indigo-500 xs:w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 text-center">
        <h2 className="xs:text-md md:text-2xl text-white font-semibold mb-4 mt-5">Panel Użytkownika</h2>
        <ul className='xs:text-center'>
          <li className="xs:text-sm xs:text-center break-words mb-4">
            Statystyki
          </li>
          <li className="xs:text-sm mb-4">
            Turnieje 
          </li>
        </ul>
      </div>

      <div className="flex-1 xs:pr-4 pr-10 pt-0 overflow-auto scrollbar-hide ">
  
      </div>
      </div>
  )
}
const ProfileInfo = () => {
    return (
        <div className="container xs:mt-12 xs:text-center">
        <h1 className='text-white font-bold xs:mt-0 xs:text-xl md:text-5xl text-center'>Profil użytkownika</h1>
        <div className="flex justify-center items-center mb-5 mt-5 xs:flex-wrap">
          <img className='xs:w-16 xs:h-16 sm:h-28 sm:w-28 rounded-full xs:mt-0 ml-10 mb-3 mr-5' src={userAvatar} alt="123" />
          <h2 className='text-white text-2xl'>asdasd</h2>
        </div>
        <div className='flex justify-center text-white xs:flex-wrap'>
          <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
            <p className='xs:text-4xl sm:text-6xl mb-4 mt-4 '>2</p>
            <p className='xs:text-sm  sm:text-md font-bold '>Turnieje zorganizowane</p>
          </div>
          <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
            <p className='xs:text-4xl sm:text-6xl mb-4 mt-4'>3</p>
            <p className='xs:text-sm xs:px-2 font-bold'>Mecze zagrane</p>
          </div>
          <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
            <p className='xs:text-4xl sm:text-6xl mb-4 mt-4'>5</p>
            <p className='xs:text-sm xs:px-2 font-bold'>Udział w turniejach</p>
          </div>
          <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
            <p className='xs:text-4xl sm:text-6xl mb-4 mt-4'>11</p>
            <p className='xs:text-sm xs:px-2 font-bold'>Turnieje wygrane</p>
          </div>
        </div>
        <h2 className='text-white font-bold mt-3 xs:mt-0 xs:text-xl md:text-5xl'>Ulubione gry</h2>
    
        {/* Ma wyświetlać tylko top4 gry w których użytkownik ma zagrane jak najwięcej meczy */}
        <div className='flex justify-center text-white xs:flex-wrap'>
            <div className='box-content flex flex-col xs:h-32 xs:w-32 sm:h-40 sm:w-60 mt-5 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
            <p className='h-1/4 flex items-center justify-center xs:text-sm text-xl font-bold'>Nazwa gry</p>
            <img className='h-3/4 object-cover' src={game1} alt="gra1" />
            </div>
            
        </div>
      </div>
  )
}

const UserTournament = () => {
    return (
    <div className="container xs:mt-12 xs:text-center sm:text-left">
      <div className=" flex md:justify-between items-center xs:justify-center xs:flex-wrap md:mb-3 xs:mb-5 xs:flex-col md:flex-row ">
        <h1 className='text-white text-5xl xs:mb-10'>Turnieje użytkownika nazwaużytkownika</h1>
      </div>
      <ul className="space-y-4">
            <li  className="border bg-white border-gray-300 rounded-lg p-4 shadow-sm mb-2">
              <div className="flex sm:justify-between xs:justify-center xs:flex-col xs:flex-wrap md:flex-row items-center sm:text-center md:text-left">
                <h3 className="text-lg font-semibold">Nazwa turnieju:
                  <p className='font-bold text-2xl xs:mb-3'>asdsadasd</p>
                </h3>
                <div className="text-sm font-medium text-gray-600 w-36 ">Status:
                <p className='font-bold text-sm xs:mb-3 '>asdasdsad</p>
                </div>
              </div>
              <p className="text-gray-600 sm:text-center md:text-left">Gra:
                <p className='font-bold text-base'>asdsadas</p>
              </p>
            </li>
      </ul>
    </div>
    )
}

export default UserAccount