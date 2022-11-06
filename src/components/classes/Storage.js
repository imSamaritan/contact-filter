import { 
	utilCreateContactResponse_obj, 
	utilDoesContactExist 
} from "../utils/utils";

const _storage_container = new WeakMap();
const _storage_item_name = new WeakMap();
const _save = Symbol();

class Storage {
	constructor(storage_item_name) {
		_storage_container.set(this, []);
		_storage_item_name.set(this, storage_item_name);
	}

	[_save](storage_name, data) {
		localStorage.setItem(storage_name, JSON.stringify(data));
		return true;
	}

	create(contact_obj) {
		const item = _storage_item_name.get(this);
		const arrayData = _storage_container.get(this);

		let currentData = localStorage.getItem(item);	

		if (currentData) {
			currentData = JSON.parse(localStorage.getItem(item));
			const contactExist = utilDoesContactExist(currentData, contact_obj);
		
			if (contactExist) 
				return utilCreateContactResponse_obj.exist;
			
			currentData.push(contact_obj);
			this[_save](item, currentData);
			return utilCreateContactResponse_obj.created;
		} 
		
		arrayData.push(contact_obj);
		this[_save](item, arrayData);
		return utilCreateContactResponse_obj.created;	
	}

	get() {
		const item = _storage_item_name.get(this);

		if (localStorage.getItem(item))	
			return JSON.parse(localStorage.getItem(item));
		else
			return [];

	}

	update(contact_id, updated_data_obj) {
		const item = _storage_item_name.get(this);
		const currentData = this.get()

		console.log('current data now : ', currentData);

		currentData[contact_id].name = updated_data_obj.name;
		currentData[contact_id].number = updated_data_obj.number;

		return this[_save](item, currentData);
	}

	delete(contact_id) {
		const item = _storage_item_name.get(this);
		const currentData = JSON.parse(localStorage.getItem(item));

		currentData.splice(contact_id, 1);
		return this[_save](item, currentData);
	}

}

export default Storage;