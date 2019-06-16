'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 100; // координата x облака
var CLOUD_Y = 10; // координата x облака
var CLOUD_GAP = 10; // величина сдвига тени

var TEXT_X = 120; // координата x текста
var TEXT_Y = 40; // координата y текста
var TEXT_GAP = 20; // величина сдвига текста

var COLUMN_WIDTH = 40; // ширина колонки
var COLUMN_HEIGHT = 150; // высота колонки
var COLUMN_GAP = 50; // расстояние между колонками
var COLUMN_X = 120; // координата x первой колонки
var COLUMN_Y = 100; // координата y первой колонки

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255,255,255,1)');

  var text = ['Ура вы победили!', 'Список результатов:'];
  printString(ctx, text);

  // максимальное время прохождения игры
  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    renderColumn(ctx, names[i], times, maxTime, i);
  }
};

var renderColumn = function (ctx, name, times, maxTime, j) {
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    var opacity = 0;
    while (opacity < 0.1) {
      opacity = Math.random();
    }
    ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    ctx.globalAlpha = opacity;
  }

  var currentColumnHeight = times[j] / maxTime * COLUMN_HEIGHT;
  ctx.fillRect(COLUMN_X + (COLUMN_WIDTH + COLUMN_GAP) * j, COLUMN_Y + COLUMN_HEIGHT - currentColumnHeight, COLUMN_WIDTH, currentColumnHeight);
  ctx.fillStyle = '#000000';
  ctx.globalAlpha = 1;
  ctx.fillText(name, COLUMN_X + (COLUMN_WIDTH + COLUMN_GAP) * j, COLUMN_Y + COLUMN_HEIGHT + TEXT_GAP); // выводим имя участника
  ctx.fillText(Math.round(times[j]), COLUMN_X + (COLUMN_WIDTH + COLUMN_GAP) * j, COLUMN_Y + COLUMN_HEIGHT - currentColumnHeight - TEXT_GAP / 2); // выводим время прохождения игры
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var printString = function (ctx, txt) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  for (var i = 0; i < txt.length; i++) {
    ctx.fillText(txt[i], TEXT_X, TEXT_Y + TEXT_GAP * i);
  }
};

var getMaxElement = function (array) {
  if (array !== '') {
    var maxElement = array[0];
    for (var i = 1; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  } else {
    return 0;
  }
};
