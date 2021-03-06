import React, {useState, useEffect} from 'react';
import { List, Typography, Divider, Button, Checkbox, Form, Input, Select, Row, Col, Progress, DatePicker, Upload, Result, Tooltip, message, notification, Tabs, Table, Modal } from 'antd';
import { FileExcelOutlined, FormOutlined, EyeOutlined, RetweetOutlined, ExclamationCircleOutlined, CheckCircleOutlined, MinusOutlined, PlusOutlined, PushpinOutlined, SearchOutlined, UserAddOutlined, NotificationTwoTone } from '@ant-design/icons';
import { sendExcel } from '../../../../api/excel';
import { registroApi } from '../../../../api/excel';
import moment from 'moment';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IntlProvider, FormattedNumber, InvalidConfigError } from 'react-intl';

import './FormView.scss';
import Google from '../../Google';

export default function FormView() {

    const { confirm } = Modal;

    const { Option } = Select;

    const { TabPane } = Tabs;

    const [isResultVisible, setIsResultVisible] = useState(false);
    
    const [progress, setProgress] = useState(0);

    const [isResultErrorVisible, setIsResultErrorVisible] = useState(false);

    const [isWarningVisible, setIsWarningVisible] = useState(false);

    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const [isModalVisible3, setIsModalVisible3] = useState(false);

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

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

    const [state, setState] = useState({ cliente: '', ruc: '', total: '', inicio: '', final: '', moneda: '', poliza: '', tipo_suma: '', tipo_modelamiento: '', ubicaciones: [] });

    const [markers, setMarkers] = useState([]);

    const [errores, setErrores] = useState([]);

    const { Dragger } = Upload;

    const columns = [
        {
            title: 'N??',
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
            dataIndex: state.moneda ? 'monedausd' : 'monedapen',
        },
        {
            title: 'VAL. EDIFICIO',
            dataIndex: 'valedificio',
            render: (dataIndex) => <IntlProvider locale="en"><FormattedNumber value={dataIndex} style="currency" currency="USD" /></IntlProvider>
        },
        {
            title: 'VAL. CONTENIDO',
            dataIndex: 'valcontenido',
            render: (dataIndex) => <IntlProvider locale="en"><FormattedNumber value={dataIndex} style="currency" currency="USD" /></IntlProvider>
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
            monedausd: 'USD',
            monedapen: 'PEN',
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
            //console.log('onError', err);
        },
        onProgress({ percent }, file) {
            //console.log('onProgress', `${percent}%`, file.name, file);
        },
        onRemove() {
            setState({});
            setMarkers([]);
            setIsResultErrorVisible(false);
            setIsWarningVisible(false);
            setIsResultVisible(false);
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
                                let myElement = document.querySelector(".ant-upload.ant-upload-drag");
                                myElement.style.pointerEvents = "none";
                                const percent = Math.floor((loaded / total) * 100);
                                setProgress(percent);
                                if (percent === 100) {
                                    setTimeout(() => setProgress(0), 3000);
                                }
                                onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
                            },
                        })
                        .then((response) => {
                            onSuccess(response, file);
                            setIsResultErrorVisible(false);
                            setIsWarningVisible(false);
                            setIsResultVisible(false);
                            setIsResultVisible(true);
                            setState({
                                cliente : response.data.cliente.asegurado,
                                ruc: response.data.cliente.ruc, 
                                total : parseFloat(response.data.total_declarado).toFixed(2), 
                                inicio : response.data.cliente.fecha_inicio, 
                                final : response.data.cliente.fecha_final, 
                                moneda : response.data.cliente.moneda, 
                                ubicaciones : response.data.direcciones,
                                poliza: response.data.cliente.poliza_multiriesgo ? '01' : '02'
                            });
                            setMarkers(response.data.direcciones);
                            setErrores([]);
                            let myElement = document.querySelector(".ant-upload.ant-upload-drag");
                            myElement.style.pointerEvents = "visible";
                        })
                        .catch((error) => {
                            if( error.response.status === 400 ) {
                                setIsResultVisible(false);
                                setIsWarningVisible(false);
                                setIsResultErrorVisible(false);
                                setIsResultErrorVisible(true);
                                setState({});
                                setMarkers([]);
                                setErrores(error.response.data.mensajes);
                                let myElement = document.querySelector(".ant-upload.ant-upload-drag");
                                myElement.style.pointerEvents = "visible";
                            } else if ( error.response.status === 502 ) {
                                setIsResultVisible(false);
                                setIsResultErrorVisible(false);
                                setIsWarningVisible(false);
                                setIsWarningVisible(true);
                                setState({});
                                setMarkers([]);
                                setErrores([]);
                                let myElement = document.querySelector(".ant-upload.ant-upload-drag");
                                myElement.style.pointerEvents = "visible";
                            }
                        })
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
            tipo_suma_asegurada: state.tipo_suma,
            moneda: "PEN",
            suma_asegurada: state.cliente,
            fecha_inicio: state.inicio,
            fecha_expiracion: state.final,
            segmento: "BRUNITO",
            tipo_modelamiento: state.tipo_modelamiento,
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

    function sumaChange(value) {
        if (value === 'N') {
            let myElement = document.querySelector("input.ant-input.suma-asegurada");
            myElement.style.pointerEvents = "none";
        } else if (value === 'B') {
            let myElement = document.querySelector("input.ant-input.suma-asegurada");
            myElement.style.pointerEvents = "visible";
        }
        setState({ ...state, tipo_suma: value});
    }

    function modelamientoChange(value) {
        setState({ ...state, tipo_modelamiento: value});
    }

    function aseguradaChange(value) {

        setState({ ...state, suma_asegurada: value});
    }

    const dateFormat = 'DD/MM/YYYY';

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    function showConfirm() {
          setTimeout(() => {
            confirm({
              icon: <ExclamationCircleOutlined />,
              content: <span>Se est?? procesando la solicitud, ??Desea aprobar la solicitud de modelamiento?</span>,
              okText: 'SI',
              cancelText: 'NO',
              okType: 'danger',
              onOk() {
                  registerForm();
              },
              onCancel() {

              },
            });
          })
    }

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
                                Haga clic o arrastre el archivo a esta ??rea para cargar
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
                            title="??Archivo procesado satisfactoriamente!"
                        /> : null }

                    { isResultErrorVisible ? <Result
                            className="animate__animated animate__bounceInRight"
                            status="error"
                            title="El archivo fue procesado con errores."
                            subTitle="Haga clic en el bot??n para ver los errores de validaci??n."
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

                    { isWarningVisible ? <Result
                            className="animate__animated animate__bounceInRight"
                            status="warning"
                            title="El archivo no pudo ser procesado."
                            subTitle="El archivo tiene un estructura diferente. Vuelva a subirlo con el formato correcto."
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
                        <Select defaultValue="N" onChange={sumaChange}>
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
                        <Input className="suma-asegurada" value={Intl.NumberFormat('ja-JP').format(state.total)} onChange={aseguradaChange} />
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
                    <Form.Item label="Fecha Expiraci??n">
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
                        <Select value={state.poliza} onChange={modelamientoChange}>
                            <Option key="01" value="01">RENOVACI??N</Option>
                            <Option key="02" value="02">VENTAS</Option>
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
                                    onClick={showConfirm}
                                    //onClick={registerForm}
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
                      ATR??S
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
                                    <Form.Item label="Pa??s">
                                        <Input value="PER??" disabled />
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
                                    <Form.Item label="Direcci??n" wrapperCol={{ span: 24 }}>
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
                                    <Form.Item label="A??o de Construcci??n">
                                        <Input value={modalMarker.caracteristica.anio_construccion} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Tipo de C??digo de Construcci??n">
                                    <Select defaultValue="AIR" disabled>
                                        <Option key="01" value="AIR">AIR</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="C??digo de Construcci??n">
                                        <Input value={modalMarker.caracteristica.tep} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Tipo de C??digo de Uso" wrapperCol={{ span: 24 }}>
                                    <Select defaultValue="AIR" disabled>
                                        <Option key="01" value="AIR">AIR</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="C??digo de Uso">
                                        <Input value={modalMarker.caracteristica.uso} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                                <LoadScript
                                    googleMapsApiKey={process.env.REACT_APP_API_KEY}>
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
                                {/* <Google /> */}
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
                                    <Form.Item label="D??as Cubiertos">
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
                                    <Form.Item label="Cantidad d??as Lucro">
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
                    ATR??S
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
                    <Form.Item label="Raz??n Social">
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
            title="Errores de Validaci??n" 
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
            { errores ? <List bordered>
                {errores.map(( {mensaje, index}) => {
                    return <List.Item key={index}><Typography.Text type="danger">[ERROR]</Typography.Text> {mensaje}</List.Item>
                })}
            </List> : null }
        </Modal>
    </Form>
    );
}