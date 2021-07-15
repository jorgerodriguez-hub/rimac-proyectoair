import React, { useState } from 'react';
import { Button, Form, Input, Select, Row, Col, DatePicker, Tooltip, Badge, Table } from 'antd';
import { CheckSquareOutlined, SearchOutlined, OrderedListOutlined , FileExcelOutlined, CheckCircleOutlined } from '@ant-design/icons';
import SearchView from '../SearchView';
import './FormView.scss';
import { getSolicitudes } from '../../../../api/excel';

export default function FormView() {

    const [points, setPoints] = useState([]);;

    const consultar = () => {
        getSolicitudes().then(response => {
            console.log(response);
            setPoints(response.respuesta);
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
                            <Col span={3}>
                                <Badge status="success" text="Procesado" />
                            </Col>
                            <Col span={3}>
                                <Badge status="default" text="Pendiente" />
                            </Col>
                            <Col span={3}>
                                <Badge status="warning" text="Aprobado" />
                            </Col>
                            <Col span={2} offset={5}>
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
                            <Col span={2}>
                                <Tooltip placement="top" title="Exportar Excel">
                                    <Button type="primary"
                                            size="default"
                                            style={{ float: 'right' }}
                                            danger
                                    >
                                        <FileExcelOutlined />
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