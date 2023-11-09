import './App.css';
import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { Link, Navigate, Route, Routes } from "react-router-dom"
import UsersContainer from './components/Users/UsersContainer';
import { ProfileContainer } from './components/My_Profile/ProfileContainer';
import HeaderPage from './components/Header/Header';
import Login from './components/Login/Login';
import { useSelector } from 'react-redux';
import { initializationTC } from './Redux/AppReducer';
import Preloader from './components/common/preloader/Preloader';
import { AppStateType } from './Redux/redux-store';
import { useAppDispatch } from './Hooks/hooks';
import { Breadcrumb, Layout, theme } from 'antd';

// import MessagesContainer from './components/Messages/MessagesContainer'
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'))

const { Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useAppDispatch()
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  useEffect(() => {
    dispatch(initializationTC())
  }, [])

  if (!initialized) { return <Preloader /> }

  return (
    <Layout>
      <HeaderPage />
      <Content style={{ padding: '0 50px' }}>
      
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sidebar colorBgContainer={colorBgContainer} />
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <React.Suspense fallback={ <Preloader/> }>
           <Routes>
             <Route path='/' element={<Navigate to='/Profile' /> } />
             <Route path='/Messages/*' element={<MessagesContainer />} />
             <Route path='/Profile/:userId?' element={<ProfileContainer />} />
             <Route path='/Music' element={<Music />} />
             <Route path='/News' element={<News />} />
             <Route path='/Settings' element={<Settings />} />
             <Route path='/Users' element={<UsersContainer />} />
             <Route path='/login' element={<Login />} />
           </Routes>
         </React.Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Social-network ©2023 Created by Ruslan Abaidullin</Footer>
    </Layout>
  )
}



export default App;
