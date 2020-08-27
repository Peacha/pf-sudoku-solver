const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';
function SudokuPuzzle(){
  let grid = [];
	const rows = ['A','B','C','D','E','F','G','H','I'];
	const columns = [1,2,3,4,5,6,7,8,9];
  const updateHTML = (valid,reset=false) =>{
    if (valid)
    {
      let gridString = reset ?  '' : this.getGrid().map(g=>{return (g.value) ? g.value : '.'}).join('');
      document.getElementById('text-input').value = gridString;
      this.getGrid().forEach((el,ind)=>{document.querySelectorAll('td input')[ind].value = el.value});
    }     
  }
  const updatePuzzleCell = (index,input) =>{
    input === '.' ?  grid[index].value = '' : grid[index].value = input;
    return this.getGrid()[index];
  }
  const populatePossNumbers = (cellType,cell,possArr=[])=>{
    const nums = [1,2,3,4,5,6,7,8,9]
    let returnArr = [];
    var countVal;
    if (cellType === "row") { countVal = cell.row }
    if (cellType === "column") { countVal = cell.column }
    if (cellType === "block")  { countVal = cell.block }
    let possVals = [];
    let tempArr = [];
    if (possArr.length ===1 && solve){cell.value = possArr.pop()}
    possVals = nums.filter(el=> grid.filter(e=>{if (e[cellType] === countVal && e.value){return e}}).map(a=>a.value).indexOf(el) === -1)
    if (cellType === 'row' && cell.row === countVal && cell.value === '')
    {
      if (possArr.length > 0)
      {
        tempArr = possArr.filter((el,ind)=>{if((possVals.indexOf(possArr[ind])) !== -1 ){return el } })	
      } else
      {
        tempArr = possVals.map(a=>{return a})
      }
      if (tempArr.length === 1){cell.value = tempArr.pop()}
      returnArr = populatePossNumbers("column",cell,tempArr) 
    } 
    else if (cellType === 'column'  && cell.column === countVal && cell.value === '')
    {
      tempArr = possArr.filter((el,ind)=>{if((possVals.indexOf(possArr[ind])) !== -1 ){return el } })
      if (tempArr.length === 1){cell.value = tempArr.pop()}
      returnArr = populatePossNumbers("block",cell,tempArr)
    } 
    else if (cellType === 'block'  && cell.block === countVal && cell.value === '')
    {
      tempArr = possArr.filter((el,ind)=>{if((possVals.indexOf(possArr[ind])) !== -1 ){return el } })
      if (tempArr.length === 1){cell.value = tempArr.pop()}
      returnArr = tempArr
    }
    return returnArr
	} 
  const solve = (cells,currPos,prevPos) =>{
    //if prevPos && prevNum are both null
    let returnVal
    if (!prevPos)
    {
      //the first run will be the whole grid
      //run the populate possibles method to narrow down potential options
      cells.forEach(c=>{c.possibleValues = populatePossNumbers("row",c)})
      //get all empty cells
      let emptyCells = cells.filter(e=>{if(e.value === ''){ return e}})  
      emptyCells[currPos].value = emptyCells.possibleValues[currPos].pop()
      const newPos = currPos++
      returnVal = solve(emptyCells,currPos+1,currPos)
    }
    else
    {
      //check if there are no empty values in the grid.
          //if there are none, return the puzzle
          //check there are still possibilities contained in the grid:
            //if is 0
              //then decrement currPos, decrement PrevPos
              //call function to execute again
              //if there are not and the grid has empty values, return the grid.  
            //if it is > 0 pop the number from possVals into val
              //test the validity - is the number contained in another grid cell from the same block having the same row, grid or block?
              //let testVal = grid.filter(el=>{if ((el.row === grid[0].row || el.column === grid[0].column || el.block === grid[0].block) && el.value === 7 ){return el }}).length
              //testval > 0
                //empty the cells value.  call function - provide the same array of empty objects, same currPos, same prevPos.
                //valid - increment currPos, passs currPos as prevPos, call function to move onto the next cell
    }   
  }
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
        var gridObj = {cell:objName,value:gridVal,possibleValues:[],block:block,row:rowInd+1,column:colInd+1}
        grid.push(gridObj);
        ++i;
        })
      })
    }
    return this.htmlUpdates ? updateHTML(true) : this.getGrid();
  }
  this.getGrid = ()=>{return grid.map((c,i)=>{return {value:c.value}});}
  this.testValidInput = (input)=>{ return ((parseInt(input) > 0 && parseInt(input) < 10 ) || input === '.' || input === null ) ? true : false}
  this.updateFromTextArea = (input)=>{
    let returnVal;
    if (input.length === 81)
    {
      let returnVal;
      let validInput = true;
      input.split('').forEach((el,ind)=>{if (!this.testValidInput(el)){validInput = false}})
      if (validInput)
      {
        input.split('').forEach((el,ind)=>{updatePuzzleCell(ind,el)})
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
        updatePuzzleCell(index,input)
        returnVal = this.htmlUpdates ? updateHTML(true) : this.getGrid();
      } else{
        returnVal = validInput;
      }
    return returnVal;
  }
  this.resetGrid = () =>{ 
    grid.forEach(e=>{e.value=''})
    return this.htmlUpdates ? updateHTML(true,true) : this.getGrid();
  }
  this.showSolution = () =>{
    //backup the grid to this point.  We'll attempt a shortcut solution and also a more long winded brute force should that not produce a solution
    const gridBackup = JSON.parse(JSON.stringify(grid))
    //get an object representing cells from the grid with empty values
    //pass the index of 0 for the starting point
    //pass nothing as the prevPos
    //pass nothing for the prevNum
    //run the puzzle solver method
    //depending on setting of htmlUpdates, populate the solution on the page
    //or return the grid as an object otherwise
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