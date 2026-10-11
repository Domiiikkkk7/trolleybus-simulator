// Tatra 86 - Historická kloubová tramvaj

const Tatra86 = {
  name: 'Tatra 86',
  type: 'tram',
  year: 1961,
  length: 14.5,
  width: 2.4,
  height: 3.5,
  seats: 48,
  standingCapacity: 60,
  maxSpeed: 65,
  acceleration: 0.15,
  brakeForce: 2.2,
  weight: 13500,
  wheelbase: 2.8,
  trackWidth: 1.435,
  
  // Napájení
  electrical: {
    nominalVoltage: 600,
    maxVoltage: 630,
    motorType: 'DC series-wound',
    motorPower: 120, // kW per unit
    numMotors: 4,
    controlType: 'Rheostatic controller'
  },
  
  // Brzdový systém
  braking: {
    serviceBrake: 'mechanical track brake',
    parkingBrake: 'mechanical ratchet',
    regenerativeBraking: false,
    maxBrakingDeceleration: 2.5 // m/s²
  },
  
  // Kabina
  cabin: {
    layout: 'left-hand drive',
    seatType: 'mechanical-spring',
    mirrorTypes: ['convex-exterior', 'flat-interior'],
    windshieldHeated: false,
    climateControl: false,
    noiseLevel: 78 // dB
  },
  
  // Ovladače - historické prvky
  controls: {
    controller: {
      id: 'rheostatic-controller',
      type: 'mechanical-resistance',
      positions: 0, // to 10
      position: 'right-console',
      clickPositions: 11,
      resistanceBank: true
    },
    
    brakeLever: {
      id: 'track-brake-lever',
      type: 'mechanical-lever',
      range: [0, 100],
      position: 'right-side',
      requiresPhysicalForce: true,
      forceRequired: 300 // N
    },
    
    handbrake: {
      id: 'mechanical-handbrake',
      type: 'screw-clamp',
      positions: ['engaged', 'released'],
      position: 'right-console',
      requiresWinding: true
    },
    
    directionSwitch: {
      id: 'direction-reverser',
      type: 'rotary-switch',
      positions: ['reverse', 'neutral', 'forward'],
      position: 'center-console',
      clickPositions: 3,
      safetyInterlock: true
    },
    
    pantographLower: {
      id: 'pantograph-lower',
      type: 'mechanical-rope',
      position: 'left-console',
      requires: 'manual-pull'
    },
    
    bells: {
      id: 'bell-control',
      type: 'pushbutton-group',
      buttons: ['driver-bell', 'passenger-bell'],
      position: 'left-console'
    },
    
    lighting: {
      id: 'lighting-switch',
      type: 'toggle-switch',
      positions: ['off', 'on'],
      position: 'left-console'
    }
  },
  
  sounds: {
    motorRunning: {
      file: 'sounds/tatra86-motor.wav',
      volume: 75,
      loop: true,
      variableWithSpeed: true
    },
    
    brakeSquealing: {
      file: 'sounds/tatra86-brake-squeal.wav',
      volume: 70,
      variableWithBrakeForce: true
    },
    
    wheelClick: {
      file: 'sounds/tatra86-wheel-click.wav',
      volume: 60,
      frequency: 2 // per second at speed
    },
    
    bellRing: {
      file: 'sounds/tatra86-bell.wav',
      volume: 80,
      duration: 2000
    }
  }
};

module.exports = Tatra86;
