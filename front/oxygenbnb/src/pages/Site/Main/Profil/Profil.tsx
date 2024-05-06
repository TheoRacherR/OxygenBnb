import { Route, Routes } from 'react-router-dom'
import User from './Users/User'
import ReservationPage from './Users/Reservation/ReservationPage'

const Profil = () => {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<User/>}/>
        <Route path="/reservation/:id" element={<ReservationPage/>}/>
        <Route path="/*" element={<User/>}/>
      </Routes>
    </div>
  )
}

export default Profil