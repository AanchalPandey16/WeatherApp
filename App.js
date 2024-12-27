import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const API_KEY = 'e4a9196e6a1d8b35d5948a9908d8752d';

export default function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(city) {
    setLoaded(false); 
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
        console.log('Failed to fetch weather data.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    } finally {
      setLoaded(true);
    }
  }

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      fetchWeatherData(cityName);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter City name"
          value={cityName}
          onChangeText={(text) => setCityName(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Weather Info */}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.weatherCondition}>
            {weatherData.weather[0].description}
          </Text>
          <Text style={styles.temperature}>
            {(weatherData.main.temp - 273.15).toFixed(2)}°C
          </Text>

          {/* Additional Info */}
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Humidity</Text>
              <Text style={styles.infoValue}>{weatherData.main.humidity}%</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Wind Speed</Text>
              <Text style={styles.infoValue}>
                {weatherData.wind.speed.toFixed(2)} m/s
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  searchButton: {
    height: 40,
    width: 40,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherCondition: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
