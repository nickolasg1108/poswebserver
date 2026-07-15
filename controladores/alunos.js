const { getTodosAlunos, getAlunoPorMatricula, insereAluno, modificaAluno, deletarAlunoPorMatricula } = require("../servicos/alunos")

function getAlunos(req, res) {
    try {
        const alunos = getTodosAlunos()
        res.send(alunos)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function getAluno(req, res) {
    try {
        const matricula = req.params.matricula
        const alunos = getAlunoPorMatricula(matricula)
        res.send(alunos)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function postAluno(req, res) {
  try {
    const alunoNovo = req.body;

    if (
        typeof alunoNovo.matricula !== 'string' ||
        typeof alunoNovo.nome !== 'string' ||
        typeof alunoNovo.email !== 'string' ||
        typeof alunoNovo.status !== 'string' ||
        typeof alunoNovo.data !== 'string'
    ) {
        return res.status(400).send("Bad Request: Todos os campos devem ser enviados como texto (string).");
    }

    insereAluno(alunoNovo);
    res.status(201);
    res.send("Aluno inserido com sucesso");
      
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function patchAluno(req, res){
   try {
        const matricula = req.params.matricula
        const body = req.body
        modificaAluno(body,matricula)
        res.send("Item inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }    
}

function deleteAluno(req, res) {
    try {
        const matricula = req.params.matricula
        deletarAlunoPorMatricula(matricula)
        res.send("Aluno deletado com sucesso")
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getAlunos, getAluno, postAluno, patchAluno, deleteAluno
}
