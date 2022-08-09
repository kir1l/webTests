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
		question: 'Какой селектор соответствует любому элементу на странице?',
		options: ['.', '#', '*', 'body'],
		rightAnswer: 2,
	},
	{
		question: 'Какой селектор соответствует уникальному идентификатору элемента?',
		options: ['#', 'id', '.', '*'],
		rightAnswer: 0,
	},
	{
		question: 'где здесь селектор класса?',
		options: ['calss', 'cl', '.', '~'],
		rightAnswer: 2,
	},
	{
		question: 'Где здесь используется контекстный селектор?',
		options: ['$', 'ul li', '?', '!'],
		rightAnswer: 1,
	},
	{
		question: 'Где здесь используется селектор по типу элемента?',
		options: ['.ul {color: red;}', '#nav {color: red;}', 'a {color: red;}', '* {color: red;}'],
		rightAnswer: 2,
	},
	{
		question: 'Где здесь используется соседний селектор?',
		options: ['.top ul {color: green}', '#menu * {color: green}', 'ul + p {color: green}', 'li'],
		rightAnswer: 2,
	},
	{
		question: 'Какой селектор выберет только первый элемент, следующий сразу же за указанным элементом',
		options: ['+', '~', '.', '#'],
		rightAnswer: 1,
	},
	{
		question: 'Где здесь псевдокласс отрицания?',
		options: ['div !== #container', 'div not #container', 'div !#container', 'div:not(#container)'],
		rightAnswer: 3,
	},
	{
		question: 'Какой псевдокласс выберет третий элемент в списке?',
		options: ['li > 3', 'li * 3', 'li:nth-child(3)', 'li:3'],
		rightAnswer: 2,
	},
	{
		question: 'какой селектор выберет только те ссылки, у которых имеется указанный атрибут',
		options: ['a + title', 'a[title]', 'a <include> title', 'title in a'],
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
