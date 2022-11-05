import pop_up from './components/pop-up';
import './sass/main.scss';

const pop_menu_btn = document.querySelector('.activate-btn');
const pop_more_btn = document.querySelector('.more-btn');

const pop_up_box = document.querySelector('.pop-up-box');
const pop_close_btn = document.querySelector('.close-btn');

const moreTools_pop_box = document.querySelector('.more-tools-box');

pop_menu_btn.addEventListener('click', () => {
	pop_up(pop_up_box);
})

pop_close_btn.addEventListener('click', () => {
	pop_up(pop_up_box);
})

pop_more_btn.addEventListener('click', () => {
	pop_up(moreTools_pop_box);
})
