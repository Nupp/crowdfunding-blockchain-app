import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style/formulario.scss";
import { FormGroup, Col, Row, Label, Button, Form, Input } from "reactstrap";

const Formulario = () => {

    let navigate = useNavigate();
    const [form, setValues] = useState({});

    const handleInput = (event) => {
        setValues({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/estadisticas/${form.address}`);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label className="title">Crouwdfundig application</Label>
                        <Input
                            id="address"
                            name="address"
                            placeholder="Contract Address"
                            type="submmit"
                            onChange={handleInput}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Button type="submit" className="button">
                Submmit
            </Button>
        </Form>
    );
};

export default Formulario;
