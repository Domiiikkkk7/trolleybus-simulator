// Simulace linky s zastávkami, semafory a poruchami

class RouteSimulation {
  constructor(routeData) {
    this.routeData = routeData;
    this.currentStopIndex = 0;
    this.elapsedTime = 0;
    this.passengers = 0;
    this.faults = [];
    this.traffic = [];
    this.weather = 'clear';
    this.timeOfDay = 'day';
    this.schedule = this.generateSchedule();
    this.roadConditions = this.generateRoadConditions();
  }
  
  generateSchedule() {
    // Generuje jízdní řád
    const schedule = [];
    let cumulativeTime = 0;
    
    for (let i = 0; i < this.routeData.stops.length; i++) {
      const stop = this.routeData.stops[i];
      const travelTime = i > 0 ? this.routeData.stops[i].distance / 40 * 60 : 0; // min
      const stopTime = 30 + Math.random() * 30; // 30-60 seconds
      
      cumulativeTime += travelTime + stopTime;
      
      schedule.push({
        stopId: stop.id,
        stopName: stop.name,
        scheduledTime: cumulativeTime,
        distance: stop.distance,
        expectedPassengers: stop.passengers,
        dayOfWeek: this.getRandomDayOfWeek()
      });
    }
    
    return schedule;
  }
  
  generateRoadConditions() {
    // Generuje stav vozovky
    const conditions = [];
    
    for (let i = 0; i < this.routeData.stops.length - 1; i++) {
      const stop1 = this.routeData.stops[i];
      const stop2 = this.routeData.stops[i + 1];
      const distance = stop2.distance - stop1.distance;
      
      conditions.push({
        section: i,
        distance: distance,
        condition: this.getRandomCondition(),
        speedLimit: stop2.speedLimit || 60,
        traffic: this.getRandomTraffic(),
        obstacles: this.getRandomObstacles()
      });
    }
    
    return conditions;
  }
  
  getRandomCondition() {
    const conditions = ['good', 'wet', 'snow', 'ice', 'construction'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }
  
  getRandomTraffic() {
    const traffic = ['light', 'moderate', 'heavy', 'congested'];
    return traffic[Math.floor(Math.random() * traffic.length)];
  }
  
  getRandomObstacles() {
    if (Math.random() < 0.3) {
      const obstacles = ['parked-car', 'pedestrian', 'cyclist', 'vehicle'];
      return obstacles[Math.floor(Math.random() * obstacles.length)];
    }
    return null;
  }
  
  getRandomDayOfWeek() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[Math.floor(Math.random() * days.length)];
  }
  
  // Semafor - logika
  getTrafficLightState(stopIndex, time) {
    const cycleLength = 60; // seconds
    const cycle = time % cycleLength;
    
    if (cycle < 30) return 'green'; // zelená
    if (cycle < 35) return 'yellow'; // žlutá
    return 'red'; // červená
  }
  
  // Poruchy
  simulateFault() {
    const faultTypes = [
      { type: 'flat-tire', duration: 600, severity: 'high' },
      { type: 'electrical', duration: 300, severity: 'medium' },
      { type: 'brake-issue', duration: 180, severity: 'critical' },
      { type: 'door-malfunction', duration: 120, severity: 'medium' },
      { type: 'traffic-accident', duration: 900, severity: 'high' },
      { type: 'passenger-emergency', duration: 300, severity: 'medium' }
    ];
    
    if (Math.random() < 0.02) { // 2% šance na poruchu
      const fault = faultTypes[Math.floor(Math.random() * faultTypes.length)];
      fault.startTime = this.elapsedTime;
      fault.endTime = this.elapsedTime + fault.duration;
      this.faults.push(fault);
      return fault;
    }
    
    return null;
  }
  
  // Cestující
  updatePassengers(stopIndex) {
    const stop = this.routeData.stops[stopIndex];
    const boarding = Math.floor(Math.random() * stop.passengers);
    const alighting = Math.min(this.passengers, Math.floor(Math.random() * this.passengers * 0.5));
    
    this.passengers = this.passengers - alighting + boarding;
    
    return {
      boarded: boarding,
      alighted: alighting,
      currentPassengers: this.passengers
    };
  }
  
  // Detalní logika zastávky
  processStop(stopIndex) {
    const stop = this.routeData.stops[stopIndex];
    const stateData = {
      stopId: stop.id,
      stopName: stop.name,
      stopTime: 0,
      passengerData: this.updatePassengers(stopIndex),
      doors: {
        front: 'opening',
        rear: 'opening'
      },
      status: 'stopped'
    };
    
    // Otevření dveří
    setTimeout(() => {
      stateData.doors.front = 'open';
      stateData.doors.rear = 'open';
    }, 1000);
    
    // Čekání na cestující
    setTimeout(() => {
      stateData.doors.front = 'closing';
      stateData.doors.rear = 'closing';
    }, 3000 + stateData.passengerData.boarded * 200);
    
    // Zavření dveří
    setTimeout(() => {
      stateData.doors.front = 'closed';
      stateData.doors.rear = 'closed';
      stateData.status = 'departed';
    }, 4000 + stateData.passengerData.boarded * 200);
    
    return stateData;
  }
  
  // Update logiky každý tick
  update(deltaTime, vehicleSpeed, vehicleState) {
    this.elapsedTime += deltaTime;
    
    // Simulace poruch
    const newFault = this.simulateFault();
    
    // Ověření aktuálních poruch
    this.faults = this.faults.filter(fault => fault.endTime > this.elapsedTime);
    
    // Aktualizace pozice na lince
    const routeProgress = vehicleSpeed * deltaTime / 3600; // km
    const currentStop = this.routeData.stops[this.currentStopIndex];
    const nextStop = this.routeData.stops[this.currentStopIndex + 1];
    
    if (nextStop && currentStop.distance + routeProgress > nextStop.distance) {
      this.currentStopIndex++;
      return { event: 'stop-reached', stop: nextStop };
    }
    
    return {
      event: 'moving',
      currentStop: currentStop,
      nextStop: nextStop,
      faults: this.faults,
      passengers: this.passengers
    };
  }
}

module.exports = RouteSimulation;
