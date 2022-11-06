const formStates = { add: 'add', update: 'update' };
export const utilUpdateFormState = (form, classname, contact_id = "") => {
	if (classname === formStates.add)  
		form.classList.remove(formStates.update);

	if (classname === formStates.update) {
		form.classList.remove(formStates.add);
		form.setAttribute('data-id', contact_id);
	}

	form.classList.add(classname);
}

export const utilValidateForm = (contact_obj) => {
	let validation = false;

	if (contact_obj.name && contact_obj.number) 
		if (contact_obj.name.length >= 3 && contact_obj.number.length === 10) 
			validation = true;
		else
			validation = false;

	return validation;
}

export const utilExitActiveBox = (pop_up_box) => {
	const current_class_names = pop_up_box.classList;
	pop_up_box.className = current_class_names[0] + ' no-active';
}

export const utilDoesContactExist = (currentStoredData, contact_obj) => {
	let validate = false;

	currentStoredData.forEach((data) => {
		if (data.name.toLowerCase() === contact_obj.name.toLowerCase() || data.number === contact_obj.number)
			validate = true;
	})

	return validate;
}

export const utilCreateContactResponse_obj = {
	exist: 'exist',
	created: 'created'
};

// export const utilCollectionHeaders = [
// 	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
// 	"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
// ];

export const utilCreateElement = (element_name) => {
	const element = document.createElement(element_name);
	return element;
}

export const utilRender = (currentStoredData, parentElement) => {
	parentElement.innerHTML = "";

	currentStoredData.forEach((data, id) => {
		const li = document.createElement('li');
		li.className = 'collection-item avatar';

		const avatar = document.createElement('span');
		avatar.className = 'bi bi-person-rolodex circle';

		const name_wrapper = document.createElement('p');
		name_wrapper.className = 'title';
		name_wrapper.textContent = data.name;

		const number_wrapper = document.createElement('p');
		number_wrapper.className = 'number grey-text text-darken-1';
		number_wrapper.textContent = data.number;

		const secondary_text = document.createElement('span');
		secondary_text.className = 'secondary-content';
		const more_tools_icon = document.createElement('span');
		more_tools_icon.className = 'bi bi-three-dots more-btn';
		more_tools_icon.setAttribute('data-id', id);
		secondary_text.appendChild(more_tools_icon);

		const more_tools_box = document.createElement('div');
		more_tools_box.className = 'more-tools-box no-active';

		const more_tools_box_close_btn = utilCreateElement('span');
		more_tools_box_close_btn.className = 'bi bi-x-circle-fill secondary-content grey-text text-darken-3 tools-close-btn';
		more_tools_box.appendChild(more_tools_box_close_btn);

		const call_wrapper = document.createElement('p');
		const call_item = document.createElement('span');
		call_item.setAttribute('data-id', id);
		call_item.textContent = 'Call';
		call_item.className = 'tool call';
		call_wrapper.appendChild(call_item);

		const edit_wrapper = document.createElement('p');
		const edit_item = document.createElement('span');
		edit_item.setAttribute('data-id', id);
		edit_item.textContent = 'Edit';
		edit_item.className = 'tool edit';
		edit_wrapper.appendChild(edit_item);

		const delete_wrapper = document.createElement('p');
		const delete_item = document.createElement('span');
		delete_item.setAttribute('data-id', id);
		delete_item.textContent = 'Delete';
		delete_item.className = 'tool delete';
		delete_wrapper.appendChild(delete_item);

		more_tools_box.appendChild(call_wrapper);
		more_tools_box.appendChild(edit_wrapper);
		more_tools_box.appendChild(delete_wrapper);

		li.appendChild(avatar);
		li.appendChild(name_wrapper);
		li.appendChild(number_wrapper);
		li.appendChild(secondary_text);
		li.appendChild(more_tools_box);

		parentElement.append(li);
		
	})
} 
