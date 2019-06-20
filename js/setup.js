'use strict';
var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = []; // массив волшебников

// покажем окно настроек
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// показать блок setup-similar
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// функция генерации случайного числа
var getRandomFromInterval = function (n) {
  var random = Math.floor(Math.random() * n);
  return random;
};

var getWizard = function () {
  /* сгенерируем для каждого волшебника случайное имя */
  /* в зависимости от случайно сгенерированного флага меняем имя и фамилию местами */
  var flag = Math.round(Math.random());
  var randomName = WIZARD_NAMES[getRandomFromInterval(WIZARD_NAMES.length)];
  var randomSurname = WIZARD_SURNAMES[getRandomFromInterval(WIZARD_SURNAMES.length)];
  var wizardName = randomName + ' ' + randomSurname;
  if (flag) {
    wizardName = randomSurname + ' ' + randomName;
  }

  /* сгенерируем случайный цвет глаз */
  var randomEyesColor = EYES_COLOR[getRandomFromInterval(EYES_COLOR.length)];

  /* сгенерируем случайный цвет глаз */
  var randomCoatColor = COATS_COLOR[getRandomFromInterval(COATS_COLOR.length)];

  var wizard = {
    name: wizardName,
    eyes: randomEyesColor,
    coat: randomCoatColor
  };

  return wizard;
};

/* сформируем масси волшебников */
for (var i = 0; i < WIZARD_COUNT; i++) {
  var wizardItem = getWizard();
  wizards.push(wizardItem);
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
