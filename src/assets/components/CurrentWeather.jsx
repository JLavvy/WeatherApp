import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

const CurrentWeather = ({ data }) => {
  const { name, weather, main } = data;
  const { description, icon } = weather[0];
  const { temp, humidity } = main;

  return (
    <Card className="mb-4 p-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={6}>
            <h3 className="mb-3">{name}</h3>
            <div className="d-flex align-items-center">
              <Image
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt={description}
                className="mr-3"
                style={{ width: '64px' }}
              />
              <div>
                <h5>{description}</h5>
                <p>Temperature: {temp}°C</p>
                <p>Humidity: {humidity}%</p>
              </div>
            </div>
          </Col>
          
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CurrentWeather;
