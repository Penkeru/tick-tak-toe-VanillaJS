(function () {
    if (!supportsImports() || !supportsTemplates()) {
        alert('import or templates are not supported in this browser');
    }
    let gameBoardContainer = document.getElementById('gameboard-container');
    let gameBoard = new GameBoard();
    gameBoard.drawBoard(gameBoardContainer);

})();


function supportsImports() {
    return 'import' in document.createElement('link');
}

function supportsTemplates() {
    return 'content' in document.createElement('template');
}