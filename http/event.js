function clickIt(e) {
	window.alert('Button is clicked');
}

var button = document.getElementById('test');
button.addEventListener('click', clickIt);

// EventEmitter