import React, {useState, useEffect} from 'react';
import { List, Typography, Divider, Button, Checkbox, Form, Input, Select, Row, Col, Progress, DatePicker, Upload, Result, Tooltip, message, notification, Tabs, Table, Modal } from 'antd';
import { FileExcelOutlined, FormOutlined, EyeOutlined, RetweetOutlined, CheckCircleOutlined, MinusOutlined, PlusOutlined, PushpinOutlined, SearchOutlined, UserAddOutlined, NotificationTwoTone } from '@ant-design/icons';
import { sendExcel } from '../../../../api/excel';
import { registroApi } from '../../../../api/excel';
import moment from 'moment';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './FormView.scss';

export default function FormView() {

    const { Option } = Select;

    const { TabPane } = Tabs;

    const [isResultVisible, setIsResultVisible] = useState(false);
    
    const [progress, setProgress] = useState(0);

    const [isResultErrorVisible, setIsResultErrorVisible] = useState(false);

    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const [isModalVisible3, setIsModalVisible3] = useState(false);

    const showModal3 = () => {
        setIsModalVisible3(true);
    };
  
    const handleOk3 = () => {
        setIsModalVisible3(false);
    };
  
    const handleCancel3 = () => {
        setIsModalVisible3(false);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };
  
    const handleOk2 = () => {
        setIsModalVisible2(false);
    };
  
    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const [state, setState] = useState({ cliente : '', ruc : '', total : '', inicio : '', final : '', moneda : '', ubicaciones: [] });

    const [markers, setMarkers] = useState([]);

    const [errores, setErrores] = useState([]);

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
            title: 'UBIGEO',
            dataIndex: 'ubigeo',
        },
        {
            title: 'MONEDA',
            dataIndex: 'moneda',
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

    const data = markers.map((marker, index) => (
        {
            key: index,
            numero: index+1,
            pais: 'PE',
            ubigeo: marker.direccion.departamento+'/'+marker.direccion.provincia+'/'+marker.direccion.distrito,
            moneda: 'USD',
            valedificio: parseFloat(marker.valor_declarado.bienes[0].valor).toFixed(2),
            valcontenido: parseFloat(marker.valor_declarado.bienes[12].valor).toFixed(2),
            valucro: marker.valor_declarado.bienes[13].valor
        }
    ));
      
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

    const props = {
        action: 'https://z16vwhmxyf.execute-api.us-east-1.amazonaws.com/dev/excel',
        multiple: false,
        accept: '.xls, .xlsx',
        showUploadList: true,
        maxCount: 1,
        headers: {
            'Content-Type': 'text/plain'
        },
        onSuccess(res, file) {
            console.log('onSuccess', res, file.name);
        },
        onError(err) {
            console.log('onError', err);
        },
        onProgress({ percent }, file) {
            console.log('onProgress', `${percent}%`, file.name, file);
        },
        customRequest({
            action,
            file,
            headers,
            onError,
            onProgress,
            onSuccess,
        }) {

            const getBase64 = () => {
                return new Promise(resolve => {
                  let baseURL = "";          
                  let arrayAuxiliar = [];
                  let reader = new FileReader();    
                  reader.readAsDataURL(file);              
                  reader.onload = () => {
                    baseURL = reader.result;
                    arrayAuxiliar = baseURL.split(',');
                    resolve(arrayAuxiliar);
                    axios
                        .post(action, arrayAuxiliar[1], {
                            headers,
                            onUploadProgress: ({ total, loaded }) => {
                                const percent = Math.floor((loaded / total) * 100);
                                setProgress(percent);
                                if (percent === 100) {
                                    setTimeout(() => setProgress(0), 5000);
                                }
                                onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
                            },
                        })
                        .then(( response ) => {
                            onSuccess(response, file);
                            console.log('THIS IS REPONSE->', response);
                            if (response.data.mensajes) {
                                setIsResultVisible(false);
                                setIsResultErrorVisible(false);
                                setIsResultErrorVisible(true);
                                setState({});
                                setMarkers([]);
                                setErrores(response.data.mensajes);

                            } else {
                                setIsResultErrorVisible(false);
                                setIsResultVisible(false);
                                setIsResultVisible(true);

                            }
                            setState({ 
                                cliente : response.data.cliente.asegurado,
                                ruc: response.data.cliente.ruc, 
                                total : parseFloat(response.data.total_declarado).toFixed(2), 
                                inicio : response.data.cliente.fecha_inicio, 
                                final : response.data.cliente.fecha_final, 
                                moneda : response.data.cliente.moneda, 
                                ubicaciones : response.data.direcciones 
                            });
                            setMarkers(response.data.direcciones);
                        })
                        .catch(onError);
                  };
                });
            };

            getBase64();
    
        },
    };    

    // const convertirBase64 = (file) => {
    //     Array.from(file).map( async(file) => {
    //         console.log('bunny', file);
    //         let reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         let arrayAuxiliar = [];
    //         reader.onload = async function() {
    //             let base64 = reader.result;
    //             arrayAuxiliar = base64.split(',');
    //             await sendExcel(arrayAuxiliar)
    //                 .then(response => {
    //                     notification["success"]({
    //                         message: "El archivo fue procesado correctamente."
    //                     });
    //                     arrayAuxiliar = {};
    //                     console.log(response);
    //                     setState({ cliente : response.cliente.asegurado,
    //                                ruc: response.cliente.ruc, 
    //                                total : response.total_declarado, 
    //                                inicio : response.cliente.fecha_inicio, 
    //                                final : response.cliente.fecha_final, 
    //                                moneda : response.cliente.moneda, 
    //                                ubicaciones : response.direcciones 
    //                     });
    //                     setMarkers(response.direcciones);
    //                 })
    //                 .catch(() => {
    //                     notification["error"]({
    //                         message: "Error en el servidor."
    //                     });
    //                 });
    //         }
    //     });
    // };

    const [modalMarker, setModalMarker] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (value, text) => {
        const result = markers[text.key];
        setModalMarker(result);
        setIsModalVisible(true);
        console.log('render', value, result, text);
    };
  
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
            ruc: state.ruc,
            asegurado: state.cliente,
            tipo_suma_asegurada: "B",
            moneda: "PEN",
            suma_asegurada: state.cliente,
            fecha_inicio: state.inicio,
            fecha_expiracion: state.final,
            segmento: "BRUNITO",
            tipo_modelamiento: "01",
            direcciones: markers
        };

        registroApi(finalData)
            .then(response => {
                notification["success"]({
                    message: "Registrado satisfactoriamente"
                });
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor."
                });
            });
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const dateFormat = 'DD/MM/YYYY';

    console.log('THIS IS STATE->', state);
    console.log('THIS IS MARKERS->', markers);
    console.log('THIS IS MODALMARKER', modalMarker);
    console.log('THIS IS ERRORES', errores);

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    const data2 = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];
      
    return (
        <Form layout="vertical">
            <Form.Item>
                <h1><FormOutlined /> Registro de Solicitudes de Modelamiento</h1>
            </Form.Item>
            <Row>
                <Col span={16}>
                    <Form.Item>
                        <Checkbox checked="cheked">SBS Standar AIR</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <FileExcelOutlined />
                                </p>
                                <p className="ant-upload-text">Adjuntar Archivo SBS</p>
                                <p className="ant-upload-hint">
                                Haga clic o arrastre el archivo a esta área para cargar
                                </p>
                        </Dragger>
                        {progress > 0 ? <Progress percent={progress} /> : null}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                    { isResultVisible ? <Result
                            className="animate__animated animate__bounceInRight"
                            status="success"
                            title="Archivo procesado satisfactoriamente!"
                        /> : null }

                    { isResultErrorVisible ? <Result
                            className="animate__animated animate__bounceInRight"
                            status="error"
                            title="El archivo fue procesado con errores."
                            extra={[
                                <Tooltip placement="bottom" title="Ver Errores"><Button 
                                type="primary" 
                                danger
                                onClick={showModal3}
                            >
                                <EyeOutlined />
                            </Button></Tooltip>
                            ]}
                        /> : null }

                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item label="Cliente/Asegurado">
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
                        <Input value={state.total} disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item label="Fecha Inicio">
                        <DatePicker
                            format={dateFormat}
                            onChange={(date, dateString) => setState({ ...state, inicio:dateString })}
                            value={state.inicio ? moment(state.inicio, dateFormat) : moment()} 
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Fecha Expiración">
                        <DatePicker
                            format={dateFormat}
                            onChange={(date, dateString) => setState({ ...state, final:dateString })}
                            value={state.final ? moment(state.final, dateFormat) : moment()} 
                        />
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
                        <Col span={4} offset={14}>
                            <Tooltip placement="top" title="Exportar Excel">
                                <Button type="primary"
                                        size="default"
                                        style={{ float: 'right', marginLeft: 10 }}
                                        danger
                                >
                                    <FileExcelOutlined />
                                </Button>
                            </Tooltip>  
                            <Tooltip placement="top" title="Eliminar">
                                <Button type="primary"
                                        size="default"
                                        style={{ float: 'right', marginLeft: 10 }}
                                        danger 
                                >
                                    <MinusOutlined />
                                </Button>
                            </Tooltip>
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
                width={1000}
                onCancel={handleCancel}
                footer={[
                    <Button 
                        onClick={handleCancel}
                        danger
                    >
                      ATRÁS
                    </Button>,
                    <Button
                        type="primary"
                        onClick={handleOk}
                        danger
                    >
                      GUARDAR
                    </Button>,
                ]}
            >
        { modalMarker && (
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
                                        <Input 
                                            value={modalMarker.direccion.latitud}
                                            onChange={(e)=>setModalMarker({ ...modalMarker, direccion: { 
                                                departamento: modalMarker.direccion.departamento,
                                                distrito: modalMarker.direccion.provincia,
                                                giro_negocio: modalMarker.direccion.giro_negocio,
                                                latitud:parseFloat(e.target.value),
                                                longitud:modalMarker.direccion.longitud,
                                                nombre_via: modalMarker.direccion.nombre_via,
                                                numero: modalMarker.direccion.numero,
                                                provincia: modalMarker.direccion.provincia,
                                                referencia: modalMarker.direccion.referencia,
                                                tipo_via: modalMarker.direccion.tipo_via,
                                                urbanizacion: modalMarker.direccion.urbanizacion,
                                            } })}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Longitud">
                                        <Input 
                                            value={modalMarker.direccion.longitud} 
                                            onChange={(e)=>setModalMarker({ ...modalMarker, direccion: {
                                                departamento:modalMarker.direccion.departamento,
                                                distrito: modalMarker.direccion.provincia,
                                                giro_negocio: modalMarker.direccion.giro_negocio,
                                                latitud: modalMarker.direccion.latitud,
                                                longitud:parseFloat(e.target.value),
                                                nombre_via: modalMarker.direccion.nombre_via,
                                                numero: modalMarker.direccion.numero,
                                                provincia: modalMarker.direccion.provincia,
                                                referencia: modalMarker.direccion.referencia,
                                                tipo_via: modalMarker.direccion.tipo_via,
                                                urbanizacion: modalMarker.direccion.urbanizacion,
                                            } })} 
                                        />
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
                                    <Select defaultValue="AIR" disabled>
                                        <Option key="01" value="AIR">AIR</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Código de Construcción">
                                        <Input value={modalMarker.caracteristica.tep} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Tipo de Código de Uso" wrapperCol={{ span: 24 }}>
                                    <Select defaultValue="AIR" disabled>
                                        <Option key="01" value="AIR">AIR</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Código de Uso">
                                        <Input value={modalMarker.caracteristica.uso} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                                <LoadScript
                                    googleMapsApiKey='AIzaSyBlmA6WWmOCDNwP1Cnqihm4VCB-dK35hac'>
                                        <GoogleMap
                                            mapContainerStyle={mapStyles}
                                            zoom={13}
                                            center={{
                                                lat: modalMarker.direccion.latitud,
                                                lng: modalMarker.direccion.longitud
                                            }}
                                        >
                                            <Marker position={{
                                                lat: modalMarker.direccion.latitud,
                                                lng: modalMarker.direccion.longitud
                                            }}
                                            />
                                        </GoogleMap>
                                </LoadScript>
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
        <Modal 
            title="Registro de Clientes" 
            visible={isModalVisible2}
            onCancel={handleCancel2}
            footer={[
                <Button 
                    onClick={handleCancel2}
                    danger
                >
                    ATRÁS
                </Button>,
                <Button
                    type="primary"
                    onClick={handleOk2}
                    danger
                >
                    GUARDAR
                </Button>,
            ]}
        >
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
        <Modal 
            title="Errores de Validación" 
            visible={isModalVisible3}
            onCancel={handleCancel3}
            width={1000}
            footer={[
                <Button
                    type="primary"
                    onClick={handleOk3}
                    danger
                >
                    CERRAR
                </Button>,
            ]}
        >
            <>
                <List bordered>
                {errores.map( ( {mensaje, index} ) => {
                    return <List.Item key={index}><Typography.Text type="danger">[ERROR]</Typography.Text> {mensaje}</List.Item>
                })}
                </List>
            </>
        </Modal>
    </Form>
    );
}