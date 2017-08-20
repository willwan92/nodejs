function Pet() {
	this.words = '';
	this.walk = function () {
		
	};
	this.speak = function () {
		console.log('My name is ' + this.name);
		console.log(this);
	};
}

function Dog(name) {
	this.name = name;
	// Pet.call(this, this.name);
	Pet.apply(this, [this.name]);
}

var tom = new Dog('tom');
tom.speak();