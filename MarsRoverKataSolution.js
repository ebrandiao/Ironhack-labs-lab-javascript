function MarsRover(localiacao, direcao, grade, obstaculos) {

    self = this;
    this.localiacao = (localiacao === undefined) ? [0, 0] : localiacao;
    this.direcao = (direcao === undefined) ? 'N' : direcao;
    this.grade = (grade === undefined) ? [100, 100] : grade;
    this.obstaculos = (obstaculos === undefined) ? [] : obstaculos;
    this.status = 'OK';

    this.commands = function(commands) {
        if (commands === undefined) { // Getter
            return this.commandsArray;
        } else { // Setter
            for (var index = 0; index < commands.length; index++) {
                var command = commands[index];
                if (command === 'f' || command === 'b') {
                    if (!move(command)) break;
                } else if (command === 'l' || command === 'r') {
                    turn(command);
                }
            }
            resetlocaliacao();
            this.commandsArray = commands;
        }
    };

    function resetlocaliacao() {
        self.localiacao = [
            (self.localiacao[0] + self.grade[0]) % self.grade[0],
            (self.localiacao[1] + self.grade[1]) % self.grade[1]
        ]
    }

    function move(command) {
        var xIncrease = 0,
            yIncrease = 0;
        if (self.direcao === 'N') {
            yIncrease = -1;
        } else if (self.direcao === 'E') { // East
            xIncrease = 1;
        } else if (self.direcao === 'S') { // South
            yIncrease = 1;
        } else if (self.direcao === 'W') { // West
            xIncrease = -1;
        }
        if (command === 'b') { // Backward
            xIncrease *= -1;
            yIncrease *= -1;
        }
        var newlocaliacao = [self.localiacao[0] + xIncrease, self.localiacao[1] + yIncrease];
        if (isObstacle(newlocaliacao)) {
            return false;
        }
        self.localiacao = newlocaliacao;
        return true;
    }

    function isObstacle(newlocaliacao) {
        for (var index = 0; index < self.obstaculos.length; index++) {
            if (newLocation.toString() == self.obstacles[index].toString()) {
                self.status = 'obstacle';
                return true;
            }
        }
        return false;
    }

    function turn(command) {
        var direcaoNumber = direcaoAsNumber(self.direcao);
        if (command === 'l') { // Left
            direcaoNumber = (direcaoNumber + 4 - 1) % 4;
        } else { // Right
            direcaoNumber = (direcaoNumber + 1) % 4;
        }
        self.direcao = self.direcaos[direcaoNumber];
    }

    this.direcaos = ['N', 'E', 'S', 'W'];

    function direcaoAsNumber(direcao) {
        for (var index = 0; index < 4; index++) {
            if (self.direcaos[index] === direcao) return index;
        }
    }

}