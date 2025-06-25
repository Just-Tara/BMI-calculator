document.addEventListener('DOMContentLoaded', () => {
  const bmiIndicatorDot = document.getElementById('bmiIndicatorDot');
  const circleLabel = document.getElementById('circleLabel');
  const categories = document.querySelectorAll('.category');
  const bmiRanges = document.querySelectorAll('.bmi-range-text');
  const resultEmoji = document.getElementById('resultEmoji');
  const textResult = document.getElementById('textResult');
  const bmiOutput = document.querySelector('.bmiOutput');

// theme 
  
  let selectedTheme = localStorage.getItem("theme") || "default";

  if (selectedTheme !== "default") {
    document.body.classList.add(`${selectedTheme}-theme`);
  }
  
  const diagonalStart = { x:202.5 , y: 0 };
  const diagonalEnd = { x: 135, y: 350 };

  const bmi = parseFloat(localStorage.getItem('calculatedBMI'));
  console.log('Retrieved BMI:', bmi); 

  if (isNaN(bmi)) {
    textResult.textContent = 'No BMI value found.';
    return;
  }

  const bmiData = [
    { category: 'Obese', bmiMin: 30.0, bmiMax: Infinity, emoji: '😱', resultText: 'You are Obese', pathPercent: 0.125 },
    { category: 'Overweight', bmiMin: 25.0, bmiMax: 29.9, emoji: '😟', resultText: 'You are Overweight', pathPercent: 0.375 },
    { category: 'Normal Weight', bmiMin: 18.5, bmiMax: 24.9, emoji: '😊', resultText: 'You are Normal', pathPercent: 0.625 },
    { category: 'Under Weight', bmiMin: 0, bmiMax: 18.4, emoji: '🧐', resultText: 'You are Under Weight', pathPercent: 0.875 }
  ];

  const matched = bmiData.find(range => bmi >= range.bmiMin && bmi <= range.bmiMax);

  if (!matched) {
    textResult.textContent = 'BMI not within known range.';
    return;
  }

  const x = diagonalStart.x + (diagonalEnd.x - diagonalStart.x) * matched.pathPercent;
  const y = diagonalStart.y + (diagonalEnd.y - diagonalStart.y) * matched.pathPercent;

  bmiIndicatorDot.style.left = `${x}px`;
  bmiIndicatorDot.style.top = `${y}px`;

  circleLabel.style.left = `${x}px`;
  circleLabel.style.top = `${y}px`;
  bmiOutput.textContent = `Your BMI: ${bmi.toFixed(1)}`;

  categories.forEach(cat => cat.classList.remove('active')); // Clear previous
categories.forEach(cat => {
  const catName = cat.getAttribute('data-category');
  if (catName.toLowerCase() === matched.category.toLowerCase()) {
    cat.classList.add('active');
  }
});

  resultEmoji.textContent = matched.emoji;
  textResult.textContent = matched.resultText;

  
});