import React, { useState } from 'react';
import { Button, Form, Input, Modal, Row, Col, Table, Tabs, Tooltip } from 'antd';
import { MinusOutlined, PlusOutlined, PushpinOutlined, SearchOutlined, FileExcelOutlined } from '@ant-design/icons';
import GoogleMap from '../GoogleMap';

import './GrillaView.scss';

export default function GrillaView() {

    const { TabPane } = Tabs;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
  
    const handleOk = () => {
        setIsModalVisible(false);
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'NRO',
            dataIndex: 'name',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'PAIS',
            dataIndex: 'age',
        },
        {
            title: 'UBIGEO',
            dataIndex: 'address',
        },
        {
            title: 'NRO PISO',
            dataIndex: 'piso',
        },
        {
            title: 'VAL. EDIFICIO',
            dataIndex: 'valedificio',
        },
        // {
        //     title: 'VAL. CONTENIDO',
        //     dataIndex: 'valedificio',
        // },
        // {
        //     title: 'VAL. LUCRO',
        //     dataIndex: 'valedificio',
        // },
        // {
        //     title: 'SUMA A. EDIFICIO',
        //     dataIndex: 'valedificio',
        // },
        // {
        //     title: 'SUMA A. CONTENIDO',
        //     dataIndex: 'valedificio',
        // },
        {
            title: 'SUMA A. LUCRO',
            dataIndex: 'valedificio',
        },
        {
            title: 'DED. EDIFICIO',
            dataIndex: 'dededificio',
        },
        {
            title: 'DED. CONTENIDO',
            dataIndex: 'dededificio',
        },
        {
            title: 'SUMA A. LUCRO',
            dataIndex: 'dededificio',
        },
        {
            title: 'ACCIONES',
            dataIndex: 'acciones',
            render: (text) => <Button onClick={ showModal }><SearchOutlined /></Button>,
        },
    ];

    const data = [
        {
            key: '1',
            name: '1',
            age: 'PE',
            address: 'LIMA/LIMA/SAN ISIDRO',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '2',
            name: '2',
            age: 'PE',
            address: 'LIMA/LIMA/SAN ISIDRO',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '3',
            name: '3',
            age: 'PE',
            address: 'LIMA/LIMA/MIRAFLORES',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '4',
            name: '4',
            age: 'PE',
            address: 'LIMA/LIMA/SAN BORJA',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '5',
            name: '5',
            age: 'PE',
            address: 'LIMA/LIMA/SAN ISIDRO',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '6',
            name: '6',
            age: 'PE',
            address: 'LIMA/LIMA/BARRANCO',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '7',
            name: '7',
            age: 'PE',
            address: 'LIMA/LIMA/SAN ISIDRO',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '8',
            name: '8',
            age: 'PE',
            address: 'LIMA/LIMA/BARRANCO',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '9',
            name: '9',
            age: 'PE',
            address: 'LIMA/LIMA/SAN BORJA',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '10',
            name: '10',
            age: 'PE',
            address: 'LIMA/LIMA/MIRAFLORES',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '11',
            name: '11',
            age: 'PE',
            address: 'LIMA/LIMA/BARRANCO',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '12',
            name: '12',
            age: 'PE',
            address: 'LIMA/LIMA/SAN BORJA',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        },
        {
            key: '13',
            name: '13',
            age: 'PE',
            address: 'LIMA/LIMA/MIRAFLORES',
            piso: '1',
            valedificio: '$20,000,000',
            dededificio: '20,000',
            acciones: 'Modificar'
        }
    ]; // rowSelection object indicates the need for row selection
      
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <Form layout="vertical">
            <Row>
                <Col span={24}>
                    <Form.Item>
                        <Row style={{ marginBottom: 15 }}>
                            <Col span={6}>
                                <h1><PushpinOutlined /> Ubicaciones</h1>
                            </Col>
                            <Col span={2} offset={14}>
                                <Tooltip title="Agregar">
                                    <Button type="primary" 
                                            size="large" 
                                            shape="circle" 
                                            icon={<PlusOutlined />}
                                            danger 
                                    />
                                </Tooltip>    
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Eliminar">
                                    <Button type="primary"
                                            size="large" 
                                            shape="circle" 
                                            icon={<MinusOutlined />}
                                            danger 
                                    />
                                </Tooltip>
                            </Col>
                        </Row>
                        <Table
                            rowSelection={{
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={data}
                        />
                        <Tooltip placement="bottom" title="Exportar Excel">
                            <Button type="default" icon={<FileExcelOutlined className="btn-export" />} size='large'>
                            </Button>
                        </Tooltip>
                    </Form.Item>
                </Col>
            </Row>
            <Modal
                title="Registro de Ubicaciones"
                centered
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Display 1" key="1">
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="País">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Departamento">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Provincia">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Distrito">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Dirección">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Segmento">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Latitud">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Longitud">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Nro de Piso">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Año de Construcción">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Código de Construcción">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Código de Uso">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <>
                                <GoogleMap />
                            </>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Display 2" key="2">
                    <Row>
                        <Col span={24}>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="Valor de Edificio">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Moneda">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Valor de Contenido">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Valor de Lucro Cesante">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="Días Cubiertos">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Tipo de Deducible">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="% Deducible Edificio">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Deducible Edificio">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="% Deducible Contenido">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Deducible Contenido">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Cantidad días Lucro">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Deducible de Lucro Cesante">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="Tipo Suma Asegurada">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Suma Asegurada Edificio">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Suma Asegurada Contenido">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Suma Asegurada Lucro">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
            </Modal>
        </Form>
    );
}