// Timer logic
let selectedMinutes = 5;
let timerInterval = null;
let timeLeft = 0;

const durationSpan = document.getElementById('duration');
const timeLeftSpan = document.getElementById('time-left');
const timerButtons = document.querySelectorAll('.timer-buttons button[data-minutes]');
const startBtn = document.getElementById('start-timer');

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

timerButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedMinutes = parseInt(btn.getAttribute('data-minutes'));
    durationSpan.textContent = formatTime(selectedMinutes * 60);
    timeLeftSpan.textContent = formatTime(selectedMinutes * 60);
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = selectedMinutes * 60;
  });
});

startBtn.addEventListener('click', () => {
  if (timerInterval) clearInterval(timerInterval);
  timeLeft = selectedMinutes * 60;
  durationSpan.textContent = formatTime(timeLeft);
  timeLeftSpan.textContent = formatTime(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftSpan.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeLeftSpan.textContent = '00:00';
    }
  }, 1000);
});

durationSpan.textContent = formatTime(selectedMinutes * 60);
timeLeftSpan.textContent = formatTime(selectedMinutes * 60);

// Participant selector logic
const participantsInput = document.getElementById('participants');
const selectNextBtn = document.getElementById('select-next');
const selectedDiv = document.getElementById('selected-participant');
let lastIndex = -1;

selectNextBtn.addEventListener('click', () => {
  const names = participantsInput.value.split(',').map(n => n.trim()).filter(Boolean);
  if (names.length === 0) {
    selectedDiv.textContent = 'No participants';
    return;
  }
  lastIndex = (lastIndex + 1) % names.length;
  selectedDiv.textContent = names[lastIndex];
});
