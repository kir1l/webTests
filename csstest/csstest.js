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
		question: 'Какое свойство CSS предназначено для задания направления текста?',
		options: ['content', 'word-wrap', 'text-indent', 'writing-mode'],
		rightAnswer: 3,
	},
	{
		question: 'Являются ли одинаковыми селекторы .block и .BLOCK в HTML и CSS?',
		options: ['да', 'может быть', 'нет', 'не знаю'],
		rightAnswer: 2,
	},
	{
		question: 'Укажите CSS свойство, позволяющее изменять прозрачность элементов:',
		options: ['opacity', 'display', 'transparency', 'font-family'],
		rightAnswer: 0,
	},
	{
		question: 'Для чего служит свойство font-variant?',
		options: [
			'Преобразования текста в малые заглавные буквы',
			'Установки межсимвольного расстояния в тексте',
			'Такого свойства нет в CSS',
			'Оформления начертанием текста',
		],
		rightAnswer: 3,
	},
	{
		question: 'Какое из перечисленных CSS правил использует псевдокласс?',
		options: ['а - span {color: blue }', '* { color:blue }', 'a:visited { color: blue }', 'a::after { color: blue }'],
		rightAnswer: 2,
	},
	{
		question: 'Какова специфичность “li.red.leve”?',
		options: ['2,0,0,1', '0,0,1,1', '0,2,0,1', '0,0,2,1'],
		rightAnswer: 3,
	},
	{
		question: 'Выберите вариант CSS-кода, который устанавливает жирный шрифт для всех элементов <p>.',
		options: ['p { font-size: bold; }', 'p { font-weight: bold; }', 'p { font-style: bold; }', 'p { text-style: bold; }'],
		rightAnswer: 1,
	},
	{
		question: 'Медиа-запросы нельзя использовать в случаях работы с',
		options: ['CSS директивой @include', 'CSS директивой @queries', 'CSS директивой @media'],
		rightAnswer: 1,
	},
	{
		question: 'Какого значения свойства position нет в CSS?',
		options: ['static', 'absolute', 'flex', 'fixed'],
		rightAnswer: 2,
	},
	{
		question: 'Что из перечисленного ниже имеет наибольшую приоритетность в CSS?',
		options: ['Inline-стиль', 'id', 'Селектор тега', 'Селектор класса'],
		rightAnswer: 0,
	},
	{
		question: 'Каким образом с помощью CSS можно центрировать inline контент блочного элемента (например, <div>) по горизонтали?',
		options: ['text-align: center;', 'align-items: center;', 'vertical-align: center;', 'padding: auto;'],
		rightAnswer: 0,
	},
	{
		question: 'Какой из указанных CSS-селекторов называется универсальным селектором и выбирает любые элементы?',
		options: ['#all', '~', '*', '+'],
		rightAnswer: 2,
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
