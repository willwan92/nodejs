function Pet() {
	this.words = '';
	this.walk = function () {
		
	};
	this.speak = function () {
		console.log('My name is ' + this.name);
		console.log(this);
	};
}

// Pet.speat();//错误写法，Pet类必须实例化后，方可调用内部方法。
var pet1 = new Pet();
pet1.speak();

function Dog(name) {
	this.name = name;
	// Pet.call(this, this.name);
	Pet.apply(this, [this.name]);
}

var tom = new Dog('tom');
tom.speak();