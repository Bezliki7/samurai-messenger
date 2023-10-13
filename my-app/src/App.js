import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { Route, Routes } from "react-router-dom"
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/Users/UsersContainer';
import { ProfileContainer } from './components/My_Profile/ProfileContainet';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

function App() {
  return (
    <div className='container'>
      <HeaderContainer />
      <Sidebar />
      <div className='content'>
        <Routes>
          <Route path='/Messages/*' element={<MessagesContainer />} />
          <Route path='/Profile/:userId?' element={<ProfileContainer />} />
          <Route path='/Music' element={<Music />} />
          <Route path='/News' element={<News />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/Users' element={<UsersContainer />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
