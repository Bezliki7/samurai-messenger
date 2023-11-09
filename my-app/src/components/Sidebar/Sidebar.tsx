import s from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';

type SidebarProps = {
    colorBgContainer: any
}

const { Sider } = Layout;

const Sidebar = (props: SidebarProps) => {

    return (
        <div>
            <Sider style={{ background: props.colorBgContainer }} width={200}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" >
                    <Menu.Item key="1">
                        <NavLink to="Profile">Profile</NavLink>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <NavLink to="Messages">Messages</NavLink>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <NavLink to="Users">Users</NavLink>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <NavLink to="Settings">Settings</NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            {/* <div className={s.item}> <NavLink to="Profile">Profile</NavLink> </div>
            <div className={s.item}> <NavLink to="Messages">Messages</NavLink> </div>
            <div className={s.item}> <NavLink to="News">News</NavLink> </div>
            <div className={s.item}> <NavLink to="Music">Music</NavLink> </div>
            <div className={s.item}> <NavLink to="Settings">Settings</NavLink> </div>
            <div className={s.item}> <NavLink to="Users">Find users</NavLink> </div> */}
        </div>)
}

export default Sidebar