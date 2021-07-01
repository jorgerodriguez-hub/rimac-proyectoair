import React from 'react';
import { Form, Input, Select, Row, Col, DatePicker } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import SearchView from '../SearchView';

import './FormView.scss';

export default function FormView() {

    return (
        <Form layout="vertical">
            <Form.Item>
                <h1><CheckSquareOutlined /> Aprobación de Solicitudes de Modelamiento</h1>
            </Form.Item>
            <Row>
                <Col span={6}>
                    <Form.Item label="Asegurado">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Nro Solicitud">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Estado">
                        <Select>
                            <Select.Option value="demo">Ejemplo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Usuario Asignado">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item label="Vigencia - Desde">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Vigencia - Hasta">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Fecha de Creación - Desde">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Fecha de Creación - Hasta">
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <SearchView />
        </Form>
    );
}