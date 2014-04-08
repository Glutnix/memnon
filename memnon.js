(function () {

	var symbol = "&#10050;"; // aztec sun ❂
	var board = [];

	function initBoard() {
		board = [];
		for (var i = 0; i < 49; i += 1) {
			board.push("");
		}
	}

	function clearBoard () {
		for (var i = 0; i < 49; i += 1) {
			var b = document.querySelector("#grid_" + i);
			b.innerHTML = "";
		}
	}

	function showBoard () {
		for (var i = 0; i < 49; i += 1) {
			var b = document.querySelector("#grid_" + i);
			b.innerHTML = board[i];
		}
	}

	function shuffleBoard(numberOfTargets) {
		initBoard();
		for (var i = 0; i < numberOfTargets; i += 1) {
			board[i] = symbol;
		}
		// shuffle board array
		board.shuffle();
	}

	function addButtonListeners() {
		// for (var i = 0; i < 49; i += 1) {
		// 	var b = document.querySelector("#grid_" + i);
		// 	b.addEventListener('click', gridButton_click);
		// }
		var c = document.querySelector("#container");
		c.addEventListener('click', container_click);
	}

	function container_click(evt) {
		if (evt.target.tagName.toLowerCase() === "button") {
			//console.log("clicked button #" + evt.target.id);
			var index = evt.target.id.split("_");
			index = (+index[1]);
			//console.log(index);
			if (hasCoin(index)) {
				console.log(index + " has a coin!");
			}
		}
	}

	function hasCoin(index){
		return !!board[index];
	}

	addButtonListeners();

	shuffleBoard(7);
	showBoard();

})();