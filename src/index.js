import Storage from './components/classes/Storage';
import pop_up from './components/pop-up';
import { 
	utilCreateContactResponse_obj, 
	utilCreateElement, 
	utilExitActiveBox, 
	utilRender, 
	utilUpdateFormState, 
	utilValidateForm
} from './components/utils/utils';
import './sass/main.scss';

const ULCollection = document.querySelector('.collection');
// const UInumber_of_contacts = document.querySelector('number-of-contacts');

const pop_up_box = document.querySelector('.pop-up-box');
const pop_menu_btn = document.querySelector('.activate-btn');
const pop_close_btn = document.querySelector('.close-btn');

const add_contact_form = document.querySelector('#contact-form');
const filter_form = document.querySelector('#filter-form');

const storage = new Storage('contacts');

const render = () => {
	const currentStoredData = storage.get();

	if (currentStoredData.length != 0)
		utilRender(currentStoredData, ULCollection);
	else 
		ULCollection.innerHTML = "";
}
render();

pop_menu_btn.addEventListener('click', () => {
	utilUpdateFormState(add_contact_form, 'add');
	add_contact_form.reset();
	pop_up(pop_up_box);
})

pop_close_btn.addEventListener('click', () => {
	utilExitActiveBox(pop_up_box);
	utilUpdateFormState(add_contact_form, 'add');
	add_contact_form.reset();
})

add_contact_form.addEventListener('submit', (e) => {
	e.preventDefault();
		const contact_name = add_contact_form['name'];
		const contact_number = add_contact_form['number'];
	
		const contact = {
			name: contact_name.value.trim(),
			number: contact_number.value.trim()
		}
		
	if (add_contact_form.classList.contains('add')) {

		const validate = utilValidateForm(contact);

		if (validate) {
			const create_contact = storage.create(contact);
	
			if (create_contact === utilCreateContactResponse_obj.created) 
				console.log(create_contact);
			else {
				console.log(create_contact);
				return;
			}
		}
		else {
			console.log('Invalid user input to add a contact');
			return;
		}
	}

	if (add_contact_form.classList.contains('update')) {
		const contact_id = add_contact_form.getAttribute('data-id');
		const validate = utilValidateForm(contact);

		if (validate) 
			storage.update(contact_id, contact);
		else {
			console.log('Invalid user input to add a contact');
			return;
		}
	}

	utilExitActiveBox(pop_up_box);
	add_contact_form.reset();
	render();
})

filter_form.addEventListener('submit', (e) => (e.preventDefault()))

window.addEventListener('load', () => {
	const form_filter_input = filter_form['filter']; 

	form_filter_input.addEventListener('keyup', ({ target }) => {
		const filter_value = target.value.toLowerCase();
		const contact_names = ULCollection.querySelectorAll('li .title');

		contact_names.forEach((name) => {
			const collection_item = name.parentElement;
			name = name.textContent.toLowerCase();
			
			if (name.indexOf(filter_value) != -1) 
				collection_item.style.display = 'block';
			else
				collection_item.style.display = 'none';

		})
	})

	window.addEventListener('click', ({ target }) => {
		if (target.classList.contains('more-btn')) {
			const relatedMoreToolsBox = target.parentElement.nextElementSibling;
			pop_up(relatedMoreToolsBox);
		}
	})

	window.addEventListener('click', ({ target }) => {
		if (target.classList.contains('tool')) {
			const contact_id = target.getAttribute('data-id');
			const collection_item = target.closest('li.collection-item');
			const relatedMoreToolsBox = collection_item.querySelector('.more-tools-box');
			
			const currentData = storage.get();
			const current_item_data = currentData[contact_id];

			if (target.classList.contains('call')) {
				const anchorTag = utilCreateElement('a');
			
				anchorTag.href = `tel:${current_item_data.number}`;
				console.log(anchorTag);
				anchorTag.click();
			}

			if (target.classList.contains('edit')) {
				add_contact_form['name'].value = current_item_data.name;
				add_contact_form['number'].value = current_item_data.number;

				utilUpdateFormState(add_contact_form, 'update', contact_id);
				pop_up(pop_up_box);
			}			

			if (target.classList.contains('delete')) {
				const delete_contact = storage.delete(contact_id);
				if (delete_contact) {
					render();
				}
			}

			utilExitActiveBox(relatedMoreToolsBox);
		}
	})

	window.addEventListener('click', ({ target }) => {
		if (target.classList.contains('tools-close-btn')) {
			utilExitActiveBox(target.parentElement);
		}
	})
})