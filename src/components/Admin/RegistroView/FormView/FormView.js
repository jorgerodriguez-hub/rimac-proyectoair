import React, {useState} from 'react';
import { Button, Checkbox, Form, Input, Select, Row, Col, DatePicker, Upload, Result, Tooltip, notification } from 'antd';
import { FileExcelOutlined, FormOutlined, RetweetOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useFetchCombos } from '../../../../hooks/useFetch';
import { sendExcel } from '../../../../api/excel';

import './FormView.scss';

export default function FormView() {

    const [state, setState] = useState({ cliente : '', total : '' });

    const { Dragger } = Upload;

    // const props = {
    //   name: 'file',
    //   multiple: true,
    //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   onChange(info) {
    //     const { status } = info.file;
    //     if (status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (status === 'done') {
    //       message.success(`${info.file.name} file uploaded successfully.`);
    //     } else if (status === 'error') {
    //       message.error(`${info.file.name} file upload failed.`);
    //     }
    //   },
    //   onDrop(e) {
    //     console.log('Dropped files', e.dataTransfer.files);
    //   },
    // };

    const Register = () => {
        notification["success"]({
            message: "Se generó la solicitud Nº 2021265."
        });
    };

    const Deleter = () => {
        notification["error"]({
            message: "Código de Uso incorrecto para Ubicación 1."
        });
    };

    const { data:monedas, loading } = useFetchCombos();

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
                        setState({ cliente : response.cliente.asegurado, total : response.total_declarado });
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error en el servidor."
                        });
                    });
            }
        });
    };

    return (
        <Form layout="vertical">
            <Form.Item>
                <h1><FormOutlined /> Registro de Solicitudes de Modelamiento</h1>
            </Form.Item>
            <Row>
                <Col span={16}>
                    <Form.Item>
                        <Checkbox style={{ float: "right" }}>SBS Standar AIR</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Dragger onChange={convertirBase64}>
                                <p className="ant-upload-drag-icon">
                                    <FileExcelOutlined />
                                </p>
                                <p className="ant-upload-text">Adjuntar Archivo SBS</p>
                                <p className="ant-upload-hint">
                                Haga clic o arrastre el archivo a esta área para cargar
                                </p>
                        </Dragger>
                    </Form.Item>
                </Col>
                <Col span={8}>
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
                </Col>
            </Row>
            <Row>
                <Input type="file" onChange={(e)=>convertirBase64(e.target.files)} />
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item label="Asegurado">
                        <Input placeholder="" value={state.cliente} onChange={(e)=>setState({ ...state, cliente:e.target.value })} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Tipo Suma Asegurada">
                        <Input placeholder="" value={state.total} onChange={(e)=>setState({ ...state, total:e.target.value })} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Moneda">
                        <Select>
                            {
                                monedas.map( lista => (
                                        <Select.Option key={lista.id}>
                                            {lista.descripcion}
                                        </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Suma Asegurada">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item label="Fecha Inicio">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Fecha Expiración">
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={2}>
                    <Form.Item>
                        <Tooltip placement="bottom" title="Actualizar">
                            <Button type="primary"
                                    size="default"
                                    onClick={Deleter}
                                    danger 
                            >
                                <RetweetOutlined />
                            </Button>
                        </Tooltip>
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Form.Item>
                        <Tooltip placement="bottom" title="Aprobar">
                            <Button type="primary" 
                                    size="default"
                                    onClick={Register} 
                                    danger
                            >
                                <CheckCircleOutlined />
                            </Button>
                        </Tooltip>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}