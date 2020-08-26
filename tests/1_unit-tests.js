/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let Solver
let sudoku 
suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;
        Solver = require('../public/sudoku-solver.js');
        sudoku = new Solver.SudokuPuzzle();
      })
    });  
  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function ____()', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9' , '.'];
      input.forEach((el)=>{assert.isTrue(sudoku.testValidInput(el));})
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0];
      input.forEach((el)=>{
        assert.isNotTrue(sudoku.testValidInput(el));})
      done();
    }); 
  });
  
  suite('Function ____()', () => {
    test('Parses a valid puzzle string into an object', done => {
      sudoku.htmlUpdates = false;
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = [
      { value: '' }, { value: '' }, { value: 9 },  { value: '' },
      { value: '' }, { value: 5 },  { value: '' }, { value: 1 },
      { value: '' }, { value: 8 },  { value: 5 },  { value: '' },
      { value: 4 },  { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: 2 },  { value: 4 },  { value: 3 },
      { value: 2 },  { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }, { value: 1 },
      { value: '' }, { value: '' }, { value: '' }, { value: 6 },
      { value: 9 },  { value: '' }, { value: 8 },  { value: 3 },
      { value: '' }, { value: 9 },  { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }, { value: 6 },
      { value: '' }, { value: 6 },  { value: 2 },  { value: '' },
      { value: 7 },  { value: 1 },  { value: '' }, { value: '' },
      { value: '' }, { value: 9 },  { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }, { value: '' },
      { value: 1 },  { value: 9 },  { value: 4 },  { value: 5 },
      { value: '' }, { value: '' }, { value: '' }, { value: '' },
      { value: 4 },  { value: '' }, { value: 3 },  { value: 7 },
      { value: '' }, { value: 4 },  { value: '' }, { value: 3 },
      { value: '' }, { value: '' }, { value: 6 },  { value: '' },
      { value: '' }]
      assert.deepStrictEqual(output,sudoku.populateGrid(input))
      done();
    });
    
    // Puzzles that are not 81 numbers/periods long show the message 
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    /*test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');
      //done();
    });*/
  });

  /*suite('Function ____()', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    
      // done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';

      // done();
    });
  });
  
  
  suite('Function ____()', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      sudoku.populateGrid(input);
      console.log(sudoku);
      // done();
    });
  });*/
});
