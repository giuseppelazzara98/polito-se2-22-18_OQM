import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../components/Button/Button';

export default function OfficerPage(props) {
	const handleOnClick = () => {
		// call to be for new customer number
	};

	return (
		<Container>
			<Row>
				<Col xs={12} md={6}>
					<Button
						label="Call next customer"
						onClick={() => handleOnClick()}
						className="button-officer"
					/>
				</Col>
				<Col xs={12} md={6}>
					<div className="officer-info">
						<span className="section-title">
							You are currently serving ticket A024
						</span>
					</div>
				</Col>
			</Row>
			{/* Logout button */}
			<Row className="mt-5">
				<Col className="d-flex justify-content-end">
					<Button label="Logout" onClick={props.logout} />
				</Col>
			</Row>
		</Container>
	);
}
