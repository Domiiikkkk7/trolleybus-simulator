// Simulace počasí a jeho vlivů

class WeatherSystem {
  constructor() {
    this.current = {
      type: 'clear',
      temperature: 15,
      humidity: 60,
      windSpeed: 0,
      visibility: 1000,
      precipitation: 0 // mm/h
    };
    this.nextChangeTime = 0;
    this.changeInterval = 600; // seconds
  }
  
  update(currentTime) {
    if (currentTime > this.nextChangeTime) {
      this.changeWeather();
      this.nextChangeTime = currentTime + this.changeInterval;
    }
    
    return this.current;
  }
  
  changeWeather() {
    const weatherTypes = [
      { type: 'clear', temp: 15, humidity: 50, wind: 5, visibility: 1000, precip: 0 },
      { type: 'cloudy', temp: 12, humidity: 70, wind: 8, visibility: 800, precip: 0 },
      { type: 'rainy', temp: 10, humidity: 90, wind: 15, visibility: 300, precip: 5 },
      { type: 'heavy-rain', temp: 8, humidity: 95, wind: 25, visibility: 100, precip: 15 },
      { type: 'snow', temp: -2, humidity: 85, wind: 20, visibility: 200, precip: 8 },
      { type: 'fog', temp: 5, humidity: 100, wind: 0, visibility: 50, precip: 0 }
    ];
    
    const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    this.current = weather;
  }
  
  getSpeedReduction() {
    const reductions = {
      'clear': 0,
      'cloudy': 0.05,
      'rainy': 0.15,
      'heavy-rain': 0.30,
      'snow': 0.25,
      'fog': 0.20
    };
    
    return reductions[this.current.type] || 0;
  }
  
  getBrakingDistanceMultiplier() {
    const multipliers = {
      'clear': 1.0,
      'cloudy': 1.1,
      'rainy': 1.3,
      'heavy-rain': 1.5,
      'snow': 1.8,
      'fog': 1.25
    };
    
    return multipliers[this.current.type] || 1.0;
  }
}

module.exports = WeatherSystem;
