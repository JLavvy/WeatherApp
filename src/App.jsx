import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Container, Form, Modal, Button } from 'react-bootstrap'; 
import CurrentWeather from './assets/components/CurrentWeather'; 

const App = () => {
  // State variables 
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [searching, setSearching] = useState(false);
  const [suggestedActivity, setSuggestedActivity] = useState('');
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // useEffect hook to fetch weather data when location changes
useEffect(() => {
  // Fetch weather data based on location
  const fetchWeatherData = async () => {
    const apiKey = 'e6d4f8e332f7dbc221e6b2a0e6725f56';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    

    try {
      // Make GET request to fetch weather data
      const [currentWeatherResponse, forecastResponse] = await Promise.all([axios.get(apiUrl)]); 
      // Set weather data state with the response
      setWeatherData(currentWeatherResponse.data);
      // Set searching state to false
      setSearching(false);
      // Call function to suggest outdoor activity based on weather
      suggestOutdoorActivity(currentWeatherResponse.data);
      // Set current day and date
      setCurrentDay(getCurrentDay());
      setCurrentDate(getCurrentDate());
      
    } catch (error) {
      // Log error if fetching weather data fails
      console.error('Error fetching weather data:', error);
      // Set searching state to false
      setSearching(false);
    }
  };

  // Execute fetchWeatherData function if location is not empty
  if (location) {
    // Set searching state to true
    setSearching(true);
    // Call fetchWeatherData function
    fetchWeatherData();
  }
}, [location]); // Dependency array: useEffect will re-run when location changes


  // Function to handle location change
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Function to suggest outdoor activity based on weather
  const suggestOutdoorActivity = (data) => {
    // if temperature is above 20°C and no rain, suggest "Go for a hike"
    if (data.main.temp > 20 && data.weather[0].main !== 'Rain') {
      setSuggestedActivity('Go for a hike!');
    } else {
      setSuggestedActivity('Stay indoors and relax.');
    }
  };

  // Function to toggle weather modal visibility
  const toggleWeatherModal = () => {
    setShowWeatherModal(!showWeatherModal);
  };

  // Function to get the current day
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    return days[currentDate.getDay()];
  };

  // Function to get the current date
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString();
  };

  return (
    
    <Container className="my-5" style={{ backgroundColor: '#f0f7ff',  maxWidth: '700px' }}>
      <h1 className="text-center mb-4" style={{ color: '#4567b7' }}>
        Weather App
      </h1>
  
      <Form>
        <Form.Group controlId="formLocation">
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
            aria-label="Enter location"
          />
        </Form.Group>
        <br />
      </Form>
      <br />
      {/* Display weather data if available */}
      {weatherData ? (
        <>
          {/* Display current weather */}
          <CurrentWeather
            data={weatherData}
            style={{
              backgroundColor: '#4567b7', 
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
            }}
          />
          {/* Button to show weather modal */}
          <button
            className="btn btn-primary"
            onClick={toggleWeatherModal}
            style={{ marginTop: '20px' }}
          >
            Show Weather Information
          </button>
          {/* Display suggested activity */}
          <p className="text-center mt-4" style={{ color: '#333333', fontSize: '18px' }}>
            {suggestedActivity}
          </p>
          {/* Display current day and date */}
          <p className="text-center mt-2" style={{ color: '#333333', fontSize: '18px' }}>
            {currentDay}, {currentDate}
          </p>
          
        </>
      ) : (
        // Display message if weather data is not available
        <p className="text-center mt-4" style={{ color: '#333333', fontSize: '18px' }}>
          Enter a location to get weather information.
        </p>
        
      )}

      {/* Weather Modal */}
      <Modal show={showWeatherModal} onHide={toggleWeatherModal}>
        <Modal.Header closeButton>
          <Modal.Title>Weather Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display weather information */}
          {weatherData && (
            <div>
              <p>Description: {weatherData.weather[0].description}</p>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Button to close modal */}
          <Button variant="secondary" onClick={toggleWeatherModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </Container>
  );
};

export default App;
