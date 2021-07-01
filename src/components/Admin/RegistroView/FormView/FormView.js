import React from 'react';
import { Button, Checkbox, Form, Input, Select, Row, Col, DatePicker, Upload, Result, message, notification } from 'antd';
import { FileExcelOutlined, FormOutlined } from '@ant-design/icons';

import './FormView.scss';

export default function FormView() {

    const { Dragger } = Upload;

    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
    };

    const Register = () => {
        notification["success"]({
            message: "Se generó la solicitud Nº 2021265."
        });
    }

    const Deleter = () => {
        notification["error"]({
            message: "Código de Uso incorrecto para Ubicación 1."
        });
    }

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
                        <Dragger {...props}>
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
                <Col span={6}>
                    <Form.Item label="Asegurado">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Tipo Suma Asegurada">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Moneda">
                        <Select>
                            <Select.Option value="demo">Ejemplo</Select.Option>
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
                <Col span={3} offset={18}>
                    <Button onClick={Deleter} 
                            type="primary" 
                            size="default"
                            danger
                    >
                        ACTUALIZAR
                    </Button>
                </Col>
                <Col span={3}>
                    <Button onClick={Register}
                            type="primary" 
                            size="default" 
                            danger
                    >
                        GENERAR AIR
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}