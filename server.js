const express = require('express');
const app = express();
const bp = require('body-parser');

//chamo o arquivo que cria a conexão com o banco de dados
const dbConnection = require('./db.js');

//O servidor irá rodar na porta 3000
app.listen(3000, function(){
    console.log('Servidor está rodando na porta 3000');
});

//Informo que será utilizado o EJS para criação de views
app.set('view engine', 'ejs');
//Passo a localização dos arquivos estáticos (css e js)
app.use(express.static('assets'));

//Utilizo o body-parser para conseguir gerar um JSON que será lido posteriormente em alguns elementos 'select' do sistema
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//Renderiza a landing page
app.get('/', (req, res) => {
    res.render('index.ejs');
})

//Busca as informações de todos os donos cadastrados no sistema e renderiza a página com uma tabela listando todos os cadastros de donos
app.get('/consultaDono',  (req, res) => {
    dbConnection.query('SELECT id_dono, nome, telefone from dono', function(err, results){
        if(err){
            console.log('Um erro aconteceu, por favor, informe o administrador do sistema:' + err);
            res.render('donos.ejs');
        }
        else{
            res.render('donos.ejs', { data: results} );
        }

    })
});

//Renderiza a página que contém o formulário de cadastro do dono
app.get('/cadastraDono', (req, res) => {
    res.render('cadastraDono.ejs');
});

//Busca as informações de todos os pets cadastrados no sistema e renderiza a página com uma tabela listando todos os cadastros de pets
app.get('/consultaPet',  (req, res) => {
    let query = 'select animal.id_animal, animal.nome_animal, animal.idade_animal, raca.nome_raca, especie.nome_especie, dono.nome, dono.telefone from animal inner join raca on fk_id_raca = id_raca inner join especie on raca.fk_id_especie = id_especie inner join dono on fk_id_dono = id_dono;';

    dbConnection.query(query, function(err, results){
        if(err){
            alert('Um erro aconteceu! Por favor, entre em contato com o administrador do sistema!');
            console.log(err);
            res.render('pets.ejs');
        }
        else{
            res.render('pets.ejs', { data: results} );
        }
    })
});

//Renderiza a página que contém o formulário de cadastro do dono
app.get('/cadastraPet', (req, res) => {
    dbConnection.query('SELECT id_dono, nome from dono', function(err, results){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.render('cadastraPet.ejs', { data: results });
        }
    });
});

//Cadastro de dono 
//Busca as informações enviadas pelo body e envia para o banco de dados
app.post('/cadastrarDono', (req, res) => {
    let cpf = req.body.cpf;
    let nome = req.body.nomeDono;
    let telefone = req.body.telefoneContato;

    try{
        dbConnection.query(`INSERT INTO dono(cpf, nome, telefone) values ('` + cpf + `', '` + nome + `', '` + telefone + `')`, function(err, result){
            if(err){
                console.log('Não foi possível inserir o cadastro! Por favor, tente novamente. Erro: ' + err);
                res.redirect('/cadastraDono');
            }
            else{
                res.redirect('/consultaDono');
            }
        })
    }
    catch(error){
        console.log(error);
    }
});

//Cadastro de pet
//Busca as informações enviadas pelo body e envia para o banco de dados
app.post('/cadastrarPet', (req, res) => {
    let nome = req.body.nomePet;
    let idade = req.body.idadePet;
    let dono = req.body.nomeDono;
    let especie = req.body.especie;

    let raca = especie == 1 ? req.body.racaCachorro : req.body.racaGato; 

    
    try{
        dbConnection.query(`INSERT INTO animal(nome_animal, idade_animal, fk_id_raca, fk_id_dono) values ('` + nome + `', ` + idade + `,` + raca + `,` + dono +  `)`, function(err, result){
            if(err){
                console.log('Nao foi possivel inserir' + err);
                res.redirect('/cadastraPet');
            }
            else{
                res.redirect('/consultaPet');
            }
        })
    }
    catch(error){
        console.log(error);
    }
    
});

//Gera um arquivo JSON que lista as raças cadastradas de cachorro - é utilizado no select do HTML para cadastrar um novo animal
app.get('/listaRacaCachorro', (req, res) => {
    dbConnection.query('SELECT id_raca, nome_raca from raca where fk_id_especie=1', function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            res.json(rows);
        }
    })
});

//Gera um arquivo JSON que lista as raças cadastradas de gatos - é utilizado no select do HTML para cadastrar um novo animal
app.get('/listaRacaGato', (req, res) => {
    dbConnection.query('SELECT id_raca, nome_raca from raca where fk_id_especie=2', function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            res.json(rows);
        }
    });
});

//Gera um arquivo JSON que lista todos os donos cadastrados - é utilizado para popular o select do HTML na atualização de um pet 
app.get('/listaDonos', (req, res) => {
    dbConnection.query('SELECT id_dono, nome from dono', function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            res.json(rows);
        }
    });
});

//Renderiza a página que será utilizado para cadastrar uma nova raça
app.get('/cadastraRaca', (req, res) => {
    res.render('cadastraRaca.ejs');
});

//Busca e exibe as informações de um determinado dono, cujo id é selecionado na página que lista todos os donos e é passado por parâmetro na url para fazer o select no banco
app.get('/visualizaDono/(:id)', (req, res) => {
    let idDono = req.params.id;
    let query = 'select * from dono where id_dono = ' + idDono;

    dbConnection.query(query, function(err, results){
        if(err){
            console.error(err);
            res.redirect('/consultaDono');
        }
        else{
            res.render('visualizaDono', { data: results })
        }
    })
});

//Busca e exibe as informações de um determinado pet, cujo id é selecionado na página que lista todos os animais e é passado por parâmetro na url para fazer o select no banco
app.get('/visualizaPet/(:id)', (req, res) => {
    let idPet = req.params.id;
    let query = 'select animal.id_animal, animal.nome_animal, animal.idade_animal, raca.nome_raca, especie.nome_especie, dono.nome, dono.telefone from animal inner join raca on fk_id_raca = id_raca inner join especie on raca.fk_id_especie = id_especie inner join dono on fk_id_dono = id_dono where id_animal = ' + idPet;

    dbConnection.query(query, function(err, results){
        if(err){
            alert('Um erro aconteceu! Por favor, entre em contato com o administrador do sistema!');
            console.log(err);
            res.redirect('/listaPet');
        }
        else{
            res.render('visualizaPet.ejs', { data: results} );
        }
    })
})

//Busca e exibe as informações de determinado dono, cujo id é selecionado na página que lista todos os donos e é passado por parâmetro na url para fazer o select no banco. Com o select dando certo, irá exibir as informações do dono em inputs para realizar a atualização dos dados 
app.get('/editarDono/(:id)', (req, res) => {
    let idDono = req.params.id;
    dbConnection.query(`SELECT * FROM dono where id_dono=` + idDono, function(err, results){
        if(err){
            console.log(err);
            res.redirect('/buscaDono');
        }
        else{
            res.render('editaDono.ejs', { data: results });
        }
    })
});

//Recebe as informações passadas pelo body do formulário de atualização do dono, e realiza as alterações no banco
app.post('/updateDono/(:id)', (req, res) => {
    let idDono = req.params.id;
    let nome = req.body.nomeDono;
    let telefone = req.body.telefoneContato;
    dbConnection.query(`UPDATE dono set nome = '` + nome + `',telefone = '` + telefone + `' where id_dono = ` + idDono, function(err, results){
        if(err){
            console.log('Ocorreu um erro ao atualizar o cadastro.' + err);
        }
        else{
            console.log('Alterado com sucesso!');
        }
    });
    res.redirect('/consultaDono');
});

//Busca e exibe as informações de determinado pet, cujo id é selecionado na página que lista todos os animais e é passado por parâmetro na url para fazer o select no banco. Com o select dando certo, irá exibir as informações do animal em inputs para realizar a atualização dos dados 
app.get('/editarPet/(:id)', (req, res) => {
    let idAnimal = req.params.id;

    let query = `select animal.id_animal, animal.nome_animal, animal.idade_animal, animal.fk_id_raca, animal.fk_id_dono, raca.fk_id_especie from animal inner join raca on fk_id_raca = id_raca where animal.id_animal =` + idAnimal; 

    dbConnection.query(query, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            res.render('editaPet.ejs', { data: results });
        }
    })
});

//Recebe as informações passadas pelo body do formulário de atualização do pet, e realiza as alterações no banco
app.post('/updatePet/(:id)', (req, res) => {
    let idAnimal = req.params.id;
    let nomeAnimal = req.body.nomePet;
    let idadeAnimal = req.body.idadePet;
    let dono = req.body.nomeDono;
    let especie = req.body.especie;

    let raca = especie == 1 ? req.body.racaCachorro : req.body.racaGato; 

    let query = `UPDATE animal set nome_animal = '` + nomeAnimal + `', idade_animal = ` + idadeAnimal + `, fk_id_dono = ` + dono + `, fk_id_raca = ` + raca + ` where id_animal = ` + idAnimal;
    dbConnection.query(query, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            console.log('Alterado com sucesso!');
        }
    });
    res.redirect('/consultaPet');
});

//Realiza a remoção de cadastro de um dono
app.get('/deleteDono/(:id)', (req, res) => {
    let idDono = req.params.id;

    dbConnection.query(`delete from dono where id_dono = ` + idDono, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            console.log('Alterado com sucesso!');
        }
    });
    res.redirect('/consultaDono');
});

//Realiza a remoção de cadastro de um animal
app.get('/deletePet/(:id)', (req, res) => {
    let idAnimal = req.params.id;

    dbConnection.query(`delete from animal where id_animal = ` + idAnimal, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            console.log('Alterado com sucesso!');
        }
    });
    res.redirect('/consultaPet');
});

//Realiza a inserção de uma nova raça de animal
app.post('/inserirRaca', (req, res) => {
    let nomeRaca = req.body.nomeRaca;
    let especie = req.body.especie;

    dbConnection.query(`insert into raca (nome_raca, fk_id_especie) values ('` + nomeRaca + `', ` + especie + `);`, function(err, results){
        if(err){
            console.error(err);
        }
        else{
            console.log('Raça inserida com sucesso');
        }
        res.redirect('/consultaDono');
    });
});