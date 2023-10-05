import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MyProfile from './components/My_Profile/My_Profile';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { Route, Routes } from "react-router-dom"
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/Users/UsersContainer';

function App() {
  return (
      <div className='container'>
        <Header />
        <Sidebar />
        <div className='content'>
          <Routes>
            <Route path='/Messages/*' element={<MessagesContainer />} />
            <Route path='/MyProfile' element={<MyProfile />} />
            <Route path='/Music' element={<Music />} />
            <Route path='/News' element={<News />} />
            <Route path='/Settings' element={<Settings />} />
            <Route path='/Users' element={<UsersContainer />}/>
          </Routes>
        </div>
      </div>
    );
}

export default App;
