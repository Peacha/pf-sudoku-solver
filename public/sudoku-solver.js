const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';
function SudokuPuzzle(){
  let grid = [];
	const rows = ['A','B','C','D','E','F','G','H','I'];
	const columns = [1,2,3,4,5,6,7,8,9];
  const updateHTML = (valid,errorStr="",reset=false) =>{
    if (valid)
    {
      document.getElementById('error-msg').innerHTML = ""
      let gridString = reset ?  '' : this.getGrid().map(g=>{return (g.value) ? g.value : '.'}).join('');
      document.getElementById('text-input').value = gridString;
      this.getGrid().forEach((el,ind)=>{document.querySelectorAll('td input')[ind].value = el.value});
    } else
    {
      console.log("string not valid")
      document.getElementById('error-msg').innerHTML = "Error: Expected puzzle to be 81 characters long."
    }
  }
  const updatePuzzleCell = (index,input) =>{
    input === '.' ?  grid[index].value = '' : grid[index].value = parseInt(input);
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
  const validateCell = (cell,val) =>{
    return (grid.filter(el=>{if (el.cell !== cell.cell && (el.row === cell.row || el.column === cell.column || el.block === cell.block) && el.value === val ){return el }}).length === 0) ? true : false
  }
  const solve = (cells,currPos,prevPos) =>{
    let emptyCells
    if (grid.filter(e=>{if(e.value !== ''){ return e }}).length === 81){
      let validation = true
      grid.forEach(cell=>{if (!validateCell(cell,cell.value)){validation = false }})
      return  (validation)? grid : {error:"grid was not valid"} 
    }
    if (prevPos === null)
    {
      let validation = true
      cells.forEach(cell=>{if (cell.value !== '' && !validateCell(cell,cell.value)){console.log("validation failed");validation = false }})
      if (!validation){return {error:"grid was not valid"} }
      cells.forEach(c=>{c.possibleValues = populatePossNumbers("row",c)})
      emptyCells = cells.filter(e=>{if(e.value === ''){ return e}})
      const possVal = emptyCells[currPos].possibleValues.pop();
      if (validateCell(emptyCells[currPos],possVal)){
        emptyCells[currPos].value = possVal
        return solve(emptyCells,currPos+1,currPos) 
      } else {
         emptyCells[currPos].blacklist.push(possVal)
         return solve(emptyCells,currPos,currPos)  
      }
    } 
    if (cells[currPos].possibleValues.length === 0 && cells[currPos].value === '')
    {
      cells[currPos].possibleValues = cells[currPos].blacklist
      cells[currPos].blacklist = []
      cells[prevPos].blacklist.push(cells[prevPos].value )
      cells[prevPos].value = '' 
      return solve(cells,prevPos,prevPos-1) 
    }
    if (cells[currPos].possibleValues.length > 0 && cells[currPos].value === '' && prevPos !== null)
    {
      const possVal = cells[currPos].possibleValues.pop();
      if (validateCell(cells[currPos],possVal)){
        cells[currPos].value = possVal
        return solve(cells,currPos+1,currPos)
      } else {
         cells[currPos].blacklist.push(possVal)
         return solve(cells,currPos,prevPos)  
      }
    }
    return grid
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
        var gridObj = {cell:objName,value:gridVal,possibleValues:[],blacklist:[],block:block,row:rowInd+1,column:colInd+1}
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
      console.log("string too big or small")
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
    let returnVal = solve(grid,0,null)
    return this.htmlUpdates ? updateHTML(true) : returnVal.error ? returnVal : this.getGrid();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const sudoku = new SudokuPuzzle;
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  sudoku.populateGrid(textArea.value);
  textArea.addEventListener('input',(e)=>{sudoku.updateFromTextArea(e.srcElement.value);});
  document.querySelectorAll('td input').forEach((el,ind)=>{el.addEventListener('input',(e)=>{sudoku.updateFromGrid(ind,e.data)})})
  document.getElementById('clear-button').addEventListener('click',(e)=>{sudoku.resetGrid()});
  document.getElementById('solve-button').addEventListener('click',(e)=>{sudoku.showSolution()})
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




