import React from 'react';
import FormView from '../../../components/Admin/RegistroView/FormView';
import GrillaView from '../../../components/Admin/RegistroView/GrillaView';

import './RegistroPage.scss';

export default function RegistroPage() {
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