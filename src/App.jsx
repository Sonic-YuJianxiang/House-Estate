import { BrwoserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';
import About from './pages/About';


export default function App() {
  return <BrwoserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-out' element={<SignOut />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/about' element={<About />} />
  </Routes>
  </BrwoserRouter>
}
