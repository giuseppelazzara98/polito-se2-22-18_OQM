import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReciptComponent from "../components/ReciptComponent/ReciptComponent";
import ServicesComponent from "../components/ServicesComponent/ServicesComponent";

export default function UserPage(props) {
  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <ServicesComponent/>
        </Col>
        <Col xs={12} md={4}>
          <ReciptComponent/>
        </Col>
      </Row>
    </Container>
  )
}