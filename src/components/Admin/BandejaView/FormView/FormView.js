import React, { useState } from 'react';
import { Button, Form, Input, Select, Row, Col, DatePicker, Tooltip, Badge, Table } from 'antd';
import { CheckSquareOutlined, SearchOutlined, OrderedListOutlined , FileExcelOutlined, CheckCircleOutlined } from '@ant-design/icons';
import SearchView from '../SearchView';
import './FormView.scss';
import { getSolicitudes } from '../../../../api/excel';
import moment from 'moment';

export default function FormView() {

    const [points, setPoints] = useState([]);;

    const consultar = () => {
        getSolicitudes().then(response => {
            console.log(response);
            setPoints(response.solicitudes);
        })
    };

    const columns = [
        {
            title: 'ESTADO',
            dataIndex: 'estado',
            render: (estado) => <Badge 
                                    status={estado === 'PE' ? "default" : "success" }
                                >
                                </Badge>,
        },
        {
            title: 'CLIENTE',
            dataIndex: 'cliente',
        },
        {
            title: 'Nº SOLICITUD',
            dataIndex: 'nro_solicitud',
        },
        {
            title: 'FECHA REGISTRO',
            dataIndex: 'fecha_registro',
        },
        {
            title: 'TIPO SUMA',
            dataIndex: 'tipo_suma',
        },
        {
            title: 'SUMA ASEGURADA',
            dataIndex: 'suma_asegurada',
        },
        {
            title: 'FECHA INICIO',
            dataIndex: 'fecha_inicio',
        },
        {
            title: 'FECHA EXP.',
            dataIndex: 'fecha_expiracion',
        },
        {
            title: 'ACCIONES',
            dataIndex: 'acciones',
            render: (text) => <Button><SearchOutlined /></Button>,
        },
    ];

    const data = points.map((point, index) => (
        {
            key: index,
            estado: 'PE',
            cliente: point.asegurado,
            nro_solicitud: point.id,
            fecha_registro: point.fecha_creacion,
            tipo_suma: point.tipo_suma_asegurada,
            suma_asegurada: point.suma_asegurada,
            fecha_inicio: point.fecha_inicio,
            fecha_expiracion: point.fecha_expiracion
        }
    ));
    
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        })
    };

    const dateFormat = 'DD/MM/YYYY';

    return (
        <Form layout="vertical">
            <Form.Item>
                <h1><CheckSquareOutlined /> Consulta de Solicitudes de Modelamiento</h1>
            </Form.Item>
            <Row>
                <Col span={6}>
                    <Form.Item label="Cliente/Asegurado">
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
                        <DatePicker 
                            format={dateFormat}
                            value={moment()}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Vigencia - Hasta">
                        <DatePicker 
                            format={dateFormat}
                            value={moment()}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Fecha de Creación - Desde">
                        <DatePicker 
                            format={dateFormat}
                            value={moment()}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Fecha de Creación - Hasta">
                        <DatePicker 
                            format={dateFormat}
                            value={moment()}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <SearchView />
            <Row>
                <Col span={3}>
                    <Form.Item>
                        <Tooltip placement="bottom" title="Consultar">
                            <Button type="primary"
                                    size="default"
                                    onClick={consultar}
                                    danger 
                            >
                                <SearchOutlined />
                            </Button>
                        </Tooltip>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item>
                        <Row style={{ marginBottom: 15 }}>
                            <Col span={6}>
                                <h1><OrderedListOutlined /> Solicitudes de Modelamiento</h1>
                            </Col>
                            <Col span={8}>
                                <Badge status="default" text="Pendiente" />
                                <Badge status="warning" text="Aprobado" style={{ marginLeft: 10 }} />
                                <Badge status="success" text="Procesado" style={{ marginLeft: 10 }} />
                                <Badge status="error" text="Error" style={{ marginLeft: 10 }} />
                            </Col>
                            <Col span={3} offset={7}>
                                <Tooltip placement="top" title="Exportar Excel">
                                    <Button type="primary"
                                            size="default"
                                            style={{ float: 'right', marginLeft: 10 }}
                                            danger
                                    >
                                        <FileExcelOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip placement="top" title="Aprobar">
                                    <Button type="primary" 
                                            size="default"
                                            style={{ float: 'right' }}
                                            danger
                                    >
                                        <CheckCircleOutlined />
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Row>
                        <Table
                            rowSelection={{
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 15 }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}