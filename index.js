//создаем массив клавиш
let keyboardBtns = {
  en: [
    [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
    ],
    [
      "Tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "[",
      "]",
      "\\",
      "Del",
    ],
    [
      "Caps lock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "Enter",
    ],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", "space", "Alt", "◄", "▼", "►", "Ctrl"],
  ],
  ru: [
    [
      "ё",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
    ],
    [
      "Tab",
      "й",
      "ц",
      "у",
      "к",
      "е",
      "н",
      "г",
      "ш",
      "щ",
      "з",
      "х",
      "ъ",
      "\\",
      "Del",
    ],
    [
      "Caps lock",
      "ф",
      "ы",
      "в",
      "а",
      "п",
      "р",
      "о",
      "л",
      "д",
      "ж",
      "э",
      "Enter",
    ],
    ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", "space", "Alt", "◄", "▼", "►", "Ctrl"],
  ],
};




// Создаем TextArea
const textarea = document.createElement("textarea");
textarea.classList.add('textarea');
document.body.appendChild(textarea);


function handleKeyPress(key) {
  const textarea = document.querySelector("textarea");
    switch (key) {
      case 'Backspace':
        textarea.value = textarea.value.slice(0, -1);
        break;
      case 'Tab':
        textarea.value += '\t';
        break;
      case 'CapsLock':
        capsLockEnabled = !capsLockEnabled;
        updateKeyboard();
        break;
      case 'Enter':
        textarea.value += '\n';
        break;
      case "Space":
        textarea.value += " ";
        break;
      case 'Shift':
        break;
      case 'Ctrl':
      case 'Win':
      case 'Alt':
        break;
      default:
        textarea.value += capsLockEnabled ? key.toUpperCase() : key.toLowerCase();
        break;
    }
  }

  // Смена языка
  let lang = 'en';
  document.addEventListener("keydown", function (event) {
    if (event.shiftKey && event.altKey) {
      toggleLang();
      addLanguage();
    }
  });

// Функция смены языка
const toggleLang = () => {
  if (language === "en") {
    lang = "ru";
  } else {
    lang = "en";
  }
  localStorage.setItem("language", lang);
  selectKeyboard();
};


// Создаем блок клавиатуры и блоки кнопок клавиатуры
const selectKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.id = 'keyboard';
  const firstEl = document.body.firstChild;
  document.body.insertBefore(keyboard, firstEl);
  const keyboardBtnsLang = keyboardBtns[lang];
  for (let i = 0; i < keyboardBtnsLang.length; i++) {
    const rowBtns = keyboardBtnsLang[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("keyboard-row");
    for (let j = 0; j < rowBtns.length; j++) {
      const key = rowBtns[j];
      const keyEl = document.createElement("div");
      keyEl.classList.add("key");
      keyEl.textContent = key;
      keyEl.setAttribute('data-code', key);
      switch (key) {
        case "Backspace":
          keyEl.classList.add("backspace");
          break;
        case "Tab":
          keyEl.classList.add("tab");
          break;
        case "Del":
          keyEl.classList.add("del");
          break;
        case "Caps lock":
          keyEl.setAttribute("class", "CapsLock key");
          keyEl.classList.add("caps-lock");
          break;
        case "Enter":
          keyEl.classList.add("enter");
          break;
        case "Shift":
          keyEl.classList.add("shift");
          break;
        case "Ctrl":
          keyEl.classList.add("ctrl");
          break;
        case "Alt":
          keyEl.classList.add("alt");
          break;
        case "space":
          keyEl.classList.add("space");
          break;
      }
      rowElement.appendChild(keyEl);
    }
    keyboard.appendChild(rowElement);
  }
}
selectKeyboard();



// Добавление и удаление класса для клавиш
const keys = document.querySelectorAll(".key");

// keys.forEach(key => {
//   const code = key.textContent;
//   key.setAttribute('data', `${code}`);
//   // if (key.data === '') {
//   //   this.setAttribute('data', 'space')
//   // }
// });


document.addEventListener('keydown', event => {
  console.log(event.code)
  const key = document.querySelector(`.key[data-code="${event.code}"]`);
  if (key) {
    key.classList.add('active');
  }
});
document.addEventListener('keyup', event => {
  const key = document.querySelector(`.key[data-code="${event.code}"]`);
  if (key) {
    key.classList.remove('active');
  }
});

// document.addEventListener('keydown', event => {
//   console.log(event.key)
//   keys.forEach(key => {
//     key.classList.remove('active');
//   });
//   document.querySelector('.key[data="' + event.key + '"]').classList.add('active');
// });


// keys.forEach(key => {
//   key.addEventListener('mousedown', () => {
//     key.classList.add('active');
//   });
//   key.addEventListener('mouseup', () => {
//     key.classList.remove('active');
//   });
// })
keys.forEach(function (element) {
  element.onclick = function (element) {
    keys.forEach(function (element) {
      element.classList.remove("active");
    });
    this.classList.add("active");
  };
});




// document.onkeydown = function (event) {
//   console.log(event.code);
//   keys.forEach(function (element) {
//     element.classList.remove("active");
//   });
//   event.classList.add("active");
// };


// function init() {
//   let out = '';
//   for (let i=0;i<keyboardBtns.length;i++) {
//     if (i==12) {
//       out += '<div class="clearfix"></div>';
//     }
//     if (i==23) {
//       out += '<div class="clearfix"></div>';
//     }
//     out += '<div class="key" data="' + keyboardBtns[i] + '">' + keyboardBtns[i] + '</div>';
//   }
//   document.querySelector('#keyboard').innerHTML = out;
// }
// init();

// document.onkeydown = function(event) {
//  console.log(event.key); 
//  document.querySelectorAll('.key').forEach(function(element){

//  element.classList.remove('active');
//  })

//  document.querySelector('.key[data="' + event.key + '"]').classList.add('active');

//  // Добавляем класс к элементу клавиши
// };

// const keyboardBtns = {
//   en: [
//     ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
//     ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
//     ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
//     ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
//     ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Win', 'Ctrl']
//   ],
//   ru: [
//     ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
//     ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
//     ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
//     ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift'],
//     ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Win', 'Ctrl']
//   ]
// };

// const keyboard = document.getElementById('keyboard');
// const inputField = document.getElementById('input-field');
// let currentLanguage = 'en';
// let capsLockEnabled = false;

// function createKeyboard(language) {
//   keyboard.innerHTML = '';
//   keyboardBtns[language].forEach(row => {
//     const rowElement = document.createElement('div');
//     rowElement.classList.add('keyboard-row');
//     row.forEach(key => {
//       const keyElement = document.createElement('button');
//       keyElement.classList.add('keyboard-key');
//       keyElement.textContent = key;
//       keyElement.addEventListener('click', () => {
//         handleKeyPress(key);
//       });
//       rowElement.appendChild(keyElement);
//     });
//     keyboard.appendChild(rowElement);
//   });
// }

// 

// function updateKeyboard() {
//   const keys = keyboard.querySelectorAll('.keyboard-key');
//   keys.forEach(key => {
//     const keyText = key.textContent;
//     if (keyText.length === 1) {
//       key.textContent = capsLockEnabled ? keyText.toUpperCase() : keyText.toLowerCase();
//     }
//   });
// }

// createKeyboard(currentLanguage);

// document.getElementById('language-switch').addEventListener('click', () => {
//   currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
//   createKeyboard(currentLanguage);
// });

// document.addEventListener('keydown', event => {
//   const key = event.key;
//   const keyElement = keyboard.querySelector(`#${key}`);
//   if (keyElement) {
//     keyElement.classList.add('active');
//     handleKeyPress(key);
//   }
// });

// document.addEventListener('keyup', event => {
//   const key = event.key;
//   const keyElement = keyboard.querySelector(`#${key}`);
//   if (keyElement) {
//     keyElement.classList.remove('active');
//   }
// });