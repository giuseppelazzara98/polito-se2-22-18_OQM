import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReceiptComponent from "../components/ReceiptComponent/ReceiptComponent";
import ServicesComponent from "../components/ServicesComponent/ServicesComponent";

export default function UserPage(props) {
  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <ServicesComponent/>
        </Col>
        <Col xs={12} md={4}>
          <ReceiptComponent/>
        </Col>
      </Row>
    </Container>
  )
}