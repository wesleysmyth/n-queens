/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];

  for (var i=0;i<n;i++){
    var row=[];
    for (var j=0;j<n;j++){
      if (j === i) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme
  while (n>0){
    solutionCount*=n;
    n--;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board=new Board({n:n});
  if (n===2 || n===3){
    return copyBoardState() ;
  }
  var n=board.get('n');

  var checkOneRow=function(rowIndex){
    if (rowIndex===n){
      return true;
    }


    var weHaveFoundAHomeForHer=false;
    var nextRowWorks=false;

    for (var i=0;i<n;i++){




      board.togglePiece(rowIndex,i);
      console.log(rowIndex+" "+i);
      console.log(JSON.stringify(copyBoardState() ))


      if (board.hasConflict(rowIndex,i) ){
        board.togglePiece(rowIndex,i);
        console.log(rowIndex+" "+i);
        console.log(JSON.stringify(copyBoardState() ))

      }
      else{
        weHaveFoundAHomeForHer=true;
        nextRowWorks=checkOneRow(rowIndex+1);
        if (!nextRowWorks && i!==n-1){
          board.togglePiece(rowIndex,i);
          console.log(rowIndex+" "+i);
          console.log(JSON.stringify(copyBoardState() ))

          weHaveFoundAHomeForHer=false;
        }
        if (!nextRowWorks && i===n-1){
          board.togglePiece(rowIndex,i);
          console.log(rowIndex+" "+i);
          console.log(JSON.stringify(copyBoardState() ))

          weHaveFoundAHomeForHer=false;
        }
      }

      //if at end of row
      if (!weHaveFoundAHomeForHer && i===n-1){
        return false;
      }

    }


    return nextRowWorks;
  };

  function copyBoardState(){
    var n=board.get('n');
    var copyBoard=[];
    for (var i=0;i<n;i++){
      var row=board.get(i).slice();
      copyBoard.push(row);
    }
    return copyBoard;
  };



  //console.log(JSON.stringify(copyBoardState() ));

  var solution = checkOneRow(0) ? copyBoardState() : false ;



  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  //walk the board helper function
  //place a queen
    //check for conflict
    //
    //if there is a conflict: remove queen and place a queen at the next space in the current row
    //if we reach the end of the row and no place to insert a queen was found go back

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
