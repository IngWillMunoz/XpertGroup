class functions {
    constructor(operationArr, Matrix) {
        this.operationArr = operationArr
        this.Matrix = Matrix
    }
    Update(data, Matrix) {
        const Pos = {
            x: parseInt(data[1]) - 1,
            y: parseInt(data[2]) - 1,
            z: parseInt(data[3]) - 1
        }
        const valor = parseInt(data[4])
        Matrix[Pos.x][Pos.y][Pos.z] = valor
    }

    Query(data, Matrix) {
        const InitialPos = {
            x: parseInt(data[1]) - 1,
            y: parseInt(data[2]) - 1,
            z: parseInt(data[3]) - 1
        }
        const LastPos = {
            x: parseInt(data[4]) - 1,
            y: parseInt(data[5]) - 1,
            z: parseInt(data[6]) - 1
        }
        let Total = 0
        for (let x = InitialPos.x; x <= LastPos.x; x++) {
            for (let y = InitialPos.y; y <= LastPos.y; y++) {
                for (let z = InitialPos.z; z <= LastPos.z; z++) {
                    Total += Matrix[x][y][z]
                }
            }
        }
        if (document.getElementById("output").value != '') {
            document.getElementById("output").value = document.getElementById("output").value + '\n' + Total;
        } else {
            document.getElementById("output").value = Total;
        }
    }

}

class Intermediate {
    CreateMatrix(CaseSize) {
        let Matrix = []
        for (let i = 0; i < CaseSize; i++) {
            Matrix[i] = []
            for (let j = 0; j < CaseSize; j++) {
                Matrix[i][j] = []
                for (let k = 0; k < CaseSize; k++) {
                    Matrix[i][j][k] = 0
                }
            }
        }
        return Matrix
    }
    RunFunction(operation, Matrix) {
        let operationArr = operation.split(' ')
        let tipo = operationArr[0]
        var funcs = new functions(operationArr, Matrix);

        if (tipo === 'UPDATE') {
            funcs.Update(operationArr, Matrix);
        } else if (tipo === 'QUERY') {
            funcs.Query(operationArr, Matrix)
        } else {
            throw Error('Operación no definida, debe operar con "UPDATE" o "QUERY"')
        }
    }
}
class Calc {
    constructor(input) {
        this.input = input;
    }

    Calculate() {
        try {
            var input = this.input;
            let inputArr = input.split('\n')
            let CurrPos = 0
            let CasesQuantity = parseInt(inputArr[CurrPos++])
            var interm= new Intermediate();

            for (let i = 0; i < CasesQuantity; i++) {
                let CurrentCase = inputArr[CurrPos++].split(' ').map((n) => parseInt(n))
                let CaseSize = CurrentCase[0]
                let Operations = CurrentCase[1]
                let Matrix = interm.CreateMatrix(CaseSize)
                for (let j = 0; j < Operations; j++) {
                    let CurrentOperation = inputArr[CurrPos++]
                    interm.RunFunction(CurrentOperation, Matrix)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

}

function GetData() {
    document.getElementById("output").value = "";
    var Input = document.getElementById("input").value;
    problem = new Calc(Input);
    problem.Calculate();
}

