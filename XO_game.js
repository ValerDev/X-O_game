/*
 *  create game zone 
 */
let winMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let step = 0;
let pc = false;
let Matrix = [];
let start = false;
let x = false;
let o = false;
const createMatrix = () => {
    const parentDiv = document.getElementById('XO-main')
    for (let i = 1; i < 10; i++) {
        const XO_item = document.createElement('div')
        XO_item.id = i;
        XO_item.setAttribute('class', 'MatrixElements')
        XO_item.setAttribute('onclick', 'check()')
        XO_item.style.fontSize = '11em'
        XO_item.style.justifyContent = 'center'
        XO_item.style.width = '200px'
        XO_item.style.color = '#757575'
        XO_item.style.height = '200px'
        XO_item.style.border = "2px solid #5c007a"
        XO_item.style.display = "inline-flex"
        XO_item.style.cursor = 'pointer'
        XO_item.style.transition = '1s'
        parentDiv.appendChild(XO_item)
    }
    let arr = [];
    for (let i = 0; i < 9; i++) {
        arr.push(document.getElementsByClassName('MatrixElements')[i])
        if (arr.length === 3) {
            Matrix.push(arr)
            arr = [];
        }
    };
}
/*
 * choose X or O 
 */
const chooseX = () => {
    document.getElementById('x').style.backgroundColor = '#8e24aa';
    document.getElementById('o').style.backgroundColor = '#757575';
    x = true
    o = false
}
const chooseY = () => {
    document.getElementById('o').style.backgroundColor = '#8e24aa';
    document.getElementById('x').style.backgroundColor = '#757575';
    o = true
    x = false
}
/*
* start game
*/
const startClick = () => {
    start = true
    if (start && x) {
        createMatrix();
        document.getElementById('popUpMain').style.opacity = '0'
        document.getElementById('popUpMain').style.zIndex = '-1'
        document.getElementById('startBtn').style.zIndex = '-3';
    }
    else if (start && o) {
        createMatrix();
        document.getElementById('popUpMain').style.opacity = '0'
        document.getElementById('popUpMain').style.zIndex = '-1'
        document.getElementById('startBtn').style.zIndex = '-3';
        PCplay()
    }
    else {
        alert('please choose X or O')
    }
};
const check = () => {
    step++
    if ((start && o) || (start && x)) {
        Matrix.map(element => {
            element.map(el => {
                el.onclick = () => {
                    winMatrix[Matrix.indexOf(element)][element.indexOf(el)] = 1;
                    document.getElementById('overlay').style.opacity = '1';
                    document.getElementById('overlay').style.zIndex = '1';
                    document.getElementById('overlay').style.cursor = 'wait';
                    el.style.pointerEvents = 'none'
                    if (x) {
                        pc = true
                        el.innerText = 'X'
                        checkWinner()
                    } else if (o) {
                        pc = true
                        el.innerText = 'O'
                        checkWinner()
                    }
                }
            })
        })
    }
}
const PCplay = () => {
    setTimeout(() => {
        let xPos = Math.floor(Math.random() * 3);
        let yPos = Math.floor(Math.random() * 3);
        if ((Matrix[xPos][yPos].innerText === '' && o) || (Matrix[xPos][yPos].innerText === '' && x)) {
            Matrix[xPos][yPos].style.pointerEvents = 'none'
            document.getElementById('overlay').style.cursor = 'wait';
            document.getElementById('overlay').style.opacity = '0';
            document.getElementById('overlay').style.zIndex = '-1';
            if (o) {
                Matrix[xPos][yPos].innerText = 'X'
                step++
                Matrix.map(el => {
                    el.map(el => {
                        if ((el.innerText === 'X' && o) || (el.innerText === 'O' && x)) {
                            winMatrix[xPos][yPos] = 2;
                        }
                    })
                })
                checkWinner()
            } else if (x) {
                Matrix[xPos][yPos].innerText = 'O'
                step++
                Matrix.map(el => {
                    el.map(el => {
                        if ((el.innerText === 'X' && o) || (el.innerText === 'O' && x)) {
                            winMatrix[xPos][yPos] = 2;
                        }
                    })
                })
                checkWinner()

            }
        } else {
            PCplay()
            checkWinner()
        }
    }
        , 1000)
}
/*
* checking winner
*/
const checkWinner = () => {
    if ((Matrix[0][0].innerText === Matrix[0][1].innerText && Matrix[0][1].innerText === Matrix[0][2].innerText && Matrix[0][0].innerText === 'O') ||
        (Matrix[1][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[1][2].innerText && Matrix[1][0].innerText === 'O') ||
        (Matrix[2][0].innerText === Matrix[2][1].innerText && Matrix[2][1].innerText === Matrix[2][2].innerText && Matrix[2][0].innerText === 'O') ||
        (Matrix[0][2].innerText === Matrix[1][2].innerText && Matrix[1][2].innerText === Matrix[2][2].innerText && Matrix[2][2].innerText === 'O') ||
        (Matrix[0][1].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][1].innerText && Matrix[0][1].innerText === 'O') ||
        (Matrix[0][0].innerText === Matrix[1][0].innerText && Matrix[1][0].innerText === Matrix[2][0].innerText && Matrix[2][0].innerText === 'O') ||
        (Matrix[0][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][2].innerText && Matrix[1][1].innerText === 'O') ||
        (Matrix[0][2].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][0].innerText && Matrix[0][2].innerText === 'O')
    ) {
        if (o && !x) {
            document.getElementById('Winner').style.opacity = '1';
            document.getElementById('Winner').style.zIndex = '2';
            document.getElementById('WinText').style.opacity = '1';
            document.getElementById('overlay').style.opacity = '0';
        } else {
            document.getElementById('Winner').style.opacity = '1';
            document.getElementById('Winner').style.zIndex = '2';
            document.getElementById('LoseText').style.opacity = '1';
            document.getElementById('overlay').style.opacity = '0';
        }
    } else if (
        (Matrix[0][0].innerText === Matrix[0][1].innerText && Matrix[0][1].innerText === Matrix[0][2].innerText && Matrix[0][0].innerText === 'X') ||
        (Matrix[1][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[1][2].innerText && Matrix[1][0].innerText === 'X') ||
        (Matrix[2][0].innerText === Matrix[2][1].innerText && Matrix[2][1].innerText === Matrix[2][2].innerText && Matrix[2][0].innerText === 'X') ||
        (Matrix[0][2].innerText === Matrix[1][2].innerText && Matrix[1][2].innerText === Matrix[2][2].innerText && Matrix[2][2].innerText === 'X') ||
        (Matrix[0][1].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][1].innerText && Matrix[0][1].innerText === 'X') ||
        (Matrix[0][0].innerText === Matrix[1][0].innerText && Matrix[1][0].innerText === Matrix[2][0].innerText && Matrix[2][0].innerText === 'X') ||
        (Matrix[0][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][2].innerText && Matrix[1][1].innerText === 'X') ||
        (Matrix[0][2].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][0].innerText && Matrix[0][2].innerText === 'X')
    ) {
        if (x && !o) {
            document.getElementById('Winner').style.opacity = '1';
            document.getElementById('Winner').style.zIndex = '2';
            document.getElementById('WinText').style.opacity = '1';
            document.getElementById('overlay').style.opacity = '0';
        } else {
            document.getElementById('Winner').style.opacity = '1';
            document.getElementById('Winner').style.zIndex = '2';
            document.getElementById('LoseText').style.opacity = '1';
            document.getElementById('overlay').style.opacity = '0';
        }
    }
    else if (
        Matrix[0][0].innerText !== '' && Matrix[0][1].innerText !== '' && Matrix[0][2].innerText !== '' &&
        Matrix[1][0].innerText !== '' && Matrix[1][1].innerText !== '' && Matrix[1][2].innerText !== '' &&
        Matrix[2][0].innerText !== '' && Matrix[2][1].innerText !== '' && Matrix[2][2].innerText !== ''
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('EndText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';
    }
    else if (pc) {
        PCplay()
        pc = false
    }
}
const replay = () => {
    document.getElementById('popUpMain').style.opacity = '1'
    document.getElementById('popUpMain').style.zIndex = '1'
    document.getElementById('x').style.backgroundColor = '#c158dc';
    document.getElementById('o').style.backgroundColor = '#c158dc';
    document.getElementById('startBtn').style.zIndex = '1';
    document.getElementById('Winner').style.opacity = '0';
    document.getElementById('Winner').style.zIndex = '-2';
    document.getElementById('LoseText').style.opacity = '0';
    document.getElementById('WinText').style.opacity = '0';
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('overlay').style.zIndex = '-1';
    document.getElementById('EndText').style.opacity = '0';
    x = false;
    o = false;
    start = false;
    pc = false;
    Matrix.forEach(e => {
        e.forEach(el => {
            el.innerText = ' '
        })
    })
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).remove()
    }
    for (let i = 0; i < 3; i++) {
        Matrix.shift()
    }
    winMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
}
