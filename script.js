// DOM 元件
const dogTypeEl = document.getElementById("dogType");
const birthDateEl = document.getElementById("birthDate");
const dogAgeText = document.getElementById("dogAgeText");
const humanAgeText = document.getElementById("humanAgeText");

// 頁面載入後讀取 localStorage
window.onload = function () {
  const savedDogType = localStorage.getItem("dogType");
  const savedBirthDate = localStorage.getItem("birthDate");

  if (savedDogType) dogTypeEl.value = savedDogType;
  if (savedBirthDate) birthDateEl.value = savedBirthDate;

  // 若資料存在則自動計算
  if (savedBirthDate) calculate();
};

// 按鈕重新計算
document.getElementById("calcBtn").addEventListener("click", calculate);

function calculate() {
  const dogType = dogTypeEl.value;
  const birthDate = birthDateEl.value;

  if (!birthDate) {
    alert("請選擇小狗的出生日期！");
    return;
  }

  // 儲存資料
  localStorage.setItem("dogType", dogType);
  localStorage.setItem("birthDate", birthDate);

  // 計算年齡
  const dogAgeYears = calcDogAge(birthDate);
  const humanAge = convertToHumanAge(dogAgeYears, dogType);

  dogAgeText.textContent = dogAgeYears.toFixed(2) + " 歲";
  humanAgeText.textContent = humanAge.toFixed(1) + " 歲";
}

// 計算狗狗實際年齡（以年為單位）
function calcDogAge(birth) {
  const birthDate = new Date(birth);
  const today = new Date();

  const diffMS = today - birthDate;
  const diffYears = diffMS / (1000 * 60 * 60 * 24 * 365.25);

  return diffYears;
}

// 依體型換算成人類年齡（簡化係數可調整）
function convertToHumanAge(dogAge, type) {
  let factor;

  switch (type) {
    case "small":
      factor = 5.5;
      break;
    case "medium":
      factor = 6.5;
      break;
    case "large":
      factor = 7.5;
      break;
  }

  return dogAge * factor;
}
