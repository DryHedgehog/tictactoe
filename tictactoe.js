'use strict'; 
function TicTacToe(id) {
  this.id = id;
  this.n = null; //сторона ігрового поля в клітинках
  this.gField = null; //масив з трьома підмасивами, містить значення клітин на кожен момент гри, з кожним ходом відповідні зміни в значеннях
  this.createDom();

}

TicTacToe.prototype.createDom = function() {
  var id = document.getElementById( this.id );
  if ( id == null ) return alert( "There is no ID!" );

  var field = document.getElementById('field');
  var size = document.getElementById('size');
  var self = this;

  button.onclick = function() {
    var trs = document.querySelectorAll( '#table tr' );
    if (trs !== null) {
      for ( var i = 0; i < trs.length; i++ )
        trs[i].remove();
    }
    self.n = size.value;
    if (self.n < 3) return;
    self.createField(self.n);
  }
  table.onclick = function( event ) {
    var target = event.target;

    if (target.tagName !== "TD") return;
    if (target.innerHTML !== "") return;

    self.setCell( target.parentNode.rowIndex, target.cellIndex, "X" );
    
    //після цього виклик ф-ї для перевірки виграшу/нічиєї
    if ( self.isWinner(self.n) ) {
      alert('You won!');
    }

    if ( self.searchT(target.parentNode.rowIndex, target.cellIndex, "X")) {
      alert( 'Nearby cell found' );
    }
  }
}

  TicTacToe.prototype.createField = function(n) {
    for ( var i = 0; i < n; i++ ) {
      var tr = document.createElement( 'tr' );
      table.appendChild(tr);
      for ( var j = 0; j < n; j++ ) {
        var td = document.createElement( 'td'  );
        tr.appendChild(td);
      }
    }

    this.gField = new Array(n);

    for (var i = 0; i < n; i++) {
      this.gField[i] = new Array(n);
    }

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        this.gField[i][j] = "";
      }
    }
  };

  TicTacToe.prototype.setCell = function(x, y, t) {
    this.gField[x][y] = t;
    table.rows[x].cells[y].innerHTML = t;
  };

TicTacToe.prototype.isWinner = function(n) {
  //зовн цикл по координаті х, внутр по у
  //встановлення початкової клітинки для перевірки з коорд (0;0)
  for ( var x = 0; x <= this.gField.length-n; x++ ) {
    for (var y = 0; y <= this.gField.length-n; y++) {
      var lc = this.gField[x][y]; // lc(0,0)

      //перевірка виграшу по головній діагоналі через цикл
      if ( lc !== '' ) { // lc = 'X' або lc = '0'
        for ( var i = 1; i < n; i++ ) { //перевірка (1,1)
          //перевірка універсальна для О та Х
          if (this.gField[x+i][y+i] !== lc) lc = ''; 
        }
      }
      if (lc !== '') return lc; //виграш по головній діагоналі

       //перевірка виграшу по зворотній діагоналі через цикл
      var lc = this.gField[x][y+n-1]; //ls(0,2)
       if (lc !== '') { // lc = 'X' або lc = '0'
        for (var i = 1; i < n; i++) {
          //перевірка універсальна для О та Х
          if (this.gField[x+i][y+n-1-i] !== lc) lc = ''; 
        }
      }
      if (lc !== '') return lc; //виграш по зворотній діагоналі

      //перевірка виграшу по горизонталі. У фікслване
      //Розглянути всі горизонталі відносно поточної точки тобто (0,0)
      for ( var i = 0; i < n; i++) {
        var lc = this.gField[x+i][y];
        if (lc !== '') {
          for (var j = 1; j < n; j++) {
            if ( this.gField[x+i][y+j] !== lc ) lc = '';
          }
        }
        if (lc !== '') return lc; //вихід з ф-ї на ітерацію зовн циклу щоб припинити її після першого виграшу
      }

       //перевірка виграшу по вертикалі. Х фіксоване 
      for ( var i = 0; i < n; i++) {
        var lc = this.gField[x][y+i];
        if (lc !== '') {
          for (var j = 1; j < n; j++) {
            if ( this.gField[x+j][y+i] !== lc ) lc = '';
          }
        }
        //вихід з ф-ї на ітерацію зовн циклу щоб припинити її після першого виграшу
        if (lc !== '') return lc; //виграш по вертикалі
      }
    }
   }

   //в усіх інших випадках нічия
   return false;
  }


  //AI 
  //пріоритет 1. виграти 2. завадити гравцю 3. рендомний хід


  //треба обмежити напрямок вибору клітинки межами ігрового поля
  //для цього окрема ф-я
  //x, y -- координати доступної для ходу клітинки 
  //t = "х" або "0"

TicTacToe.prototype.searchT = function(x, y, t) {
  var mini = -1;
  var maxi = 1;
  var minj = -1;
  var maxj = 1;

  if (x+mini < 0) mini = 0;
  if (x+maxi > this.gField.length-1) maxi = 0;

  if (y+minj < 0) minj = 0;
  if (y+maxj > this.gField.length-1) maxj = 0;

  //AI прощупує навколишні клітинки
  for (var i = mini; i <= maxi; i++) {
    for (var j = minj; j <=maxj; j++) {
      if (x == x+i && y == y+j) continue;
      //коли знайшов клітику зі своїм знаком
      if (this.gField[x+i][y+j] == t) return true;
    }
  }
  return false;
}

