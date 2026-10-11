// Škoda 9Tr4 - Detailní konfigurace kabiny a vozidla

const Skoda9Tr4 = {
  name: 'Škoda 9Tr4',
  type: 'trolleybus',
  year: 2002,
  length: 18.75,
  width: 2.5,
  height: 3.2,
  seats: 42,
  standingCapacity: 80,
  maxSpeed: 80,
  acceleration: 0.18,
  brakeForce: 2.8,
  emptyWeight: 11200,
  maxLoadWeight: 18000,
  wheelbase: 6.5,
  trackWidth: 2.4,
  tyreSize: '265/70R19.5',
  
  // Napájení a trakce
  electrical: {
    nominalVoltage: 600,
    maxVoltage: 630,
    minVoltage: 540,
    batteryCapacity: 120, // kWh
    motorType: 'AC induction',
    motorPower: 160, // kW
    numMotors: 2,
    controlType: 'IGBT inverter'
  },
  
  // Brzdový systém
  braking: {
    serviceBrake: 'pneumatic disc',
    parkingBrake: 'spring-applied pneumatic',
    regenerativeBraking: true,
    maxBrakingDeceleration: 3.5, // m/s²
    ABSEquipped: true
  },
  
  // Kabina řidiče - fyzické ovladače
  cabin: {
    layout: 'left-hand drive',
    seatType: 'air-suspended',
    mirrorTypes: ['convex-exterior', 'flat-interior', 'wide-angle-right'],
    windshieldHeated: true,
    climateControl: true,
    noiseLevel: 72 // dB
  },
  
  // Kontrolní prvky - detailní seznam
  controls: {
    // Hlavní páčky
    accelerator: {
      id: 'throttle-pedal',
      type: 'foot-pedal',
      range: [0, 100],
      position: 'center-floor',
      hapticFeedback: true,
      responseTime: 50 // ms
    },
    
    serviceBrakePedal: {
      id: 'service-brake-pedal',
      type: 'foot-pedal',
      range: [0, 100],
      position: 'left-floor',
      hapticFeedback: true,
      responseTime: 80,
      pressureSensor: true
    },
    
    handbrake: {
      id: 'parking-brake',
      type: 'lever',
      positions: ['engaged', 'released'],
      position: 'left-side-panel',
      requiresButton: false,
      holdForce: 250 // N
    },
    
    directionSelector: {
      id: 'traction-mode',
      type: 'rotary-switch',
      positions: ['reverse', 'neutral', 'forward'],
      position: 'left-console',
      clickPositions: 3,
      safetyInterlock: true
    },
    
    pantographControl: {
      id: 'pantograph-raise-lower',
      type: 'toggle-switch',
      positions: ['raised', 'lowered'],
      position: 'overhead-left',
      autoLower: true,
      autoLowerSpeed: 5, // km/h
      indicator: 'led-status'
    },
    
    mainPowerSwitch: {
      id: 'main-power',
      type: 'key-switch',
      positions: ['off', 'standby', 'on'],
      position: 'dashboard-center',
      requires: 'key',
      safetyCheck: true
    },
    
    doorControl: {
      id: 'door-control',
      type: 'button-group',
      buttons: ['front-open', 'front-close', 'rear-open', 'rear-close'],
      position: 'left-console',
      requires: 'speed < 5',
      disabledWhen: ['emergency-brake', 'speed > 5']
    },
    
    horn: {
      id: 'horn-button',
      type: 'push-button',
      position: 'steering-wheel-center',
      sound: 'electric-horn',
      volume: 100 // dB
    },
    
    lights: {
      headlights: {
        id: 'headlights',
        type: 'rotary-switch',
        positions: ['off', 'parking', 'dipped', 'main'],
        position: 'left-console-lever',
        autoOff: 300 // seconds
      },
      
      signalLights: {
        id: 'turn-signals',
        type: 'stalk-control',
        position: 'steering-column-left',
        autoCancel: true,
        frequency: 1 // Hz
      },
      
      warningLights: {
        id: 'hazard-lights',
        type: 'push-button',
        position: 'dashboard-center',
        frequency: 2 // Hz
      },
      
      interiorLights: {
        id: 'cabin-lights',
        type: 'push-button',
        position: 'cabin-ceiling',
        brightness: 100 // %
      },
      
      destinationDisplay: {
        id: 'line-display',
        type: 'led-display',
        position: 'front-roof',
        lines: 3,
        chars: 16
      }
    },
    
    specialControls: {
      emergencyBrake: {
        id: 'emergency-stop',
        type: 'mushroom-button',
        position: 'left-console',
        color: 'red',
        actionStops: true,
        requiresReset: true
      },
      
      airDoorUnlock: {
        id: 'door-override',
        type: 'push-button',
        position: 'left-console-top',
        requires: 'emergency-brake'
      },
      
      ventilation: {
        id: 'cabin-ventilation',
        type: 'rotary-switch',
        positions: ['off', 'low', 'medium', 'high'],
        position: 'dashboard-right'
      },
      
      audioSystem: {
        id: 'audio-control',
        type: 'button-group',
        buttons: ['volume-up', 'volume-down', 'next-station'],
        position: 'dashboard-right'
      }
    }
  },
  
  // Indikátory a displeje
  displays: {
    speedometer: {
      id: 'speed-gauge',
      type: 'analog-dial',
      range: [0, 100],
      unit: 'km/h',
      position: 'dashboard-center',
      divisions: 20,
      redZoneStart: 85
    },
    
    ammeter: {
      id: 'current-gauge',
      type: 'analog-dial',
      range: [-400, 400],
      unit: 'A',
      position: 'dashboard-left',
      divisions: 16,
      centerZero: true
    },
    
    voltmeter: {
      id: 'voltage-gauge',
      type: 'analog-dial',
      range: [500, 650],
      unit: 'V',
      position: 'dashboard-left',
      divisions: 15,
      redZoneStart: 630
    },
    
    digitialDisplay: {
      id: 'mfd',
      type: 'lcd-display',
      size: '7-inch',
      position: 'dashboard-center',
      resolution: '800x480',
      pages: ['speed', 'power', 'status', 'maintenance', 'faults']
    },
    
    warningIndicators: {
      type: 'led-panel',
      position: 'dashboard-top',
      indicators: [
        'engine-check',
        'battery-low',
        'brake-warning',
        'door-open',
        'pantograph-disconnected',
        'overheat',
        'system-fault'
      ]
    }
  },
  
  // Akustické signály a zvuky
  sounds: {
    motorStartup: {
      file: 'sounds/9tr4-startup.wav',
      volume: 70,
      duration: 2000 // ms
    },
    
    motorRunning: {
      file: 'sounds/9tr4-motor-running.wav',
      volume: 65,
      loop: true,
      variableWithSpeed: true
    },
    
    acceleration: {
      file: 'sounds/9tr4-acceleration.wav',
      volume: 75,
      variableWithThrottle: true
    },
    
    braking: {
      file: 'sounds/9tr4-braking.wav',
      volume: 70,
      variableWithBrakeForce: true
    },
    
    doorOpen: {
      file: 'sounds/9tr4-door-open.wav',
      volume: 60,
      duration: 3000
    },
    
    doorClose: {
      file: 'sounds/9tr4-door-close.wav',
      volume: 60,
      duration: 2500
    },
    
    horn: {
      file: 'sounds/9tr4-horn.wav',
      volume: 100,
      duration: 500
    },
    
    warningBeep: {
      file: 'sounds/beep-warning.wav',
      volume: 80,
      frequency: 1000 // Hz
    },
    
    pantographConnect: {
      file: 'sounds/pantograph-connect.wav',
      volume: 50,
      duration: 1500
    },
    
    pantographDisconnect: {
      file: 'sounds/pantograph-disconnect.wav',
      volume: 50,
      duration: 1200
    },
    
    brakePressure: {
      file: 'sounds/brake-release.wav',
      volume: 55,
      duration: 800
    },
    
    emergencyBrake: {
      file: 'sounds/emergency-brake.wav',
      volume: 95,
      duration: 2000,
      repeats: 3
    },
    
    stationAnnouncement: {
      file: 'sounds/station-announce.wav',
      volume: 70,
      variableWithStation: true
    }
  },
  
  // Typické poruchy
  faults: {
    highCurrent: {
      id: 'overcurrent',
      threshold: 350, // A
      action: 'reduce-throttle',
      warning: true,
      sound: 'warning-beep'
    },
    
    lowVoltage: {
      id: 'low-voltage',
      threshold: 540, // V
      action: 'reduce-speed',
      warning: true
    },
    
    highVoltage: {
      id: 'overvoltage',
      threshold: 630, // V
      action: 'emergency-stop',
      warning: true,
      sound: 'emergency-alarm'
    },
    
    motorOverheat: {
      id: 'motor-overtemp',
      threshold: 85, // °C
      action: 'reduce-power',
      warning: true,
      sound: 'warning-beep'
    },
    
    pantographFailure: {
      id: 'pantograph-disconnect',
      action: 'emergency-stop',
      warning: true,
      sound: 'emergency-alarm'
    },
    
    brakeFailure: {
      id: 'brake-fault',
      action: 'emergency-stop',
      warning: true,
      sound: 'emergency-alarm'
    },
    
    doorsStuck: {
      id: 'door-malfunction',
      action: 'manual-override',
      warning: true
    }
  }
};

module.exports = Skoda9Tr4;
