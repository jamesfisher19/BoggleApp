// James Fisher @02939673

// Find letter function
function boggle(table, word) {
  var rowLength = table.length;
  var columnLength = table[0].length;

  // Make sure Qu and St cases
  if (word.includes("#") || word.includes("$")) {
    if (word.length < 3) {
      return true;
    }
  }
  // Word is too short
  if (word.length < 3) {
    return false;
  }

  // Run DFS
  for (var row = 0; row < rowLength; row++) {
    for (var column = 0; column < columnLength; column++) {
      var correctWord = DFS(table, row, column, 0, word);
      if (correctWord === true) {
        return true;
      }
    }
  }
  return correctWord;
}

// DFS Function
function DFS(table, row, column, index, word) {
  var rowLength = table.length;
  var columnLength = table[0].length;

  // Base cases
  if (row < 0 || row >= rowLength) {
    return false;
  }
  if (column < 0 || column >= columnLength) {
    return false;
  }

  // Letter in word doesn't match letter in table
  if (word[index] !== table[row][column]) {
    return false;
  }

  // End of word reached, word exists
  if (index === word.length - 1) {
    return true;
  }

  // Replace value of used letter
  table[row][column] = "?";

  // Check for letter in all valid directions
  var correctWord =
    DFS(table, row, column - 1, index + 1, word) ||
    DFS(table, row, column + 1, index + 1, word) ||
    DFS(table, row - 1, column, index + 1, word) ||
    DFS(table, row + 1, column, index + 1, word) ||
    DFS(table, row + 1, column + 1, index + 1, word) ||
    DFS(table, row - 1, column - 1, index + 1, word) ||
    DFS(table, row + 1, column - 1, index + 1, word) ||
    DFS(table, row - 1, column + 1, index + 1, word);

  // Put used letter back
  table[row][column] = word[index];

  return correctWord;
}

function findAllSolutions(grid, dictionary) {
  let solutions = [];

  // Turn all strings to lower case
  for (var i = 0; i < grid.length; i++) {
    grid[i] = grid[i].map((val) => val.toLowerCase());
  }
  dictionary = dictionary.map((x) => x.toLowerCase());

  // Handle 'Qu' Case
  for (i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "qu") {
        grid[i][j] = "$";
      }
    }
  }
  for (i = 0; i < dictionary.length; i++) {
    // console.log(dictionary[i]);
    if (dictionary[i].includes("qu")) {
      dictionary[i] = dictionary[i].replace("qu", "$");
    }
  }

  // Handle 'St' Case
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "st") {
        grid[i][j] = "#";
      }
    }
  }
  for (i = 0; i < dictionary.length; i++) {
    if (dictionary[i].includes("st")) {
      dictionary[i] = dictionary[i].replace("st", "#");
    }
  }

  // If grid is empty, return empty list
  if (grid.length === 0) {
    return solutions;
  }

  // See if dictionary words are present in table/grid
  for (i = 0; i < dictionary.length; i++) {
    if (boggle(grid, dictionary[i]) === true) {
      solutions.push(dictionary[i]);
    }
  }
  // Reverse Qu case
  for (i = 0; i < solutions.length; i++) {
    if (solutions[i].includes("$")) {
      solutions[i] = solutions[i].replace("$", "qu");
    }
  }

  // Reverse St case
  for (i = 0; i < solutions.length; i++) {
    if (solutions[i].includes("#")) {
      solutions[i] = solutions[i].replace("#", "st");
    }
  }
  return solutions;
}
// console.log(exports.findAllSolutions(grid, dictionary));
export default findAllSolutions;
