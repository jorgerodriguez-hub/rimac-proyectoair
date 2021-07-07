import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Layout, Menu } from 'antd';
import Lapadula from '../../../assets/img/jpg/lapadula.jpg';
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
            <Avatar size={150} src={avatarUrl ? avatarUrl : Lapadula} />
        </div>
        
        <h1>Gianluca Lapadula</h1>

            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to={"/registro"}>
                        <FileAddOutlined />
                        <span className="nav-text">Registro de Solicitud</span>
                    </Link>
                </Menu.Item>                
                <Menu.Item key="2">
                    <Link to={"/bandeja"}>
                        <FileDoneOutlined />
                        <span className="nav-text">Consulta de Solicitudes</span>
                    </Link>
                </Menu.Item>
            </Menu>
            
        </Sider>
    );
}