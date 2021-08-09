import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Layout, Menu } from 'antd';
import Usuario from '../../../assets/img/jpg/person.jpg';
import { FileAddOutlined, FileDoneOutlined } from '@ant-design/icons';
import './MenuSider.scss';

export default function MenuSider(props) {
    const { menuCollapsed } = props;
    const { Sider } = Layout;

    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <div className="upload-avatar">
                <Avatar size={150} src={Usuario} />
            </div>
            <h1>JUAN PÉREZ</h1>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to={"/admin/registro"}>
                        <FileAddOutlined />
                        <span className="nav-text">Registro de Solicitud</span>
                    </Link>
                </Menu.Item>                
                <Menu.Item key="2">
                    <Link to={"/admin/bandeja"}>
                        <FileDoneOutlined />
                        <span className="nav-text">Consulta de Solicitudes</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}