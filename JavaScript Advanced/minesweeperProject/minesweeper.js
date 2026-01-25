// Logic

const TILE_STATUSES = {
    HIDDEDN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARJED: 'marked',
}

export function createBoard(boardSize, mines){
    const board = []

    for(let x=0 ;x<boardSize; x++){
        const row = []
        for(let y=0; y<boardSize; y++){
            const element = document.createElement('div')
            element.dataset.status = TILE_STATUSES.HIDDEDN

            const tile = {
                element,
                x,
                y,
            }
            row.push(tile)
        }
        board.push(row)
    }
    return board
}