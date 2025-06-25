

const weightInput = document.getElementById('js-weight');
const heightInput = document.getElementById('js-height');
const ageInput = document.getElementById('js-age');
const calculate = document.getElementById('calculationButton');
const weightAddButton = document.getElementById('js-weight-add')
const weightSubButton = document.getElementById('js-weight-sub')
const ageAddButton = document.getElementById('js-age-add')
const ageSubButton = document.getElementById('js-age-sub')
// Theme Modal

const themeTrigger = document.getElementById("theme-trigger");
const themeModal = document.getElementById("theme-modal");
const cancelBtn = document.getElementById("cancel-btn");
const themeForm = document.getElementById("theme-form");

let selectedTheme = localStorage.getItem("theme") || "default";

// Show modal on click
themeTrigger.addEventListener("click", () => {
  // Set the currently saved theme as checked
  const currentRadio = document.querySelector(`input[name="theme"][value="${selectedTheme}"]`);
  if (currentRadio) currentRadio.checked = true;

  themeModal.classList.remove("hidden");
});

// Close modal (without saving)
cancelBtn.addEventListener("click", () => {
  themeModal.classList.add("hidden");
});

// Click outside modal to close
window.addEventListener("click", (e) => {
  if (e.target === themeModal) {
    themeModal.classList.add("hidden");
  }
});

// Apply theme on OK
themeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const chosen = themeForm.elements["theme"].value;
  document.body.classList.remove("light-theme", "dark-theme");

  if (chosen !== "default") {
    document.body.classList.add(`${chosen}-theme`);
  }

  localStorage.setItem("theme", chosen);
  selectedTheme = chosen;
  themeModal.classList.add("hidden");
});

// Apply saved theme on page load
if (selectedTheme !== "default") {
  document.body.classList.add(`${selectedTheme}-theme`);
}
// For the Weight and Age 
if (weightInput) {
  weightAddButton.addEventListener('click', () => {
    weightInput.value = parseInt(weightInput.value || 0) + 1;
  });
  weightSubButton.addEventListener('click', () => {
    weightInput.value = Math.max(0, parseInt(weightInput.value || 0) - 1);
  });
}

if (ageInput) {
  ageAddButton.addEventListener('click', () => {
    ageInput.value = parseInt(ageInput.value || 0) + 1;
  });
  ageSubButton.addEventListener('click', () => {
    ageInput.value = Math.max(0, parseInt(ageInput.value || 0) - 1);
  });
}
//for the gender design 
const genderOptions = document.querySelectorAll('.js-gender-option');

genderOptions.forEach(option => {
  option.addEventListener('click', () => {
    genderOptions.forEach(opt => opt.classList.remove('active'));

    option.classList.add('active');
  });
});


 // For the calcuation 

if (calculate) {
  calculate.addEventListener('click', (e) => {
    e.preventDefault();
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const age = parseFloat(ageInput.value);

    const selectedGender = document.querySelector('.js-gender-option.active');
 
if (!selectedGender) {
  alert('Please select a gender');
  return;
}
  
else if (height <= 0 || weight <=0  || age <= 0) {
  alert('plese enter a valid positive number for height weight and age.');
  return;
}else if (isNaN(height) || isNaN(weight) || isNaN(age)) {
  alert('please fill in the required fields');
  return;
}

console.log('Weight:', weight);
console.log('Height:', height);
console.log('Age:', age);


// BMI calcution
const bmi = weight / (height * height);
localStorage.setItem('calculatedBMI', bmi.toFixed(1)); 
window.location.href = "../views/resultSection.html";


  })
  
}
const circle = document.querySelector('.circle');
heightInput.addEventListener('input', () => {
  const maxHeight = 250;
  let height = parseFloat(heightInput.value);
  if (height <= 3) height *= 100;
  height = Math.max(0, Math.min(height, maxHeight));

  const percentage = (height / maxHeight) * 100;

  circle.style.background =`conic-gradient(#836a9e 0% ${percentage}%, #19181b ${percentage}% 100%)`;

  circle.querySelector('span').textContent =`${Math.round(height)} cm`
})



