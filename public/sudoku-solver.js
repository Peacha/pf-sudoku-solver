const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';
function SudokuPuzzle(){
  let grid = [];
	const rows = ['A','B','C','D','E','F','G','H','I'];
	const columns = [1,2,3,4,5,6,7,8,9];
  this.populateGrid = (gridValues) =>{
    const i = 0;
    let gridVal;
    let objName;
    let block;
    if (typeof gridValues === 'string' && gridValues.length === 81)
    {
      const gameNumbers = Array.from(gridValues)
      rows.forEach((row,rowInd)=>{
        columns.forEach((column,colInd)=>{
        if (rowInd < 9 && colInd < 9){block = 9}
        if (rowInd < 9 && colInd < 6){block = 8}
        if (rowInd < 9 && colInd < 3){block = 7}
        if (rowInd < 6 && colInd < 9){block = 6}
        if (rowInd < 6 && colInd < 6){block = 5}
        if (rowInd < 6 && colInd < 3){block = 4}
        if (rowInd < 3 && colInd < 9){block = 3}	
        if (rowInd < 3 && colInd < 6){block = 2}
        if (rowInd < 3 && colInd < 3){block = 1}			
        gridVal  = (parseInt(gameNumbers[i])) ? parseInt(gameNumbers[i]) : '';
        objName = `${row}${column}`
        var gridObj = {cell:objName,solutionValue:gridVal,value:gridVal,possibleValues:[],block:block,row:rowInd+1,column:colInd+1}
        grid.push(gridObj);
        ++i;
        })
      })
    }
    return this.getGrid();
  }
  this.getGrid = ()=>{
    return grid.map((c,i)=>{return {value:c.value}});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {

  }
} catch (e) {}