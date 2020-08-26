const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';
function SudokuPuzzle(){
  let grid = [];
	const rows = ['A','B','C','D','E','F','G','H','I'];
	const columns = [1,2,3,4,5,6,7,8,9];
  this.htmlUpdates = true;
  this.populateGrid = (gridValues) =>{
    let i = 0;
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
    return this.htmlUpdates ? updateHTML(true) : this.getGrid();
  }
  this.getGrid = ()=>{return grid.map((c,i)=>{return {value:c.value}});}
  this.testValidInput = (input)=>{ return ((parseInt(input) > 0 && parseInt(input) < 10 ) || input === '.' || input === null ) ? true : false}
  this.updatePuzzleCell = (index,input) =>{
    input === '.' ?  grid[index].value = '' : grid[index].value = input;
    return this.getGrid()[index];
  }
  this.updateFromTextArea = (input)=>{
    let returnVal;
    if (input.length === 81)
    {
      let returnVal;
      let validInput = true;
      input.split('').forEach((el,ind)=>{if (!this.testValidInput(el)){validInput = false}})
      if (validInput)
      {
        input.split('').forEach((el,ind)=>{this.updatePuzzleCell(ind,el)})
        returnVal = this.htmlUpdates ? updateHTML(true) : this.getGrid();
      } else {
        returnVal = validInput;
      } 
    } else{
      returnVal = updateHTML(false);
    }
    return returnVal   
  }
  this.updateFromGrid = (index,input)=>{
    let returnVal;
    if (input === '') {input = '.'}
    let validInput = this.testValidInput(input)
      if (validInput)
      {
        this.updatePuzzleCell(index,input)
        returnVal = this.htmlUpdates ? updateHTML(true) : this.getGrid();
      } else{
        returnVal = validInput;
      }
    return returnVal;
  }
  const updateHTML = (valid,reset=false) =>{
    if (valid)
    {
      let gridString = reset ?  '' : this.getGrid().map(g=>{return (g.value) ? g.value : '.'}).join('');
      document.getElementById('text-input').value = gridString;
      this.getGrid().forEach((el,ind)=>{document.querySelectorAll('td input')[ind].value = el.value});
    }     
  }
  this.resetGrid = () =>{ 
    grid.forEach(e=>{e.value=''})
    return this.htmlUpdates ? updateHTML(true,true) : this.getGrid();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const sudoku = new SudokuPuzzle;
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  sudoku.populateGrid(textArea.value);
  textArea.addEventListener('input',(e)=>{sudoku.updateFromTextArea(e.srcElement.value);});
  document.querySelectorAll('td input').forEach((el,ind)=>{el.addEventListener('input',(e)=>{sudoku.updateFromGrid(ind,e.data)})})
  document.getElementById('clear-button').addEventListener('click',(e)=>{sudoku.resetGrid()});
});


/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    SudokuPuzzle: SudokuPuzzle
  }
} catch (e) {}