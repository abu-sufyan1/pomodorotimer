// Clear localStorage and sessionStorage on page reload
// window.addEventListener('beforeunload', () => {
//  localStorage.clear();
//  sessionStorage.clear();
// });

// Global variables
let timeLeft = 38 * 60; // seconds
let timerInterval;
let currentInterval = 'pomodoro';
let backgroundColor = '#F1F1EF'; // Default background color
let fontColor = '#37352F'; // Default font color
let focusTime = 38 * 60; // Default focus time in seconds
let breakTime = 22 * 60; // Default break time in seconds
let longBreakTime = 30 * 60; // Default long break time in seconds

// DOM elements
const timeLeftEl = document.getElementById('time-left');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const pomodoroIntervalBtn = document.getElementById('pomodoro-interval-btn');
const shortBreakIntervalBtn = document.getElementById('short-break-interval-btn');
const longBreakIntervalBtn = document.getElementById('long-break-interval-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.querySelector('.close-btn');
const backgroundColorSelect = document.getElementById('background-color');
const fontColorSelect = document.getElementById('font-color');
const saveBtn = document.getElementById('save-btn');
const focusTimeInput = document.getElementById('focus-time');
const breakTimeInput = document.getElementById('break-time');
const longBreakTimeInput = document.getElementById('long-break-time');

// Event listeners for interval buttons
pomodoroIntervalBtn.addEventListener('click', () => {
  stopTimer();
  currentInterval = 'pomodoro';
  timeLeft = focusTime;
  if (shortBreakIntervalBtn.classList.contains('selected-interval-button')) {
    shortBreakIntervalBtn.classList.remove('selected-interval-button');
  }
  if (longBreakIntervalBtn.classList.contains('selected-interval-button')) {
    longBreakIntervalBtn.classList.remove('selected-interval-button');
  }
  pomodoroIntervalBtn.classList.add('selected-interval-button');
  updateTimeLeftTextContent();
});

shortBreakIntervalBtn.addEventListener('click', () => {
  stopTimer();
  if (pomodoroIntervalBtn.classList.contains('selected-interval-button')) {
    pomodoroIntervalBtn.classList.remove('selected-interval-button');
  }
  if (longBreakIntervalBtn.classList.contains('selected-interval-button')) {
    longBreakIntervalBtn.classList.remove('selected-interval-button');
  }
  shortBreakIntervalBtn.classList.add('selected-interval-button');
  currentInterval = 'short-break';
  timeLeft = breakTime;
  updateTimeLeftTextContent();
});

longBreakIntervalBtn.addEventListener('click', () => {
  stopTimer();
  if (pomodoroIntervalBtn.classList.contains('selected-interval-button')) {
    pomodoroIntervalBtn.classList.remove('selected-interval-button');
  }
  if (shortBreakIntervalBtn.classList.contains('selected-interval-button')) {
    shortBreakIntervalBtn.classList.remove('selected-interval-button');
  }
  longBreakIntervalBtn.classList.add('selected-interval-button');
  currentInterval = 'long-break';
  timeLeft = longBreakTime;
  updateTimeLeftTextContent();
});

// Event listener for start/stop button
startStopBtn.addEventListener('click', () => {
  if (startStopBtn.textContent === 'Start') {
    startTimer();
    startStopBtn.textContent = 'Stop';
  } else {
    stopTimer();
  }
});

// Event listener for reset button
resetBtn.addEventListener('click', () => {
  stopTimer();
  if (currentInterval === 'pomodoro') {
    timeLeft = focusTime;
  } else if (currentInterval === 'short-break') {
    timeLeft = breakTime;
  } else {
    timeLeft = longBreakTime;
  }
  updateTimeLeftTextContent();
  startStopBtn.textContent = 'Start';
});

// Event listener for settings button
settingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'flex';
});

// Event listener for close button in the settings modal
closeModalBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

// Event listener for save button in the settings modal
saveBtn.addEventListener('click', () => {
  const newBackgroundColor = backgroundColorSelect.value;
  const newFontColor = fontColorSelect.value;
  focusTime = parseInt(focusTimeInput.value) * 60;
  breakTime = parseInt(breakTimeInput.value) * 60;
  longBreakTime = parseInt(longBreakTimeInput.value) * 60;

  // Save preferences to localStorage
  localStorage.setItem('backgroundColor', newBackgroundColor);
  localStorage.setItem('fontColor', newFontColor);
  localStorage.setItem('focusTime', focusTime);
  localStorage.setItem('breakTime', breakTime);
  localStorage.setItem('longBreakTime', longBreakTime);

  // Apply the new saved preferences
  applyUserPreferences();

  // Update the timeLeft variable based on the current interval
  if (currentInterval === 'pomodoro') {
    timeLeft = focusTime;
  } else if (currentInterval === 'short-break') {
    timeLeft = breakTime;
  } else {
    timeLeft = longBreakTime;
  }

  // Update the time left text content
  updateTimeLeftTextContent();

  // Close the modal after saving preferences
  settingsModal.style.display = 'none';
});

// Function to start the timer
function startTimer() {
  const startTime = new Date().getTime();
  localStorage.setItem('startTime', startTime);
  localStorage.setItem('currentInterval', currentInterval);

  runTimerInterval(startTime);
}

// Function to run the timer interval
function runTimerInterval(startTime) {
  timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timeLeft = getTimeLeft(elapsedTime);

    updateTimeLeftTextContent();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      ringBell();
      startStopBtn.textContent = 'Start';
      switchInterval();
      startTimer();
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  startStopBtn.textContent = 'Start';
}

// Function to update the time left text content
function updateTimeLeftTextContent() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeLeftEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to ring a bell when the timer is over
function ringBell() {
  const bell = new Audio('school_bell.mp3');
  bell.play();
}

// Function to switch to the next interval
function switchInterval() {
  if (currentInterval === 'pomodoro') {
    timeLeft = breakTime;
    currentInterval = 'short-break';
  } else if (currentInterval === 'short-break') {
    timeLeft = longBreakTime;
    currentInterval = 'long-break';
  } else {
    timeLeft = focusTime;
    currentInterval = 'pomodoro';
  }
}

// Function to get the remaining time based on elapsed time
function getTimeLeft(elapsedTime) {
  if (currentInterval === 'pomodoro') {
    return focusTime - elapsedTime;
  } else if (currentInterval === 'short-break') {
    return breakTime - elapsedTime;
  } else {
    return longBreakTime - elapsedTime;
  }
}

// Function to apply the user's saved preferences
function applyUserPreferences() {
  // Retrieve user preferences from localStorage
  const savedBackgroundColor = localStorage.getItem('backgroundColor');
  const savedFontColor = localStorage.getItem('fontColor');
  const savedFocusTime = localStorage.getItem('focusTime');
  const savedBreakTime = localStorage.getItem('breakTime');
  const savedLongBreakTime = localStorage.getItem('longBreakTime');
  const savedStartTime = localStorage.getItem('startTime');
  const savedCurrentInterval = localStorage.getItem('currentInterval');

  // Apply the preferences if they exist in localStorage
  if (savedBackgroundColor) {
    backgroundColor = savedBackgroundColor;
  }

  if (savedFontColor) {
    fontColor = savedFontColor;
  }

  if (savedFocusTime) {
    focusTime = parseInt(savedFocusTime);
  }

  if (savedBreakTime) {
    breakTime = parseInt(savedBreakTime);
  }

  if (savedLongBreakTime) {
    longBreakTime = parseInt(savedLongBreakTime);
  }

  if (savedCurrentInterval) {
    currentInterval = savedCurrentInterval;
    if (currentInterval == 'pomodoro') {
      pomodoroIntervalBtn.classList.add('selected-interval-button');
    } else if (currentInterval == 'short-break') {  
      shortBreakIntervalBtn.classList.add('selected-interval-button');
    } else {
      longBreakIntervalBtn.classList.add('selected-interval-button');
    }
  }
  else {
    pomodoroIntervalBtn.classList.add('selected-interval-button');
  }

  // Apply the preferences to the Pomodoro Timer widget
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = fontColor;
  timeLeftEl.style.color = fontColor;
  // Update the buttons' font and background color
  const buttons = document.querySelectorAll('.interval-btn, #start-stop-btn, #reset-btn, #settings-btn');
  buttons.forEach((button) => {
    button.style.color = fontColor;
    button.style.backgroundColor = backgroundColor;
    button.style.borderColor = fontColor;
  });

  // Calculate the remaining time based on the saved start time
  if (savedStartTime) {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - savedStartTime) / 1000);
    timeLeft = getTimeLeft(elapsedTime);

    if (timeLeft <= 0) {
      ringBell();
      switchInterval();
      timeLeft = getTimeLeft(0); // Reset timeLeft for the next interval
    } else {
      startStopBtn.textContent = 'Stop';
      runTimerInterval(savedStartTime); // Restart the timer if there is remaining time
    }
  }

  // Update the time left text content
  updateTimeLeftTextContent();
}

// Apply user preferences on page load
applyUserPreferences();