// Simulace semaforů

class TrafficLightSystem {
  constructor() {
    this.lights = new Map();
    this.intersections = [];
  }
  
  addIntersection(id, position, cycleLength = 90) {
    this.intersections.push({
      id: id,
      position: position,
      cycleLength: cycleLength,
      offset: Math.random() * cycleLength,
      lights: {
        main: 'red',
        cross: 'green',
        pedestrian: 'wait'
      }
    });
  }
  
  getIntersectionState(intersectionId, currentTime) {
    const intersection = this.intersections.find(i => i.id === intersectionId);
    if (!intersection) return null;
    
    const cycle = (currentTime + intersection.offset) % intersection.cycleLength;
    
    // Logika semaforů
    let mainLight, crossLight, pedestrianLight;
    
    if (cycle < 40) {
      mainLight = 'green';
      crossLight = 'red';
      pedestrianLight = 'wait';
    } else if (cycle < 45) {
      mainLight = 'yellow';
      crossLight = 'red';
      pedestrianLight = 'wait';
    } else if (cycle < 85) {
      mainLight = 'red';
      crossLight = 'green';
      pedestrianLight = 'walk';
    } else if (cycle < 90) {
      mainLight = 'red';
      crossLight = 'yellow';
      pedestrianLight = 'wait';
    }
    
    intersection.lights.main = mainLight;
    intersection.lights.cross = crossLight;
    intersection.lights.pedestrian = pedestrianLight;
    
    return intersection.lights;
  }
  
  shouldStop(intersectionId, currentTime) {
    const lights = this.getIntersectionState(intersectionId, currentTime);
    return lights && lights.main === 'red';
  }
  
  getStoppingDistance(intersectionId, vehicleSpeed, currentTime) {
    if (!this.shouldStop(intersectionId, currentTime)) {
      return null;
    }
    
    // Výpočet vzdálenosti pro zastavení
    const brakingDeceleration = 2.5; // m/s²
    const speedMs = vehicleSpeed / 3.6; // km/h -> m/s
    const stoppingDistance = (speedMs * speedMs) / (2 * brakingDeceleration);
    
    return stoppingDistance;
  }
}

module.exports = TrafficLightSystem;
