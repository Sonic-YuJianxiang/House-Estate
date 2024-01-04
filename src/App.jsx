import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './assets/components/Header';

export default function App() {
  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-out' element={<SignOut />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/about' element={<About />} />
    </Routes>
  </BrowserRouter>
  );
}
