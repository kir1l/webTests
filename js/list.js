const dropdown2 = document.querySelector('.drop2');
const select = dropdown2.querySelector('.select');
const caret = dropdown2.querySelector('.caret');
const menu = dropdown2.querySelector('.drop2__menu');
const options = dropdown2.querySelectorAll('.drop2__menu li');
const selected = dropdown2.querySelector('.selected');
const grid = document.getElementById('grid'),
	gridItems = grid.querySelectorAll('.grid-list__item');

select.addEventListener('click', () => {
	select.classList.toggle('select-clicked');
	caret.classList.toggle('caret-rotate');
	menu.classList.toggle('menu-open');
	options.forEach((option) => {
		option.addEventListener('click', () => {
			selected.textContent = option.textContent;
			select.classList.remove('select-clicked');
			caret.classList.remove('caret-rotate');
			menu.classList.remove('menu-open');
			options.forEach((option) => {
				option.classList.remove('active');
			});
			option.classList.add('active');
			filter(option);
		});
	});
});

const filter = (option) => {
	gridItems.forEach((elem) => {
		elem.classList.remove('disabled');
		if (option.dataset.test == 'all') {
			return;
		} else if (option.dataset.test !== elem.dataset.name) {
			elem.classList.add('disabled');
		}
	});
};
