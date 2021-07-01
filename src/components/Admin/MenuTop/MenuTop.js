import React from 'react';
import { Button } from 'antd';
import logoRimac from '../../../assets/img/svg/logo-white-rimac.svg';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';

import './MenuTop.scss';

export default function MenuTop(props) {

    const { menuCollapsed, setMenuCollapsed } = props;

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img
                    className="menu-top__left-logo"
                    src={logoRimac}
                    alt="Rimac"
                />
                <Button type="link" onClick={ () => setMenuCollapsed(!menuCollapsed) }>
                    { menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link">
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
}