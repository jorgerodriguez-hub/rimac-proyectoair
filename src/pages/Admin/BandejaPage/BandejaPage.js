import React from 'react';
import FormView from '../../../components/Admin/BandejaView/FormView';
import GrillaView from '../../../components/Admin/BandejaView/GrillaView';

import './BandejaPage.scss';

export default function BandejaPage() {
    return (
        <div className="menu-web-list">
            <div className="menu-web-list__items">
                <FormView />
            </div>
            <div className="menu-web-list__items">
                <GrillaView />
            </div>
        </div>
    );
}