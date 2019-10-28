const solver = [
  [3, 4, 6, 2, 9, 7, 8, 5, 1],
  [5, 1, 7, 8, 3, 6, 9, 2, 4],
  [8, 9, 2, 1, 4, 5, 3, 6, 7],
  [1, 8, 5, 7, 2, 3, 4, 9, 6],
  [2, 6, 3, 4, 8, 9, 1, 7, 5],
  [9, 7, 4, 5, 6, 1, 2, 3, 8],
  [4, 5, 1, 9, 7, 2, 6, 8, 3],
  [6, 2, 8, 3, 5, 4, 7, 1, 9],
  [7, 3, 9, 6, 1, 8, 5, 4, 2]
];

let v;

function sudoku() {
  v = []; // inicializa o vetor

  for (let i = 1; i < 10; i++) {
      v[i - 1] = []; // cria os vetores dentro do vetor
      for (let j = 1; j < 10; j++) { // varre todas as posições do vetor
          let x = 'c' + (((i - 1) * 9) + j); // formata o id do html
          var y = Number(document.getElementById(x).value); // pega o input do html
          v[i - 1][j - 1] = y; // coloca o valor na posição correta do vetor (0,0 ate 8,8)
      }
  }

  let terminou = true; // flag pra verificar se é igual
  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) { // varre todas as posições do vetor
          if (v[i][j] != solver[i][j]) { // compara as posições dos dois vetores
              terminou = false; // se alguma for diferente, não está completo
              console.log(i, j, v[i][j], solver[i][j]); // log pra saber qual posição ta diferente
          }
      }
  }

  if (terminou) // terminou (ora ora)
    window.alert("Parabéns, você concluiu este puzzle!");
    window.location.href = "mapa.html";
}