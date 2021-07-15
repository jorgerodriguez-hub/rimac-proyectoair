import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import './SearchView.scss';

function Container(props) {
    if (!props.warn) {
      return null;
    }
  
    return (
        <Row>
            <Col span={6}>
                <Form.Item label="Tipo de Solicitud">
                    <Select>
                        <Select.Option value="demo">Ejemplo</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Tipo de Modelamiento">
                    <Input placeholder="" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Nro Oportunidad">
                    <Input placeholder="" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Nro Poliza">
                    <Input placeholder="" />
                </Form.Item>
            </Col>
        </Row>
    );
}
  
export default class SearchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: false}
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
        showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
        <div>
            <Button type="link" onClick={this.handleToggleClick}>
                {this.state.showWarning ? <span className="busqueda-avazanda">Búsqueda Avanzada <CaretUpOutlined /></span> : <span className="busqueda-avazanda">Búsqueda Avanzada <CaretDownOutlined /></span>}
            </Button>
            <Container warn={this.state.showWarning} />
        </div>
        );
    }
}

ReactDOM.render(
    <SearchView />,
    document.getElementById('root')
);