/*
 *  create game zone 
 */
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
    console.log(Matrix)
    document.getElementById('x').style.backgroundColor = '#8e24aa';
    document.getElementById('o').style.backgroundColor = '#757575';
    x = true
}
const chooseY = () => {
    console.log(Matrix)
    document.getElementById('o').style.backgroundColor = '#8e24aa';
    document.getElementById('x').style.backgroundColor = '#757575';
    o = true
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
        PCplayX()
   }
    else {
        alert('please choose X or O')
    }
};
const check = () => {
        if (start && o) {
        Matrix.map(el => {
            el.map(el => {
                el.onclick = () => {
                    document.getElementById('overlay').style.opacity = '1';
                    document.getElementById('overlay').style.zIndex = '1';
                    document.getElementById('overlay').style.cursor = 'wait';
                    el.innerText = 'O'
                    el.style.pointerEvents = 'none'
                    fO()
                }
            })
        })
    } else if (start && x) {
        Matrix.map(el => {
            el.map(el => {
                el.onclick = () => {
                    document.getElementById('overlay').style.opacity = '1';
                    document.getElementById('overlay').style.zIndex = '1';
                    document.getElementById('overlay').style.cursor = 'wait';
                    el.innerText = 'X'
                    el.style.pointerEvents = 'none'
                    fX()
                }
            })
        })
    }
    else {
        alert('please choose X or O, and click to Start')
    }
}
const PCplayX = () => {
    setTimeout(() => {
        let xPos = Math.floor(Math.random() * 3);
        let yPos = Math.floor(Math.random() * 3);
        if (Matrix[xPos][yPos].innerText === '') {
            Matrix[xPos][yPos].innerText = 'X'
            Matrix[xPos][yPos].style.pointerEvents = 'none'
            document.getElementById('overlay').style.cursor = 'wait';
            document.getElementById('overlay').style.opacity = '0';
            document.getElementById('overlay').style.zIndex = '-1';
            checkPC_O()
        } else {
            checkPC_O()
            PCplayX()
        }
    }, 1000)
}
const PCplayO = () => {
    setTimeout(() => {
        let xPos = Math.floor(Math.random() * 3);
        let yPos = Math.floor(Math.random() * 3);
        if (Matrix[xPos][yPos].innerText === '') {
            Matrix[xPos][yPos].innerText = 'O'
            Matrix[xPos][yPos].style.pointerEvents = 'none'
            document.getElementById('overlay').style.cursor = 'wait';
            document.getElementById('overlay').style.opacity = '0';
            document.getElementById('overlay').style.zIndex = '-1';
            checkPC_X()
        } else {
            checkPC_X()
            PCplayO()
        }
    }, 1000)
}
/*
* checking winner
*/
const fO = () => {
    if ((Matrix[0][0].innerText === Matrix[0][1].innerText && Matrix[0][1].innerText === Matrix[0][2].innerText && Matrix[0][0].innerText === 'O') ||
        (Matrix[1][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[1][2].innerText && Matrix[1][0].innerText === 'O') ||
        (Matrix[2][0].innerText === Matrix[2][1].innerText && Matrix[2][1].innerText === Matrix[2][2].innerText && Matrix[2][0].innerText === 'O') ||
        (Matrix[0][2].innerText === Matrix[1][2].innerText && Matrix[1][2].innerText === Matrix[2][2].innerText && Matrix[2][2].innerText === 'O') ||
        (Matrix[0][1].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][1].innerText && Matrix[0][1].innerText === 'O') ||
        (Matrix[0][0].innerText === Matrix[1][0].innerText && Matrix[1][0].innerText === Matrix[2][0].innerText && Matrix[2][0].innerText === 'O') ||
        (Matrix[0][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][2].innerText && Matrix[1][1].innerText === 'O') ||
        (Matrix[0][2].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][0].innerText && Matrix[0][2].innerText === 'O')
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('WinText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';
        Matrix.forEach(element => {
            element.forEach(e => {
                console.log(e)
            })

        });

    } else if (Matrix[0][0].innerText !== '' && Matrix[0][1].innerText !== '' && Matrix[0][2].innerText !== '' &&
        Matrix[1][0].innerText !== '' && Matrix[1][1].innerText !== '' && Matrix[1][2].innerText !== '' &&
        Matrix[2][0].innerText !== '' && Matrix[2][1].innerText !== '' && Matrix[2][2].innerText !== ''
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('EndText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';

    }
    else {
        PCplayX()
    }
}
const fX = () => {
    if ((Matrix[0][0].innerText === Matrix[0][1].innerText && Matrix[0][1].innerText === Matrix[0][2].innerText && Matrix[0][0].innerText === 'X') ||
        (Matrix[1][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[1][2].innerText && Matrix[1][0].innerText === 'X') ||
        (Matrix[2][0].innerText === Matrix[2][1].innerText && Matrix[2][1].innerText === Matrix[2][2].innerText && Matrix[2][0].innerText === 'X') ||
        (Matrix[0][2].innerText === Matrix[1][2].innerText && Matrix[1][2].innerText === Matrix[2][2].innerText && Matrix[2][2].innerText === 'X') ||
        (Matrix[0][1].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][1].innerText && Matrix[0][1].innerText === 'X') ||
        (Matrix[0][0].innerText === Matrix[1][0].innerText && Matrix[1][0].innerText === Matrix[2][0].innerText && Matrix[2][0].innerText === 'X') ||
        (Matrix[0][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][2].innerText && Matrix[1][1].innerText === 'X') ||
        (Matrix[0][2].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][0].innerText && Matrix[0][2].innerText === 'X')
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('WinText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';

    } else if (Matrix[0][0].innerText !== '' && Matrix[0][1].innerText !== '' && Matrix[0][2].innerText !== '' &&
        Matrix[1][0].innerText !== '' && Matrix[1][1].innerText !== '' && Matrix[1][2].innerText !== '' &&
        Matrix[2][0].innerText !== '' && Matrix[2][1].innerText !== '' && Matrix[2][2].innerText !== ''
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('EndText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';

    } else {
        PCplayO()
    }
}
/*
*Check PC winner???
*/
const checkPC_O = () => {
    if (
        (Matrix[0][0].innerText === Matrix[0][1].innerText && Matrix[0][1].innerText === Matrix[0][2].innerText && Matrix[0][0].innerText === 'X') ||
        (Matrix[1][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[1][2].innerText && Matrix[1][0].innerText === 'X') ||
        (Matrix[2][0].innerText === Matrix[2][1].innerText && Matrix[2][1].innerText === Matrix[2][2].innerText && Matrix[2][0].innerText === 'X') ||
        (Matrix[0][2].innerText === Matrix[1][2].innerText && Matrix[1][2].innerText === Matrix[2][2].innerText && Matrix[2][2].innerText === 'X') ||
        (Matrix[0][1].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][1].innerText && Matrix[0][1].innerText === 'X') ||
        (Matrix[0][0].innerText === Matrix[1][0].innerText && Matrix[1][0].innerText === Matrix[2][0].innerText && Matrix[2][0].innerText === 'X') ||
        (Matrix[0][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][2].innerText && Matrix[1][1].innerText === 'X') ||
        (Matrix[0][2].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][0].innerText && Matrix[0][2].innerText === 'X')
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('LoseText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';

    } else if (Matrix[0][0].innerText !== '' && Matrix[0][1].innerText !== '' && Matrix[0][2].innerText !== '' &&
        Matrix[1][0].innerText !== '' && Matrix[1][1].innerText !== '' && Matrix[1][2].innerText !== '' &&
        Matrix[2][0].innerText !== '' && Matrix[2][1].innerText !== '' && Matrix[2][2].innerText !== ''
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('EndText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';
    }
}
const checkPC_X = () => {
    if (
        (Matrix[0][0].innerText === Matrix[0][1].innerText && Matrix[0][1].innerText === Matrix[0][2].innerText && Matrix[0][0].innerText === 'O') ||
        (Matrix[1][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[1][2].innerText && Matrix[1][0].innerText === 'O') ||
        (Matrix[2][0].innerText === Matrix[2][1].innerText && Matrix[2][1].innerText === Matrix[2][2].innerText && Matrix[2][0].innerText === 'O') ||
        (Matrix[0][2].innerText === Matrix[1][2].innerText && Matrix[1][2].innerText === Matrix[2][2].innerText && Matrix[2][2].innerText === 'O') ||
        (Matrix[0][1].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][1].innerText && Matrix[0][1].innerText === 'O') ||
        (Matrix[0][0].innerText === Matrix[1][0].innerText && Matrix[1][0].innerText === Matrix[2][0].innerText && Matrix[2][0].innerText === 'O') ||
        (Matrix[0][0].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][2].innerText && Matrix[1][1].innerText === 'O') ||
        (Matrix[0][2].innerText === Matrix[1][1].innerText && Matrix[1][1].innerText === Matrix[2][0].innerText && Matrix[0][2].innerText === 'O')
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('LoseText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';

    } else if (Matrix[0][0].innerText !== '' && Matrix[0][1].innerText !== '' && Matrix[0][2].innerText !== '' &&
        Matrix[1][0].innerText !== '' && Matrix[1][1].innerText !== '' && Matrix[1][2].innerText !== '' &&
        Matrix[2][0].innerText !== '' && Matrix[2][1].innerText !== '' && Matrix[2][2].innerText !== ''
    ) {
        document.getElementById('Winner').style.opacity = '1';
        document.getElementById('Winner').style.zIndex = '2';
        document.getElementById('EndText').style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';
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
    console.log(Matrix)
}


