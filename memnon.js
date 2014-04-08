(function () {

	var symbol = "&#10050;"; // aztec sun ❂
	var board = [];
	var gameState = "gameover";
	var foundCoins = 0;
	var gameTimeout;

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
			b.disabled = false;
		}
	}

	function showBoard () {
		for (var i = 0; i < 49; i += 1) {
			var b = document.querySelector("#grid_" + i);
			if (board[i]) {
				b.innerHTML = board[i];
			}
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
			var index = evt.target.id.split("_");
			index = (+index[1]);

			switch (gameState) {
				case "show":
					startGuess();
					break;
				case "guess":
					enterGuess(index);
					break;
				case "gameover":
					// no break
				case "win":
					startGame();
					break;
				default:
			} // end switch
		}
	}
	function enterGuess(index) {
		//console.log(index);
		if (hasCoin(index)) {
			console.log(index + " has a coin!");
			foundCoins += 1;
			var b = document.querySelector("#grid_" + index);
			b.innerHTML = symbol;
			b.disabled = true;
		} else {
			showBoard();
			var b = document.querySelector("#grid_" + index);
			b.innerHTML = "&times;";
			startGameOver();
		}
		checkForWin();
	}

	function startGameOver () {
		clearTimeout(gameTimeout);
		showBoard();
		gameState = "gameover";
		console.log("Game over.");

	}

	function checkForWin() {
		if (foundCoins === 7) {
			gameState = "win";
			console.log("You win!");
		}
	}

	function hasCoin(index){
		return !!board[index];
	}

	function startGame() {
		gameState = "show";
		clearBoard();
		shuffleBoard(7);
		showBoard();
		gameTimeout = setTimeout(startGuess, 7000); // ms
	}

	function startGuess() {
		// prevent restarting guess mode
		if (gameState === "guess") { return; } 

		gameState = "guess";
		foundCoins = 0;
		clearBoard();
		
		clearTimeout(gameTimeout);
		gameTimeout = setTimeout(startGameOver, 7000);
	}

	addButtonListeners();

	//startGame();

})();