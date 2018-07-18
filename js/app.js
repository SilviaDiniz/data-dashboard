/*
 * Funcionalidad de tu producto
 */
var dropMenu = document.getElementById('drop-menu');
var menuGeracao = document.getElementById('menu-geracao');

window.onload = menuSede();

dropMenu.addEventListener('change', menuTurma);
menuGeracao.addEventListener('change', studentsPresent);
menuGeracao.addEventListener('change', percentDropouts);
menuGeracao.addEventListener('change', percentSatisfaction);
menuGeracao.addEventListener('change', averageTeacher);
menuGeracao.addEventListener('change', averageJedi);

// MENU SEDE
function menuSede() {
  dropMenu.innerHTML = '';
  var nome = document.createElement('option');
  nome.innerHTML = 'Selecione a sede';
  nome.value = 'nome';
  dropMenu.appendChild(nome);
  for(sede in data) {
    var itemMenu = document.createElement('option');
    console.log(sede);
    itemMenu.value = sede;
    itemMenu.innerHTML = sede;
    dropMenu.appendChild(itemMenu);
  }
};

// MENU GERAÇÃO
function menuTurma() {
  var sede = dropMenu.value;
  menuGeracao.innerHTML = '';
  var nome = document.createElement('option');
  nome.innerHTML = 'Selecione a geração';
  nome.value = 'nome';
  menuGeracao.appendChild(nome);
  for(turma in data[sede]) {
    var itemMenu = document.createElement('option');
    console.log(sede, turma);
    itemMenu.value = turma;
    itemMenu.innerHTML = turma;
    menuGeracao.appendChild(itemMenu);
  }
};

// 1 - TOTAL DE ALUNAS PRESENTES
function studentsPresent() {
  var sede = dropMenu.value;
  var ano = menuGeracao.value; //pega ano de acordo com a sede
  var turma = data[sede][ano]['students'];
  var presentes = 0,
      desistentes = 0;
  var alunas = [],
      actives = [],
      alunasAtivas = [],
      alunasInativas = [];
  for(i in turma) {
    //pega as alunas e o tamanho do array criado
    alunas.push(turma[i].name);
    var totalAlunas = alunas.length;
    //pega os active e o tamanho do array criado
    actives.push(turma[i].active);
    //separa alunas ativas e desistentes
    if(turma[i].active === true) {
      presentes += 1;
      alunasAtivas.push(turma[i].name);
    }else {
      desistentes += 1;
      alunasInativas.push(turma[i].name);
    }
    var percents = Number(((desistentes / alunas.length) * 100).toFixed(2));
  }
  console.log(presentes);
  var total = [['Total alunas', totalAlunas], ['Nº alunas presentes', presentes], ['Nº alunas desistentes', desistentes]];
  // IMPRIMINDO OS RESULTADOS NO HTML
  var boxChart1 = document.getElementsByClassName('box-chart')[0];  //pai

  var boxSede = document.createElement('h2'); // titulo sede, turma
  var boxSub = document.createElement('h3');
  var boxInfo = document.createElement('p'); // informações

  boxSede.className = 'sede';
  boxSub.className = 'sub';
  boxInfo.className = 'info';

  boxSede.textContent = (sede + '  -  ' + ano);
  boxSub.textContent = ('TOTAL DE ALUNAS PRESENTES');
  boxInfo.textContent = ('Total alunas: ' + totalAlunas) + '\n' +
                        ('Nº alunas presentes: ' + presentes) + '\n' +
                        ('Nº alunas desistentes: ' + desistentes) + '\n' +
                        ('Percentual de desistência: ' + percents + ' %');

  boxChart1.innerHTML = '';
  boxChart1.appendChild(boxSede);
  boxChart1.appendChild(boxInfo);

  console.log(total);
  return total;
};

// 2 - % DE ALUNAS DESISTENTES
function percentDropouts() {
  var sede = dropMenu.value;
  var ano = menuGeracao.value; //pega ano de acordo com a sede
  var turma = data[sede][ano]['students'];
  var desistentes = 0;
  var alunas = [],
      actives = [];
  for(i in turma) {
    //pega as alunas e o tamanho do array criado
    alunas.push(turma[i].name);
    //pega os active e o tamanho do array criado
    actives.push(turma[i].active);
    //separa alunas ativas e desistentes
    if(turma[i].active === false) {
      desistentes += 1;
    }
    var percents = Number(((desistentes / alunas.length) * 100).toFixed(2));
  }
  
  var porcento = ['Percentual de desistência ', percents];

  console.log(porcento);
  return porcento;
};

// 3 - ALUNAS ACIMA DA MÉDIA

// 4 - % DE ALUNAS ACIMA DA MÉDIA

// 5 - NPS DOS SPRINTS

// 6 - QUANTIDADE E %

// 7 -

// 8 - PERCENTUAL DE SATISFAÇÃO
function percentSatisfaction() {
  var sede = dropMenu.value;
  var ano = menuGeracao.value; //pega ano de acordo com a sede
  var turma = data[sede][ano]['ratings'];
  var insatisfacaoTotal = [],
      satisfacaoTotal = [],
      superaTotal = [];
  var somaInsatisfacao = 0,
      somaSatisfacao = 0,
      somaSupera = 0,
      somaTotal = 0;
  for(i in turma) {
    var alunas = turma[i]['student'];
    for(x in alunas){
    }
    insatisfacaoTotal.push(alunas['no-cumple']);
    satisfacaoTotal.push(alunas['cumple']);
    superaTotal.push(alunas['supera']);
  }
  for(pontos in insatisfacaoTotal) {
    somaInsatisfacao += insatisfacaoTotal[pontos];
  }
  for(pontos in satisfacaoTotal) {
    somaSatisfacao += satisfacaoTotal[pontos];
  }
  for(pontos in superaTotal) {
    somaSupera += superaTotal[pontos];
  }
  
  somaTotal = parseInt(somaSatisfacao + somaSupera);
  var satisfacao = [['Satisfeitas', somaTotal], ['Insatisfeitas', somaInsatisfacao]];
  // IMPRIMINDO OS RESULTADOS NO HTML
  var boxChart1 = document.getElementsByClassName('box-chart3')[0];

  var boxSede = document.createElement('h2'); // titulo sede, turma
  var boxSub = document.createElement('h3');
  var boxInfo = document.createElement('p'); // informações

  boxSede.className = 'sede';
  boxSub.className = 'sub';
  boxInfo.className = 'info';

  boxSede.textContent = (sede + '  -  ' + ano);
  boxSub.textContent  = ('SATISFAÇÃO');
  boxInfo.textContent = ('Não cumpre: ' + somaInsatisfacao) + '\n' +
                        ('Cumpre: ' + somaSatisfacao) + '\n' +
                        ('Supera: ' + somaSupera) + '\n' +
                        ('Total de santisfação: ' + somaTotal);

  boxChart1.innerHTML = '';
  boxChart1.appendChild(boxSede);
  boxChart1.appendChild(boxInfo);

  console.log(satisfacao);
  return satisfacao;
};

// 9 - PONTUAÇÃO MÉDIA DOS PROFESSORES
function averageTeacher() {
  var sede = dropMenu.value;
  var ano = menuGeracao.value; //pega ano de acordo com a sede
  var turma = data[sede][ano]['ratings'];
  var teacher = [];
  var soma = 0,
      media = 0;
  for(i in turma) {
    teacher.push(turma[i]['teacher']);    //notas
  }
  for(pontos in teacher) {
    soma += teacher[pontos];
  }
  media = Number((soma / teacher.length).toFixed(2));
  var score = ['Media Professores', media];
  // IMPRIMINDO OS RESULTADOS NO HTML
  var boxChart1 = document.getElementsByClassName('box-chart2')[0];

  var boxSede = document.createElement('h2'); // titulo sede, turma
  var boxSub = document.createElement('h3');
  var boxInfo = document.createElement('p'); // informações

  boxSede.className = 'sede';
  boxSub.className = 'sub';
  boxInfo.className = 'info';

  boxSede.textContent = (sede + '  -  ' + ano);
  boxSub.textContent = ('PONTUAÇÃO MÉDIA DOS PROFESSORES');
  boxInfo.textContent = ('Média: ' + media);

  boxChart1.innerHTML = '';
  boxChart1.appendChild(boxSede);
  boxChart1.appendChild(boxInfo);

  console.log(score);
  return score;
};

// 10 - PONTUAÇÃO MÉDIA DOS JEDI
function averageJedi() {
  var sede = dropMenu.value;
  var ano = menuGeracao.value; //pega ano de acordo com a sede
  var turma = data[sede][ano]['ratings'];
  var jedi = [];
  var soma = 0,
      media = 0;
  for(i in turma) {
    jedi.push(turma[i]['jedi']);    //notas
  }
  for(pontos in jedi) {
    soma += jedi[pontos];
  }
   media = Number((soma / jedi.length).toFixed(2));
   var mediaJedi = ['Média Jedi ', media];
   // IMPRIMINDO OS RESULTADOS NO HTML
   var boxChart1 = document.getElementsByClassName('box-chart4')[0];

   var boxSede = document.createElement('h2'); // titulo sede, turma
   var boxSub = document.createElement('h3');
   var boxInfo = document.createElement('p'); // informações

   boxSede.className = 'sede';
   boxSub.className = 'sub';
   boxInfo.className = 'info';

   boxSede.textContent = (sede + '  -  ' + ano);
   boxSub.textContent = ('PONTUAÇÃO MÉDIA DOS JEDI');
   boxInfo.textContent = ('Média: ' + media);

   boxChart1.innerHTML = '';
   boxChart1.appendChild(boxSede);
   boxChart1.appendChild(boxInfo);

   console.log(mediaJedi);
   return mediaJedi;
};

console.log(data);
