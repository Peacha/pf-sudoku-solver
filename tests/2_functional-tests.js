/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;
let sudoku;
suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
    sudoku = new Solver.SudokuPuzzle();
    const textArea = document.getElementById('text-input');
    document.getElementById('text-input').value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    sudoku.populateGrid(textArea.value);
  });
  
  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      sudoku.updateFromGrid(0,7)
      assert.equal(document.querySelectorAll('td input')[0].value,7)
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      const textArea = document.getElementById('text-input');
      const output = '739..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      sudoku.updateFromGrid(1,3);
      assert.equal(textArea.value,output);
      done();
    });
  });
  
  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      sudoku.resetGrid();
      Array.from(document.querySelectorAll('td input')).forEach(cell=>{assert.equal(cell.value,''); });
      assert.equal(document.getElementById('text-input').value,'');
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    /*test('Function showSolution(solve(input))', done => {

      // done();
    });*/
  });
});

