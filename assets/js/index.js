const LBL_GATO = document.getElementById('lblGato');
const ESPECIE_GATO = document.getElementById('racaGato');
const LBL_CACHORRO = document.getElementById('lblCachorro');
const ESPECIE_CACHORRO = document.getElementById('racaCachorro');
const CAD_CACHORRO = document.getElementById('lblCadCachorro');
const CAD_GATO = document.getElementById('lblCadGato');

//Função utilizada durante a atualização de um animal, seu objetivo é popular todos as caixas de seleção automaticamente, com as opções selecionadas durante o cadastro. Recebe como parametros o identificador do dono, o identificador da espécie e o identificador da raça
function populaComboDono(idDono, idEspecie, idRaca){
    let dono = document.getElementsByName('nomeDono');

    //url que gera json com todos os donos cadastrados
    const url = "http://localhost:3000/listaDonos";

    //popula a caixa de seleção com todos os donos
    fetch(url).then(
        function(response){
            let listadonos;
            response.json().then(
                function(data){
                    for(let i=0; i<data.length; i++){
                        listadonos = document.createElement('option');
                        listadonos.value = data[i].id_dono;
                        listadonos.text = data[i].nome;
                        dono[0].add(listadonos);
                    }
                    //aqui, deixa selecionado o dono cadastrado para o animal
                    for(let i=0; i<dono[0].options.length; i++){
                        if(dono[0].options[i].value == idDono){
                            dono[0].selectedIndex = i;
                            break;
                        }
                    }
                }
                
            ).catch(function(err) {  
             console.error('Ocorreu um erro ao ler os dados: ' + err);  
           });
        }
    );
    
    //Aqui tem o objetivo de mostrar a caixa de seleção com a raça selecionada. Se a especie tiver identificador 1, ou seja, for um cachorro, irá chamar a função cachorroSelecionado e passar o identificador da raça. Se for um gato, chamará a função gatoSelecionado também passando o identificador da raça.
    if(idEspecie === 1){
        cachorroSelecionado(idRaca);
    }
    else{
        gatoSelecionado(idRaca);        
    }

}

//Essa função irá habilitar o select com todas as raças cadastradas no sistema, caso a espécie selecionada no cadastro ou na atualização do pet seja GATO. Recebe o parâmetro idRaca para verificar se é um cadastro (caso receba 0), ou uma atualização (caso o id seja maior que 0). Se for uma atualização, a caixa de seleção será automaticamente selecionada para a opção cadastrada.
function gatoSelecionado(idRaca){
    //irá alterar as classes para que o label e a caixa de seleção fiquem visíveis
    LBL_GATO.classList.remove('d-none'); //retira a invisibilidade do label
    LBL_GATO.classList.add('d-block'); //deixa visível
    ESPECIE_GATO.classList.remove('d-none'); //retira a invisibilidade da caixa de seleção
    ESPECIE_GATO.classList.add('d-block'); //deixa visível
    ESPECIE_GATO.classList.add('form-control'); //estilizando com bootstrap
    CAD_GATO.classList.remove('d-none'); //retira a invisibilidade da pergunta caso não tenha achado a raça
    CAD_GATO.classList.add('d-block'); //deixa visível
    CAD_GATO.classList.add('form-text'); //estiliza label com bootstrap

    //A ação será semelhante com as opções do cachorro, porém, com o objetivo de deixá-las invisíveis caso já tenham sido chamadas anteriormente
    LBL_CACHORRO.classList.remove('d-block');
    LBL_CACHORRO.classList.add('d-none');
    ESPECIE_CACHORRO.classList.remove('d-block');
    ESPECIE_CACHORRO.classList.add('d-none');
    CAD_CACHORRO.classList.remove('d-block');
    CAD_CACHORRO.classList.add('d-none');


    //deixa a espécie como preenchimento obrigatorio no formulário
    ESPECIE_GATO.setAttribute("required", "");

    //url que gera json com todas as raças cadastradas
    const url = "http://localhost:3000/listaRacaGato";

   fetch(url).then(
       function(response){
           let raca;
           response.json().then(
               function(data){
                   //cada dado será inserido no select
                   for(let i=0; i<data.length; i++){
                        raca = document.createElement('option');
                        raca.value = data[i].id_raca;
                        raca.text = data[i].nome_raca;
                        raca.classList.add('form-control');
                        ESPECIE_GATO.add(raca);
                   }
                   //caso não seja um cadastro, e sim uma atualização, o sistema deixará automaticamente selecionado a opção cadastrada
                   if(idRaca > 0){
                        for(let i=0; i<ESPECIE_GATO.options.length; i++){
                            if(ESPECIE_GATO.options[i].value == idRaca){
                                ESPECIE_GATO.selectedIndex = i;
                                break;
                            }
                        }
                   }
               }
           ).catch(function(err) {  
            console.error('Ocorreu um erro ao buscar dados: ', err);  
          });
       }
   );
}

//Essa função irá habilitar o select com todas as raças cadastradas no sistema, caso a espécie selecionada no cadastro ou na atualização do pet seja CACHORRO. Recebe o parâmetro idRaca para verificar se é um cadastro (caso receba 0), ou uma atualização (caso o id seja maior que 0). Se for uma atualização, a caixa de seleção será automaticamente selecionada para a opção cadastrada.
function cachorroSelecionado(idRaca){
    //Abaixo, as classes são alteradas para que o select e os labels referente aos cachorros fiquem visíveis
    LBL_CACHORRO.classList.remove('d-none');
    LBL_CACHORRO.classList.add('d-block');
    ESPECIE_CACHORRO.classList.remove('d-none');
    ESPECIE_CACHORRO.classList.add('d-block');
    ESPECIE_CACHORRO.classList.add('form-control');
    CAD_CACHORRO.classList.remove('d-none');
    CAD_CACHORRO.classList.add('d-block');
    CAD_CACHORRO.classList.add('form-text');

    //Abaixo, as as classes são alteradas para que o select e os labels referente aos gatos fiquem invisíveis
    LBL_GATO.classList.remove('d-block');
    LBL_GATO.classList.add('d-none');
    ESPECIE_GATO.classList.remove('d-block');
    ESPECIE_GATO.classList.add('d-none');
    CAD_GATO.classList.remove('d-block');
    CAD_GATO.classList.add('d-none');

    //Deixa a caixa de seleção de espécie de cachorro como preenchimento obrigatório
    ESPECIE_CACHORRO.setAttribute("required", "");

    //url que gera JSON com todas as raças cadastradas
    const url = "http://localhost:3000/listaRacaCachorro";

    //função que irá popular a caixa de seleção
   fetch(url).then(
       function(response){
           let raca;
           response.json().then(
               function(data){
                   for(let i=0; i<data.length; i++){
                        raca = document.createElement('option');
                        raca.value = data[i].id_raca;
                        raca.text = data[i].nome_raca;
                        ESPECIE_CACHORRO.add(raca);
                        
                   }
                   //se formulário for de atualização, irá deixar selecionado a opção marcada no cadastro
                    if(idRaca >0){
                        for(let i=0; i<ESPECIE_CACHORRO.options.length; i++){
                            if(ESPECIE_CACHORRO.options[i].value == idRaca){
                                ESPECIE_CACHORRO.selectedIndex = i;
                                break;
                            }
                        }
                    }
               }
           ).catch(function(err) {  
            console.error('Ocorreu um erro ao buscar dados: ' + err);  
          });
       }
   )
}