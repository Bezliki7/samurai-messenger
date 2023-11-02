import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { Navigate, Route, Routes } from "react-router-dom"
import UsersContainer from './components/Users/UsersContainer';
import { ProfileContainer } from './components/My_Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { useSelector } from 'react-redux';
import { initializationTC } from './Redux/AppReducer';
import Preloader from './components/common/preloader/Preloader';
import { AppStateType } from './Redux/redux-store';
import { useAppDispatch } from './Hooks/hooks';
// import MessagesContainer from './components/Messages/MessagesContainer'
const MessagesContainer = React.lazy(() =>  import('./components/Messages/MessagesContainer'))

type AppProps = {
  initialized: boolean
  initialization: () => void
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.initialization()
  }
  render() {
    if (!this.props.initialized) { return <Preloader /> }

    return (
      <div className='container'>
        <HeaderContainer />
        <Sidebar />
        <div className='content'>
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
        </div>
      </div>
    );
  }
}

function AppContainer() {
  const dispatch = useAppDispatch()
  const initialized = useSelector((state:AppStateType) => state.app.initialized)

  const initialization = () => {
    dispatch(initializationTC())
  }
  return (<App initialization={initialization} initialized={initialized} />)
}


export default AppContainer;
