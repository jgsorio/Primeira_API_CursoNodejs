const express = require('express');

const server = express();

//middlewares globais
server.use(express.json());

//middleware que valida se o campo name está vazio na criacao do curso
function checkCursoNameIsEmpty(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ message: "O nome do curso é obrigatório" });
    }

    return next();
}

const cursos = ['Nodejs', 'PHP', 'ReactJs', 'React Native'];

//Listagem de todos os cursos
server.get('/cursos', (req, res) => {
    return res.status(200).json({ cursos });
});

//Visualizando um curso
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
    if (!cursos[index]) {
        return res.status(404).json({ message: "Esse curso ainda não está cadastrado" });
    }

    return res.json({ curso: `Aprendendo ${cursos[index]}` });
});

//Criando um novo curso
server.post('/cursos', checkCursoNameIsEmpty, (req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.status(201).json({ cursos });
});

//Atualizando um curso
server.put('/cursos/:index', checkCursoNameIsEmpty, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    //verificando se o curso existe
    if (cursos.indexOf(cursos[index]) == -1) {
        return res.status(404).json({ message: "Esse curso não existe" });
    }

    cursos[index] = name;
    return res.status(200).json({ cursos });
});

//Excluindo um curso
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;

    //verificando se o curso existe
    if (cursos.indexOf(cursos[index]) == -1) {
        return res.status(404).json({ message: "Esse curso não existe" });
    }

    cursos.splice(index, 1);
    return res.status(200).json({ message: "Curso deletado com sucesso!" });
});

server.listen(3000);