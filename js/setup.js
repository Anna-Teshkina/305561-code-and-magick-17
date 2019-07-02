'use strict';
var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ENTER_CODE = 13;
var ESC_CODE = 27;

var wizards = []; // массив волшебников

// покажем окно настроек
// var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

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

/* сформируем массив волшебников */
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

var setup = document.querySelector('.setup'); // попап
var setupClose = setup.querySelector('.setup-close'); // кнопка закрыть попап
var setupOpen = document.querySelector('.setup-open'); // кнопка открыть попап
var setupIcon = setupOpen.querySelector('.setup-open-icon'); // иконка пользователя
var setupName = setup.querySelector('.setup-user-name'); // поле ввода имени пользователя
var setupSubmit = setup.querySelector('.setup-submit'); // кнопка сохранить

// закрыть окно
var closeWindow = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onWindowEcsPress);
};

// отправить форму
var sendForm = function () {
  setup.submit();
};

// закрыть окно при нажатии на ESC
var onWindowEcsPress = function (evt) {
  if ((evt.keyCode === ESC_CODE) && (setupName !== document.activeElement)) {
    closeWindow();
  }
};

// открыть окно
var openWindow = function () {
  setup.classList.remove('hidden');
  setupSubmit.addEventListener('click', sendForm);
  setupSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      sendForm();
    }
  });
  document.addEventListener('keydown', onWindowEcsPress);
};

// при нажитии на крестик окно закрывается
setupClose.addEventListener('click', closeWindow);

// при нажатии на блок пользователя окно открывается
setupOpen.addEventListener('click', openWindow);

// если икнока пользователя находится в фокусе, то открываем окно
setupIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openWindow();
  }
});

// если кнопка закрыть окно находится в фокусе, то закрываем окно
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closeWindow();
  }
});

// Изменение цвета мантии персонажа по нажатию.
var userCoat = setup.querySelector('.setup-wizard .wizard-coat');
userCoat.addEventListener('click', function () {
  var currentColor = COATS_COLOR[getRandomFromInterval(COATS_COLOR.length)];
  userCoat.style.fill = currentColor;
  setup.querySelector('input[name="coat-color"]').value = currentColor;
});

// Изменение цвета глаз персонажа по нажатию
var userEyes = setup.querySelector('.setup-wizard .wizard-eyes');
userEyes.addEventListener('click', function () {
  var currentColor = EYES_COLOR[getRandomFromInterval(EYES_COLOR.length)];
  userEyes.style.fill = currentColor;
  setup.querySelector('input[name="eyes-color"]').value = currentColor;
});

// Изменение цвета фаербола персонажа по нажатию
var userFireBall = setup.querySelector('.setup-fireball-wrap');
userFireBall.addEventListener('click', function () {
  var currentColor = FIREBALL_COLOR[getRandomFromInterval(FIREBALL_COLOR.length)];
  userFireBall.style.backgroundColor = currentColor;
  userFireBall.querySelector('input[name="fireball-color"]').value = currentColor;
});
