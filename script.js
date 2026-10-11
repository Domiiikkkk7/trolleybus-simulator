const state = {
  speed: 0,
  direction: 'forward',
  accelerator: 0,
  brake: 0,
  roadSpeedLimit: 60,
  pantographRaised: false,
  mainPower: false,
  emergency: false,
  handbrake: true,
  doorOpen: false,
  headlights: false,
  warningLights: false,
  cabinLights: false,
  horn: false,
  stationIndex: 0,
  lines: ['23', '24', '7'],
  stations: ['Náměstí', 'Hlavní nádraží', 'Kobylisy', 'Muzeum', 'Vltavská'],
  current: 0,
  voltage: 0,
  contactState: 'OK',
  fault: null
};

const ui = {
  speedValue: document.getElementById('speedValue'),
  voltageValue: document.getElementById('voltageValue'),
  currentValue: document.getElementById('currentValue'),
  directionStatus: document.getElementById('directionStatus'),
  vehicleState: document.getElementById('vehicleState'),
  doorStatus: document.getElementById('doorStatus'),
  pantographStatus: document.getElementById('pantographStatus'),
  lineDisplay: document.getElementById('lineDisplay'),
  mainMode: document.getElementById('mainMode'),
  contactStatus: document.getElementById('contactStatus'),
  driverStatus: document.getElementById('driverStatus'),
  stationDisplay: document.getElementById('stationDisplay'),
  accelerator: document.getElementById('accelerator'),
  brake: document.getElementById('brake')
};

function setDirection(direction) {
  if (state.speed > 10 && direction !== state.direction) {
    return;
  }

  state.direction = direction;
  document.querySelectorAll('.direction-btn').forEach((btn) => {
    const isActive = btn.dataset.direction === direction;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  updateStatus();
}

function toggleButton(action) {
  switch (action) {
    case 'pantograph':
      state.pantographRaised = !state.pantographRaised;
      break;
    case 'mainPower':
      state.mainPower = !state.mainPower;
      if (!state.mainPower) {
        state.speed = 0;
      }
      break;
    case 'emergency':
      state.emergency = !state.emergency;
      if (state.emergency) {
        state.speed = 0;
        state.brake = 100;
      }
      break;
    case 'handbrake':
      state.handbrake = !state.handbrake;
      if (state.handbrake) {
        state.speed = 0;
      }
      break;
    case 'door':
      if (state.speed > 5) {
        return;
      }
      state.doorOpen = !state.doorOpen;
      break;
    case 'horn':
      state.horn = !state.horn;
      break;
    case 'headlights':
      state.headlights = !state.headlights;
      break;
    case 'warningLights':
      state.warningLights = !state.warningLights;
      break;
    case 'interiorLights':
      state.cabinLights = !state.cabinLights;
      break;
    case 'nextStop':
      state.stationIndex = (state.stationIndex + 1) % state.stations.length;
      break;
    case 'toggleRoute':
      state.lines.push(state.lines.shift());
      ui.lineDisplay.textContent = state.lines[0];
      break;
    case 'doorMode':
      state.doorOpen = !state.doorOpen;
      break;
    case 'resetFault':
      state.fault = null;
      state.contactState = 'OK';
      state.mainPower = true;
      break;
    default:
      break;
  }

  updateButtonStates();
  updateStatus();
}

function updateButtonStates() {
  document.querySelectorAll('[data-action]').forEach((btn) => {
    const action = btn.dataset.action;
    let active = false;

    switch (action) {
      case 'pantograph':
        active = state.pantographRaised;
        break;
      case 'mainPower':
        active = state.mainPower;
        break;
      case 'emergency':
        active = state.emergency;
        break;
      case 'handbrake':
        active = state.handbrake;
        break;
      case 'door':
        active = state.doorOpen;
        break;
      case 'horn':
        active = state.horn;
        break;
      case 'headlights':
        active = state.headlights;
        break;
      case 'warningLights':
        active = state.warningLights;
        break;
      case 'interiorLights':
        active = state.cabinLights;
        break;
      default:
        break;
    }

    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function updateStatus() {
  const directionText = {
    forward: 'VPŘED',
    neutral: 'NEUTRÁL',
    reverse: 'ZPĚT'
  };

  ui.directionStatus.textContent = directionText[state.direction];
  ui.pantographStatus.textContent = state.pantographRaised ? 'ZVEDNUT' : 'SPUŠTĚN';
  ui.doorStatus.textContent = state.doorOpen ? 'OTEVŘENO' : 'ZAVŘENO';

  if (state.speed > 0.2) {
    ui.vehicleState.textContent = 'JÍZDÍ';
  } else if (state.handbrake) {
    ui.vehicleState.textContent = 'ZAJIŠTĚNO';
  } else {
    ui.vehicleState.textContent = 'STOJÍ';
  }

  if (state.mainPower && state.pantographRaised && !state.emergency && !state.handbrake) {
    ui.mainMode.textContent = 'NORMÁLNÍ';
    ui.driverStatus.textContent = 'PŘIPRAVEN';
  } else if (state.emergency) {
    ui.mainMode.textContent = 'NOUZOVÝ';
    ui.driverStatus.textContent = 'POZOR';
  } else if (state.handbrake) {
    ui.mainMode.textContent = 'ZÁJISTKA';
    ui.driverStatus.textContent = 'ZASTAVENO';
  } else {
    ui.mainMode.textContent = 'PŘÍPRAVA';
    ui.driverStatus.textContent = 'STANOVENO';
  }

  ui.contactStatus.textContent = state.contactState;
  ui.stationDisplay.textContent = state.stations[state.stationIndex];
}

function simulate() {
  const acceleratorValue = Number(ui.accelerator.value);
  const brakeValue = Number(ui.brake.value);

  state.accelerator = acceleratorValue;
  state.brake = brakeValue;

  const canMove =
    state.mainPower &&
    state.pantographRaised &&
    !state.emergency &&
    !state.handbrake &&
    !state.doorOpen;

  if (state.speed <= 0 && state.direction === 'neutral') {
    state.speed = 0;
  }

  if (canMove && acceleratorValue > 0) {
    const accelerationForce = (acceleratorValue / 100) * 1.8;
    state.speed += accelerationForce;
  }

  if (brakeValue > 0) {
    state.speed -= (brakeValue / 100) * 2.8;
  }

  if (!canMove || acceleratorValue === 0) {
    state.speed -= 0.3;
  }

  if (state.speed < 0) {
    state.speed = 0;
  }

  if (state.speed > state.roadSpeedLimit) {
    state.speed = state.roadSpeedLimit;
  }

  if (state.emergency) {
    state.speed = Math.max(0, state.speed - 1.5);
  }

  if (!state.mainPower || !state.pantographRaised) {
    state.current = 0;
    state.voltage = 0;
  } else {
    state.voltage = 600 + Math.round(state.speed * 8);
    state.current = Math.round((state.accelerator / 100) * 250);
  }

  if (state.horn) {
    state.contactState = 'SIGNÁL';
  } else if (state.voltage > 0 && state.mainPower) {
    state.contactState = 'OK';
  } else {
    state.contactState = 'VYP';
  }

  if (state.speed > 0 && state.doorOpen) {
    state.doorOpen = false;
  }

  ui.speedValue.textContent = Math.round(state.speed);
  ui.voltageValue.textContent = state.voltage;
  ui.currentValue.textContent = state.current;

  updateStatus();
}

function bindControls() {
  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => toggleButton(button.dataset.action));
  });

  document.querySelectorAll('.direction-btn').forEach((button) => {
    button.addEventListener('click', () => setDirection(button.dataset.direction));
  });

  ui.accelerator.addEventListener('input', () => {
    state.accelerator = Number(ui.accelerator.value);
  });

  ui.brake.addEventListener('input', () => {
    state.brake = Number(ui.brake.value);
  });
}

bindControls();
updateButtonStates();
updateStatus();
setInterval(simulate, 100);
