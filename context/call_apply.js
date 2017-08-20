var pet = {
	name: '...',
	speak: function () {
		console.log('My name is ' + this.name);
		console.log(this);
	}
};

// pet.speak();


var dog = {
	name: 'tom'
};

// pet.speak();
pet.speak.call(dog, this.name);

