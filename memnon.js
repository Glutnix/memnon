(function () {

	var symbol = "&#10050;"; // aztec sun ❂
	var board = [];
	var gameState = "gameover";
	var foundCoins = 0;
	var gameTimeout;
	var status = document.querySelector("#status");
	var levelStatus = document.querySelector("#level");
	var levels = [3, 5, 7, 10, 10];
	var memoryTime = 7000;
	var recallTime = 7000;
	var currentLevel = 0;

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
			b.className = "";
		}
	}

	function enableBoard () {
		for (var i = 0; i < 49; i += 1) {
			var b = document.querySelector("#grid_" + i);
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
				case "finished":
					currentLevel = 0;
					// no break
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
			b.className = "found";
		} else {
			enableBoard();
			showBoard();
			var b = document.querySelector("#grid_" + index);
			b.innerHTML = "&times;";
			b.className = "oops";
			startGameOver();
		}
		checkForWin();
	}

	function startGameOver () {
		clearTimeout(gameTimeout);
		showBoard();
		gameState = "gameover";
		currentLevel = 0;
		status.innerHTML = "Game over! Click to play again.";
		console.log("Game over.");

	}

	function checkForWin() {
		if (foundCoins === levels[ currentLevel ]) {
			clearTimeout(gameTimeout);
			enableBoard();
			if (currentLevel + 1 === levels.length) {
				gameState = "finished";
				status.innerHTML = "Congratulations! You have defeated Memnon!";
			} else {
				gameState = "win";
				currentLevel += 1;
				console.log("You win!");
				status.innerHTML = "You Win! Click to play again.";
			}
		}
	}

	function hasCoin(index){
		return !!board[index];
	}

	function startGame() {
		gameState = "show";
		clearBoard();
		shuffleBoard( levels[ currentLevel ] );
		showBoard();
		levelStatus.innerHTML = "Level " + currentLevel +
			" of " + (levels.length-1);
		status.innerHTML = "Memorise the location of these coins.";
		gameTimeout = setTimeout(startGuess, memoryTime); // ms
	}

	function startGuess() {
		// prevent restarting guess mode
		if (gameState === "guess") { return; } 

		gameState = "guess";
		foundCoins = 0;
		clearBoard();
		
		status.innerHTML = "Click to recall where the coins were.";
	
		clearTimeout(gameTimeout);
		gameTimeout = setTimeout(startGameOver, recallTime);
	}

	addButtonListeners();

	//startGame();

})();