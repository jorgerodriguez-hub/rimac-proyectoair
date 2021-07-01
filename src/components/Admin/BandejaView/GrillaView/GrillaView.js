import React from 'react';
import { Badge, Button, Form, Row, Col, Table, Tooltip } from 'antd';
import { OrderedListOutlined, SearchOutlined, FileExcelOutlined } from '@ant-design/icons';

import './GrillaView.scss';

export default function GrillaView() {

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
            title: 'ASEGURADO',
            dataIndex: 'asegurado',
        },
        {
            title: 'NRO SOLICITUD',
            dataIndex: 'poliza',
        },
        {
            title: 'FECHA REGISTRO',
            dataIndex: 'registro',
        },
        {
            title: 'TIPO SUMA',
            dataIndex: 'tiposuma',
        },
        {
            title: 'SUMA ASEGURADA',
            dataIndex: 'sumaasegurada',
        },
        {
            title: 'FECHA INICIO',
            dataIndex: 'inicio',
        },
        {
            title: 'FECHA EXP.',
            dataIndex: 'expiracion',
        },
        {
            title: 'ACCIONES',
            dataIndex: 'acciones',
            render: (text) => <Button><SearchOutlined /></Button>,
        },
      ];
      
    const data = [
        {
            key: '1',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
            
        },
        {
            key: '2',
            estado: 'PR',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '3',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '4',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '5',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '6',
            estado: 'PR',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '7',
            estado: 'PR',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '8',
            estado: 'PR',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '9',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '10',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '11',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '12',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
        },
        {
            key: '13',
            estado: 'PE',
            asegurado: 'SPSAC',
            poliza: 'SPSAC_LSAMANIP_001',
            registro: '03/05/2021',
            tiposuma: 'B: No limit',
            sumaasegurada: 'S/40,000,000',
            inicio: '03/05/2021',
            expiracion: '03/05/2021',
            acciones: 'Ver'
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
        })
    };    

    return (
        <Form layout="vertical">
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
                            <Col span={3}>
                                <Button type="primary" 
                                        size="default" 
                                        danger
                                >
                                    REGISTRAR
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" 
                                        size="default" 
                                        danger
                                >
                                    APROBAR
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" 
                                        size="default" 
                                        danger
                                >
                                    CONSULTAR
                                </Button>
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
        </Form>
    );
}