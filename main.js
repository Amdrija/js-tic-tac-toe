const player = function(playerName, playerSign) {
	return {
		playerName,
		playerSign
	};
};

const game = function() {
	let _gameStarted = false;
	let _board;
	let _players = [];
	let _currentPlayerIndex;
	let _currentTurn;

	const _startRestartButton = this.document.getElementById('start-restart-button');
	_startRestartButton.addEventListener('click', _startGame);

	const _tiles = this.document.getElementsByClassName('tile');
	for (let tile of _tiles) {
		tile.addEventListener('click', _playTurn);
	}

	function _addPlayers() {
		let playerXName = document.getElementById('player-x').value;
		let playerOName = document.getElementById('player-o').value;

		if (playerXName == '' || playerOName == '') {
			return 0;
		}

		_players[0] = player(playerXName, 'X');
		_players[1] = player(playerOName, '0');
		return 1;
	}

	function _resetBoard() {
		for (let tile of _tiles) {
			tile.innerText = '';
		}
		_board = [ [ '', '', '' ], [ '', '', '' ], [ '', '', '' ] ];
	}

	function _startGame() {
		if (_addPlayers() == 0) {
			alert('You must enter the name of the players.');
			return;
		}
		_currentPlayerIndex = 0;
		_resetBoard();
		_gameStarted = true;
		_startRestartButton.innerText = 'Restart';
		_currentTurn = 0;
	}

	function _checkHorizontalWinner() {
		let haveWinner = true;
		for (let i = 0; i < _board.length; i++) {
			haveWinner = true;
			for (let j = 0; j < _board[i].length - 1; j++) {
				if (_board[i][j] == '' || _board[i][j] != _board[i][j + 1]) {
					haveWinner = false;
					break;
				}
			}
			if (haveWinner == true) {
				return true;
			}
		}
		return haveWinner;
	}

	function _checkVerticalWinner() {
		let haveWinner = true;
		for (let j = 0; j < _board.length; j++) {
			haveWinner = true;
			for (let i = 0; i < _board[i].length - 1; i++) {
				if (_board[i][j] == '' || _board[i][j] != _board[i + 1][j]) {
					haveWinner = false;
					break;
				}
			}
			if (haveWinner == true) {
				return true;
			}
		}
		return haveWinner;
	}

	function _checkMainDiagonalWinner() {
		for (let i = 0; i < _board.length - 1; i++) {
			if (_board[i][i] == '' || _board[i][i] != _board[i + 1][i + 1]) {
				return false;
			}
		}
		return true;
	}

	function _checkSubDiagonalWinner() {
		for (let i = 0; i < _board.length - 1; i++) {
			if (
				_board[i][_board.length - i - 1] == '' ||
				_board[i][_board.length - i - 1] != _board[i + 1][_board.length - i - 2]
			) {
				return false;
			}
		}
		return true;
	}

	function _checkWinner() {
		return (
			_checkHorizontalWinner() ||
			_checkVerticalWinner() ||
			_checkMainDiagonalWinner() ||
			_checkSubDiagonalWinner()
		);
	}

	function _finishMessage(haveWinner) {
		if (haveWinner) {
			alert(`Congratulations, the winner is ${_players[_currentPlayerIndex].playerName}`);
		} else {
			alert('The game is a tie.');
		}
	}

	function _finishGame(haveWinner) {
		_startRestartButton.innerText = 'Play Again';
		_gameStarted = false;
		_finishMessage(haveWinner);
	}

	function _playTurn(event) {
		if (!_gameStarted) {
			return;
		}

		if (event.target.innerText == '') {
			event.target.innerText = _players[_currentPlayerIndex].playerSign;

			//tiles have id: tile-{tile_number}, so im getting just
			//the last element of the string to get tile number
			let tile_id = event.target.getAttribute('id').slice(-1);
			_board[Math.floor(tile_id / 3)][tile_id % 3] = _players[_currentPlayerIndex].playerSign;

			_currentTurn++;
			let haveWinner = _checkWinner();

			console.log(_players[_currentPlayerIndex]);
			if (_currentTurn == 9 || haveWinner) {
				_finishGame(haveWinner);
			}
			_currentPlayerIndex = (_currentPlayerIndex + 1) % 2;
		} else {
			alert('Click on a filed that is empty.');
		}
	}

	return {};
};

window.onload = function() {
	game();
};
