const pop_up = (pop_up_box) => {
	const pop_up_box_classlist = pop_up_box.classList;
	let pop_up_class = pop_up_box_classlist[0];

	if (pop_up_box_classlist.contains('no-active'))
		pop_up_box.className = `${pop_up_class} active`;
	else 
		pop_up_box.className = `${pop_up_class} no-active`;
		
}

export default pop_up;