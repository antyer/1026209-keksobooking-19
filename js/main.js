'use strict';

var ADVERT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = ['Уютная комната', 'Просторная квартира', 'Аппартаменты', 'Квартира бизнес-класса'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var MAP_WIDTH = 1200;
var PIN_POS_YMIN = 130;
var PIN_POS_YMAX = 630;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('button');
var MAP_PINS = document.querySelector('.map__pins');

function getRandomArrayItem(arrayData) {
  var randomIndex = getRndInteger(0, (arrayData.length - 1));
  return arrayData[randomIndex];
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomLengthArray(data) {
  var newRandArray = [];
  var randIndex = getRndInteger(0, (data.length));
  for (var i = 0; i <= randIndex; i++) {
    newRandArray[i] = data[i];
  }
  return newRandArray;
}

function generateAdvertsArray() {
  var advertArray = [];
  for (var i = 1; i <= 8; i++) {
    var advert = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + i + '.png',
      },
      'offer': {
        'title': getRandomArrayItem(TITLES),
        'address': getRndInteger(0, 1000) + ', ' + getRndInteger(0, 1000),
        'price': getRndInteger(1000, 10000),
        'type': getRandomArrayItem(ADVERT_TYPES),
        'rooms': getRndInteger(1, 3),
        'guests': getRndInteger(1, 3),
        'checkin': getRandomArrayItem(CHECK_TIME),
        'checkout': getRandomArrayItem(CHECK_TIME),
        'features': getRandomLengthArray(FEATURES),
        'description': 'строка с описанием',
        'photos': getRandomLengthArray([
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ]),
        'location': {
          'x': getRndInteger(0, MAP_WIDTH),
          'y': getRndInteger(PIN_POS_YMIN, PIN_POS_YMAX)
        }
      },
    };
    advertArray.push(advert);
  }
  return advertArray;
}

function generateAdvertsDom() {
  var adverts = generateAdvertsArray();
  var fragment = document.createDocumentFragment();

  adverts.forEach(function (item) {
    var pinNew = PIN_TEMPLATE.cloneNode(true);
    pinNew.style.left = item.offer.location.x - (PIN_WIDTH / 2) + 'px';
    pinNew.style.top = item.offer.location.y - PIN_HEIGHT + 'px';
    pinNew.children[0].src = item.author.avatar;
    pinNew.children[0].alt = item.offer.title;
    fragment.appendChild(pinNew);
  });

  MAP_PINS.appendChild(fragment);
}

generateAdvertsDom();
