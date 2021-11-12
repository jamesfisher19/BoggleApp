// James Fisher @02939673
const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

describe('Boggle Solver tests suite:', () => {
  describe('Normal input', () => {    
    // 2x2
    test('2x2', () => {
      let grid = [['A', 'B'],
                  ['E', 'F']];
      let dictionary = ['abe', 'ebf', 'eaf', 'fab', 'baf'];
      let expected = ['abe', 'ebf', 'eaf', 'fab', 'baf'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    // 3x3
    test('3x3', () => {
      let grid = [['A', 'B', 'C'],
                  ['E', 'F', 'G'],
                  ['I', 'J', 'K']];
      let dictionary = ['abcg', 'ejgcba', 'kje', 'gcfi', 'kfjil'];
      let expected = [ 'abcg', 'ejgcba', 'kje', 'gcfi' ]
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    // 4x4
    test('4x4', () => {
      let grid = [['A', 'B', 'C', 'D'],
                  ['E', 'F', 'G', 'H'],
                  ['I', 'J', 'K', 'L'],
                  ['M', 'N', 'O', 'P']];
      let dictionary = ['abcd', 'afklp', 'mjolg'];
      let expected = [ 'abcd', 'afklp', 'mjolg' ];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    // 5x5
    test('5x5', () => {
      let grid = [['A', 'B', 'C', 'D', 'I'],
                  ['E', 'F', 'G', 'H', 'F'],
                  ['I', 'J', 'K', 'L', 'W'],
                  ['M', 'N', 'O', 'P', 'C'],
                  ['T', 'X', 'W', 'V', 'E']];
      let dictionary = ['njkpvox', 'kow', 'peel' ,'chlow', 'tmnxwv'];
      let expected = [ 'njkpvox', 'kow', 'chlow', 'tmnxwv' ];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
  });


  describe('Problem contraints', () => {
    
    // Cases such as Qu & St
    test('St & Qu Cases 1', () => {
      let grid = [['A', 'B', 'C', 'D'],
                  ['E', 'St', 'G', 'H'],
                  ['I', 'J', 'Qu', 'L'],
                  ['M', 'N', 'O', 'P']];
      let dictionary = ['quon', 'stab'];
      let expected = ['quon', 'stab'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    // Cases such as Qu & St
    test('St & Qu Cases 2', () => {
      let grid = [['A', 'B', 'C', 'Qu'],
                  ['Qu', 'St', 'G', 'H'],
                  ['I', 'J', 'Qu', 'X'],
                  ['St', 'N', 'O', 'P']];
      let dictionary = ['baq', 'quast', 'ponqu', 'cop', 'jqx'];
      let expected = ['quast', 'ponqu'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  
  describe('Input edge cases', () => {
    
    // Check if dictionary is empty
    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutions, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                  ['E', 'F', 'G', 'H'],
                  ['I', 'J', 'K', 'L'],
                  ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    // Check if the grid is empty
    test('Grid is empty', () => {
      // (Edge case) Since there are no possible solutions, it should return an
      // empty list.
      let grid = [];
      let dictionary = ['wordone', 'wordtwo','wordthree'];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    // Word is less than 3 letters
    test('Word < 3 Letters', () => {
      let grid = [['A', 'B', 'C', 'Qu'],
                  ['Qu', 'St', 'G', 'H'],
                  ['I', 'J', 'Qu', 'L'],
                  ['St', 'N', 'O', 'P']];
      let dictionary = ['ab', 'cg', 'po', 'stj', 'qul'];
      let expected = ['stj', 'qul'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
  
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    // Word has duplicate letters
    test('Word Has Duplicate Letters', () => {
      let grid = [['A', 'B', 'C', 'Qu'],
                  ['Qu', 'St', 'G', 'H'],
                  ['I', 'J', 'Qu', 'L'],
                  ['St', 'N', 'O', 'P']];
      let dictionary = ['noop', 'ststgh', 'jqul', 'stiiqu'];
      let expected = ['jqul'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
  
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    // Word takes up entire grid 
    test('1 Word is Whole Grid', () => {
      // (Edge case) Since there are no possible solutions, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                  ['E', 'F', 'G', 'H'],
                  ['I', 'J', 'K', 'L'],
                  ['M', 'N', 'O', 'P']];
      let dictionary = ['aeimnoplkjfghdcb', 'abcdhgfeijklponm', 'abefijmnopklghcd'];
      let expected = ['aeimnoplkjfghdcb','abcdhgfeijklponm', 'abefijmnopklghcd'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
