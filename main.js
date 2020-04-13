const player = function (playerName, playerSign) {
    return {
        playerName,
        playerSign
    };
}

const game = function () {
    let _board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let _players = [];

    function _addPlayers() {
        let playerXName = document.getElementById('player-x').value;
        let playerOName = document.getElementById('player-o').value;

        if (playerXName == "" || playerOName == "") {
            return 0;
        }

        players[0] = player(playerXName, "X");
        players[1] = player(playerXName, "0");
        return 1;
    }

    function _startGame() {
        if (_addPlayers() == 0) {
            alert("You must enter the name of the players.");
        }
    }

    const startRestartButton = this.document.getElementById('start-restart-button');
    startRestartButton.addEventListener('click', _startGame);

    return {};
}

window.onload = function () {
    game();
}