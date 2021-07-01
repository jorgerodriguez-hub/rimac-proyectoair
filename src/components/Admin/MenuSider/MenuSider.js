import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Layout, Menu } from 'antd';
import NoAvatar from '../../../assets/img/jpg/person.jpg';
import { FileAddOutlined, FileDoneOutlined } from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider(props) {
    // const { menuCollapsed, avatar, setAvatar } = props;
    // const [avatarUrl, setAvatarUrl] = useState(null);
    const { menuCollapsed } = props;
    const [avatarUrl] = useState(null);

    const { Sider } = Layout;

    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>

        <div className="upload-avatar">
            <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
        </div>
        
        <h1>Nombre de Usuario</h1>

            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to={"/bandeja"}>
                        <FileDoneOutlined />
                        <span className="nav-text">Aprobación de Solicitud</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/registro"}>
                        <FileAddOutlined />
                        <span className="nav-text">Registro de Solicitud</span>
                    </Link>
                </Menu.Item>
            </Menu>
            
        </Sider>
    );
}