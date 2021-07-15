import React, {useState, useEffect} from 'react';
import { Button, Checkbox, Form, Input, Select, Row, Col, DatePicker, Upload, Result, Tooltip, message, notification, Tabs, Table, Modal } from 'antd';
import { FileExcelOutlined, FormOutlined, RetweetOutlined, CheckCircleOutlined, MinusOutlined, PlusOutlined, PushpinOutlined, SearchOutlined, UserAddOutlined, NotificationTwoTone } from '@ant-design/icons';
//import { useFetchCombos } from '../../../../hooks/useFetch';
import { sendExcel } from '../../../../api/excel';
import GoogleMap from '../GoogleMap';
import { registroApi } from '../../../../api/excel';
import moment from 'moment';

import './FormView.scss';

export default function FormView() {

    const { Option } = Select;

    const { TabPane } = Tabs;

    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const showModal2 = () => {
        setIsModalVisible2(true);
    };
  
    const handleOk2 = () => {
        setIsModalVisible2(false);
    };
  
    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const [state, setState] = useState({ cliente : '', total : '', inicio : '', final : '', moneda : '' });

    const [markers, setMarkers] = useState([]);

    const { Dragger } = Upload;

    const columns = [
        {
            title: 'Nº',
            dataIndex: 'numero',
        },
        {
            title: 'PAIS',
            dataIndex: 'pais',
        },
        {
            title: 'MONEDA',
            dataIndex: 'moneda',
        },
        {
            title: 'Nº PISO',
            dataIndex: 'piso',
        },
        {
            title: 'VAL. EDIFICIO',
            dataIndex: 'valedificio',
        },
        {
            title: 'VAL. CONTENIDO',
            dataIndex: 'valcontenido',
        },
        {
            title: 'VAL. LUCRO',
            dataIndex: 'valucro',
        },
        {
            title: 'SUMA A. EDIFICIO',
            dataIndex: '',
        },
        {
            title: 'SUMA A. CONTENIDO',
            dataIndex: '',
        },
        {
            title: 'SUMA A. LUCRO',
            dataIndex: '',
        },
        {
            title: 'DED. EDIFICIO',
            dataIndex: '',
        },
        {
            title: 'DED. CONTENIDO',
            dataIndex: '',
        },
        {
            title: 'DED. LUCRO',
            dataIndex: '',
        },
        {
            title: 'ACCIONES',
            dataIndex: 'acciones',
            render: (text, record) => <Button onClick={(value) => {showModal(value, record)}}><SearchOutlined /></Button>,
        },
    ];

    console.log('markers', markers);

    const data = markers.map((marker, index) => (
        {
            key: index,
            numero: index,
            pais: 'PE',
            moneda: 'USD',
            piso: marker.caracteristica.pisos,
            valedificio: marker.valor_declarado.bienes[0].valor,
            valcontenido: marker.valor_declarado.bienes[12].valor,
            valucro: marker.valor_declarado.bienes[13].valor
        }
    ));
      
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

    //const { data:monedas, loading } = useFetchCombos();

    const convertirBase64 = (file) => {
        Array.from(file).map( async(file) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let arrayAuxiliar = [];
            reader.onload = async function() {
                let base64 = reader.result;
                arrayAuxiliar = base64.split(',');
                await sendExcel(arrayAuxiliar)
                    .then(response => {
                        notification["success"]({
                            message: "El archivo fue procesado correctamente."
                        });
                        arrayAuxiliar = {};
                        console.log(response);
                        setState({ cliente : response.cliente.asegurado, total : response.total_declarado, inicio : response.cliente.fecha_inicio, final : response.cliente.fecha_final, moneda : response.cliente.moneda });
                        setMarkers(response.direcciones);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error en el servidor."
                        });
                    });
            }
        });
    };

    const [modalMarker, setModalMarker] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (value, text) => {
        const result = markers[text.key];
        setModalMarker(result);
        setIsModalVisible(true);
        console.log('holis', value, result, text);
        console.log('mmarker', modalMarker);
    };

    console.log('mmarker2', modalMarker);
  
    const handleOk = () => {
        setIsModalVisible(false);
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const registerForm = () => {

        let finalData = {
            //id: "sol_1626156839143",
            //iduser: "01",
            cod_cliente: "202109",
            ruc: "20131373237",
            asegurado: state.cliente,
            tipo_suma_asegurada: "B",
            moneda: "PEN",
            suma_asegurada: state.cliente,
            fecha_inicio: state.inicio,
            fecha_expiracion: state.final,
            segmento: "01",
            tipo_modelamiento: "01",
            direcciones: {
                "0": {
                    "suma_asegurada_lucro": "20000000",
                    "valor_edificio": "20000000",
                    "suma_asegurada_edificio": "20000000",
                    "tipo_suma_asegurada_ubicacion": "C",
                    "dias_cubiertos": "12",
                    "nro_piso": "9",
                    "provincia": "010101",
                    "codigo_construccion": "2210",
                    "longitud": "-77.0329272",
                    "valor_lucro_cesante": "20000000",
                    "deducible_contenido": "20000000",
                    "per_deducible_contenido": "%16",
                    "distrito": "010101",
                    "latitud": "-12.1220737",
                    "cantidad_dias_lucro": "12",
                    "suma_asegurada_contenido": "20000000",
                    "direccion": "Av. REPÚBLICA DE COLOMBIA NRO. 791 OF. 903 LIMA, San Isidro",
                    "codigo_uso": "300",
                    "pais": "PE",
                    "valor_contenido": "20000000",
                    "per_deducible_edificio": "%16",
                    "tipo_deducible": "C",
                    "deducible_lucro_cesante": "20000000",
                    "departamento": "010101",
                    "deducible_edificio": "20000000",
                    "anio_construccion": "2017"
                },
                "1": {
                    "suma_asegurada_lucro": "20000000",
                    "valor_edificio": "20000000",
                    "suma_asegurada_edificio": "20000000",
                    "tipo_suma_asegurada_ubicacion": "C",
                    "dias_cubiertos": "12",
                    "nro_piso": "9",
                    "provincia": "010101",
                    "codigo_construccion": "2210",
                    "longitud": "-77.0329272",
                    "valor_lucro_cesante": "20000000",
                    "deducible_contenido": "20000000",
                    "per_deducible_contenido": "%16",
                    "distrito": "010101",
                    "latitud": "-12.1220737",
                    "cantidad_dias_lucro": "12",
                    "suma_asegurada_contenido": "20000000",
                    "direccion": "Av. REPÚBLICA DE COLOMBIA NRO. 791 OF. 903 LIMA, San Isidro",
                    "codigo_uso": "300",
                    "pais": "PE",
                    "valor_contenido": "20000000",
                    "per_deducible_edificio": "%16",
                    "tipo_deducible": "C",
                    "deducible_lucro_cesante": "20000000",
                    "departamento": "010101",
                    "deducible_edificio": "20000000",
                    "anio_construccion": "2017"
                }
            }
        };

        registroApi(finalData)
            .then(response => {
                notification["success"]({
                    message: "Registrado satisfactoriamente"
                });
                //finalData= {};
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor."
                });
            });
        console.log('final', finalData);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    
    useEffect(() => {

    }, [setModalMarker]);

    return (
        <Form layout="vertical">
            <Form.Item>
                <h1><FormOutlined /> Registro de Solicitudes de Modelamiento</h1>
            </Form.Item>
            <Row>
                {/* <Col span={16}>
                    <Form.Item>
                        <Checkbox style={{ float: "right" }} checked="cheked">SBS Standar AIR</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Dragger name='file'
                                 multiple={false}
                                 accept='.xls, .xlsx'
                        >
                                <p className="ant-upload-drag-icon">
                                    <FileExcelOutlined />
                                </p>
                                <p className="ant-upload-text">Adjuntar Archivo SBS</p>
                                <p className="ant-upload-hint">
                                Haga clic o arrastre el archivo a esta área para cargar
                                </p>
                        </Dragger>
                    </Form.Item>
                </Col> */}
                {/* <Col span={8}>
                    <Result
                        status="success"
                        title="Archivo procesado correctamente!"
                        // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                        // extra={[
                        // <Button type="primary" key="console">
                        //     Go Console
                        // </Button>,
                        // <Button key="buy">Buy Again</Button>,
                        // ]}
                    />
                </Col> */}
            </Row>
            <Row>
                <Form.Item>
                    <Input type="file" onChange={(e)=>convertirBase64(e.target.files)} />
                </Form.Item>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item label="Cliente/Asegurado">
                        {/* <Input placeholder="" value={state.cliente} onChange={(e)=>setState({ ...state, cliente:e.target.value })} /> */}
                        <Input placeholder="" value={state.cliente} disabled />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Tipo Suma Asegurada">
                        <Select defaultValue="N" onChange={handleChange}>
                            <Option key="01" value="N">N</Option>
                            <Option key="02" value="B">B</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Moneda">
                        <Input value={state.moneda} disabled />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Suma Asegurada">
                        <Input value={state.total} onChange={(e)=>setState({ ...state, total:e.target.value })} disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item label="Fecha Inicio">
                        <Input value={state.inicio} disabled />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Fecha Expiración">
                        <Input value={state.final} disabled />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Segmento">
                        <Select defaultValue="COR" disabled>
                            <Option key="01" value="COR">CORPORATIVO</Option>
                            <Option key="02" value="EMP">EMPRESAS</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Tipo de Modelamiento">
                        <Select defaultValue="REN">
                            <Option key="01" value="REN">RENOVACIÓN</Option>
                            <Option key="02" value="VEN">VENTAS</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {/* <Col span={2}>
                    <Form.Item>
                        <Tooltip placement="bottom" title="Registrar Cliente">
                            <Button type="primary"
                                    size="default"
                                    onClick={showModal2}
                                    danger 
                            >
                                <UserAddOutlined />
                            </Button>
                        </Tooltip>
                    </Form.Item>
                </Col> */}
                <Col span={2}>
                    <Form.Item>
                        <Tooltip placement="bottom" title="Aprobar">
                            <Button type="primary" 
                                    size="default"
                                    danger
                                    htmlType="submit"
                                    onClick={registerForm}
                            >
                                <CheckCircleOutlined />
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
                            <h1><PushpinOutlined /> Ubicaciones</h1>
                        </Col>
                        <Col span={2} offset={12}>
                            <Tooltip placement="top" title="Agregar">
                                <Button type="primary" 
                                        size="default"
                                        style={{ float: 'right' }}
                                        danger 
                                >
                                    <PlusOutlined />
                                </Button>
                            </Tooltip>    
                        </Col>
                        <Col span={2}>
                            <Tooltip placement="top" title="Eliminar">
                                <Button type="primary"
                                        size="default"
                                        style={{ float: 'right' }}
                                        danger 
                                >
                                    <MinusOutlined />
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
                    >
                    </Table>
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
        {modalMarker && (
            
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Display 1" key="1">
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="País">
                                        <Input value="PERÚ" disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Departamento">
                                        <Input value={modalMarker.direccion.departamento} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>    
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Provincia">
                                        <Input value={modalMarker.direccion.provincia} disabled /> 
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Distrito">
                                        <Input value={modalMarker.direccion.distrito} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Dirección" wrapperCol={{ span: 24 }}>
                                        <Input value={modalMarker.direccion.tipo_via+' '+modalMarker.direccion.nombre_via+' '+modalMarker.direccion.numero} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Latitud">
                                        <Input value={modalMarker.latitud} onChange={(e)=>setModalMarker({ ...modalMarker, latitud:parseFloat(e.target.value) })} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Longitud">
                                        <Input value={modalMarker.longitud} onChange={(e)=>setModalMarker({ ...modalMarker, longitud:parseFloat(e.target.value) })} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Nro de Piso">
                                        <Input value={modalMarker.caracteristica.pisos} disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Año de Construcción">
                                        <Input value={modalMarker.caracteristica.anio_construccion} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Tipo de Código de Construcción">
                                    <Select defaultValue="C" disabled>
                                        <Option key="01" value="C">C</Option>
                                        <Option key="02" value="S">S</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Código de Construcción">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Tipo de Código de Uso" wrapperCol={{ span: 24 }}>
                                    <Select defaultValue="CE" disabled>
                                        <Option key="01" value="CE">C</Option>
                                        <Option key="02" value="SS">S</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Código de Uso">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <>
                                <GoogleMap longitud={modalMarker.longitud} latitud={modalMarker.latitud} />
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
                                        <Input value={modalMarker.valor_declarado.bienes[0].valor} disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Valor de Contenido">
                                        <Input value={modalMarker.valor_declarado.bienes[12].valor} disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Valor de Lucro Cesante">
                                        <Input value={modalMarker.valor_declarado.bienes[13].valor} disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Días Cubiertos">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="Tipo de Deducible" wrapperCol={{ span: 24 }}>
                                    <Select defaultValue="CEE" disabled>
                                        <Option key="01" value="CEE">C</Option>
                                        <Option key="02" value="SSS">S</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="% Deducible Edificio">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Deducible Edificio">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="% Deducible Contenido">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="Deducible Contenido">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Cantidad días Lucro">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Deducible de Lucro Cesante">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Tipo Suma Asegurada" wrapperCol={{ span: 24 }}>
                                    <Select defaultValue="CCE" disabled>
                                        <Option key="01" value="CCE">C</Option>
                                        <Option key="02" value="SES">S</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="Suma Asegurada Edificio">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Suma Asegurada Contenido">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Suma Asegurada Lucro">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
            
        )}
           </Modal>
        
            <Modal title="Registro de Clientes" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Nro de RUC">
                            <Input placeholder="" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Razón Social">
                            <Input placeholder="" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Segmento">
                            <Input placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>
            </Modal>
    </Form>
    );
}