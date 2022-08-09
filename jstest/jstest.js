/*=======================ЛОГИКА ТЕСТА=====================*/

// prettier-ignore
// все кнопки ответа
const option1 = document.querySelector('.option1'),
	  option2 = document.querySelector('.option2'),
	  option3 = document.querySelector('.option3'),
	  option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

// prettier-ignore
const question = document.getElementById('question'), // заголовок вопроса
	  numberOfquestion = document.getElementById('number-of-question'),
	  numberOfAllquestions = document.getElementById('number-of-all-questions');

let indexOfQueston, //индекс текущего вопроса
	indexOfPAge = 0; // индекс страницы

const answersTracker = document.getElementById('ansvers-tracker'); // трекер правильного ответа
const btnNext = document.getElementById('btn-next');

let score = 0; // резултат теста

// prettier-ignore
// элементы модального окна
const totalCorrectAnswers = document.querySelector('.correct-answers'), // всего правильных ответов
	  numberOfAllquestions2 = document.querySelector('.all-questions'), // всего вопросов
      btnTryAgain = document.getElementById('btn-try-again'),        // кнопка начать заново
      percentOut = document.querySelector('.percent-out');

// массив вопросов
const questions = [
	{
		question: 'С какого слова начинается условие?',
		options: ['else', 'if', 'at', 'function'],
		rightAnswer: 1,
	},
	{
		question: 'Что выполняется в коде? "animals.push(‘попугай’);"',
		options: [
			'добавление элемента в начало массива',
			'добавление элемента в конец массива',
			'удаление элемента в конце массива',
			'удаление элемента в начале массива',
		],
		rightAnswer: 1,
	},
	{
		question: 'Какой оператор прибавляет к числу единицу?',
		options: ['++', '--', '&&', '||'],
		rightAnswer: 0,
	},
	{
		question: 'Для чего нужна функция getElementById()?',
		options: ['ввод текста', 'добавление элемента в массив', 'поиск элемента в HTML по его ID', 'поиск текста'],
		rightAnswer: 2,
	},
	{
		question: 'В какой строке ошибка?',
		options: ['var a;', 'a = 3;', 'var a = 3;', 'var = 3;'],
		rightAnswer: 3,
	},
	{
		question: 'С помощью какого оператора можно найти остаток от деления?',
		options: ['?', '--', '**', '%'],
		rightAnswer: 3,
	},
	{
		question: 'Как преобразовать введённую строку в число?',
		options: [
			'var a  = Number(prompt("Введите число"))',
			'var a = (Number)(prompt("Введите число"))',
			'var a  = (Number)prompt("Введите число")',
			'var a  = prompt("Введите число")',
		],
		rightAnswer: 0,
	},
	{
		question: 'Что выведет этот код? "let y = 1; let x = y = 2; alert(x)"',
		options: ['1', 'x', 'y = 2', '2'],
		rightAnswer: 3,
	},
	{
		question: 'Что делает оператор "===" ?',
		options: [
			'Проверяет правильность введённых данных',
			'Сравнивает без приведения типа',
			'Нет такого оператора',
			'Сравнивает с приведением типов',
		],
		rightAnswer: 1,
	},
	{
		question: 'Где верно указан запуск всплывающего окна?',
		options: ['info ("Hi")', 'Нет верных вариантов', 'new alert ("Hi")', 'alert ("Hi")'],
		rightAnswer: 3,
	},
	{
		question: 'В чем отличие между локальной и глобальной переменной?',
		options: [
			'Отличий нет',
			'Локальные можно переопределять, глобальные нельзя',
			'Глобальные можно переопределять, локальные нельзя',
			'Глобальные видны повсюду, локальные только в функциях',
		],
		rightAnswer: 3,
	},
	{
		question: 'Какие циклы есть в языке JavaScript?',
		options: [
			'for, forMap, foreach, while',
			'for, while, do while',
			'for, forMap, foreach, while, do while',
			'for, while, do while, foreach',
		],
		rightAnswer: 1,
	},
];

numberOfAllquestions.textContent = questions.length; // выводим количество всех впоросов

const fillQuestions = () => {
	question.textContent = questions[indexOfQueston].question; // заполнение заголовка вопроса

	// заполнение самих впоросов
	option1.textContent = questions[indexOfQueston].options[0];
	option2.textContent = questions[indexOfQueston].options[1];
	option3.textContent = questions[indexOfQueston].options[2];
	option4.textContent = questions[indexOfQueston].options[3];

	numberOfquestion.textContent = indexOfPAge + 1; // установка номера текущей страницы
	indexOfPAge++; // увеличение индекса страницы
};

let completedAnswers = []; // массив с рандом индексами вопросов

// функция рандома вопросов
const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length); // рандом от 0 до кол.ва вопросов
	let hitDublicate = false;

	if (indexOfPAge == questions.length) {
		quizOver(); // конец игры
	} else {
		if (completedAnswers.length > 0) {
			completedAnswers.forEach((item) => {
				//проверка на схожеть индекаса впоросов
				if (item == randomNumber) {
					hitDublicate = true;
				}
			});
			if (hitDublicate) {
				randomQuestion(); // если индексы вопросов одинаковые, рестарт функции
			} else {
				indexOfQueston = randomNumber;
				fillQuestions();
			}
		}
		if (completedAnswers == 0) {
			indexOfQueston = randomNumber;
			fillQuestions();
		}
	}
	completedAnswers.push(indexOfQueston);
};

// проверка на правильность ответа
const checkAnswer = (el) => {
	if (el.target.dataset.id == questions[indexOfQueston].rightAnswer) {
		el.target.classList.add('correct');
		fillAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		fillAnswerTracker('wrong');
	}
	disabledOptins();
};

//блокировка повторного нажатия на ответ
const disabledOptins = () => {
	optionElements.forEach((item) => {
		item.classList.add('disabled');
		if (item.dataset.id == questions[indexOfQueston].rightAnswer) {
			item.classList.add('correct');
		}
	});
};

// блокировка повторного нажатия на ответ
const enableOptions = () => {
	optionElements.forEach((item) => {
		item.classList.remove('disabled', 'correct', 'wrong');
	});
};

//заполнение answersTracker кружками с подсветкой
const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	});
};

// окрашивание кружков правильно/неправильно
const fillAnswerTracker = (status) => {
	answersTracker.children[indexOfPAge - 1].classList.add(`${status}`);
};

// проверка, ответил ли пользователь
const validate = () => {
	if (!optionElements[0].classList.contains('disabled')) {
		document.querySelector('.alert__box').textContent = 'вам нужно выбрать один из вариантов ответа';
	} else {
		randomQuestion();
		enableOptions();
		document.querySelector('.alert__box').textContent = '';
	}
};

btnNext.addEventListener('click', validate);

optionElements.forEach((element) => {
	element.addEventListener('click', (e) => checkAnswer(e));
});

// модальное окно конца теста
const quizOver = () => {
	document.querySelector('.quiz-over-modal').classList.add('modal-active');
	totalCorrectAnswers.textContent = score;
	numberOfAllquestions2.textContent = questions.length;
	percentOut.textContent = Math.floor((score / questions.length) * 100);
};

const tryAgain = () => {
	window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
});
