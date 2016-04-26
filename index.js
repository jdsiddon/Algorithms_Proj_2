var fs = require('fs');
var readline = require('readline');


/**
 * Divide and conquer algorithm for calculating minimun quantities of coin denomination to make specified change.
 * @function
 * @param {number} change - The amount of change to make.
 * @param {Array} coins - Currency denominations available to make change.
 * @returns {Array} tempChange - Array with counts of coins required to make minimum change.
 */
function changeslow(change, coins){

  var tempChange = new Array(coins.length);     // Create a new array the same size as the coins available.
  var i = 0;
  for(var i = 0; i < tempChange.length; i++) {
    tempChange[i] = 0;
  }    // Create a new array the same size as the coins available.

  var i = 0;
  var j = 0;
  var sum = 0;
  var val = 0;
  var numCoins = new Array();

  for (var i = coins.length - 1; i >= 0; i--){

    for (var j = coins.length - 1; j >= 0; j--){

      while (sum < change){

        if(coins[i] != coins[j]){

          sum += coins[i] + coins[j];

          val++;

        }

        else{

          sum += coins[j];
          val++;

        }

      }

      if (coins[j] > change || sum > change){

        val--;

      }

      if (val > 0 && (tempChange[i] >= val || tempChange[i] == 0)){

        tempChange[i] = val;

      }

      sum = 0;

    }

    if (change >= coins[i]){

      val = tempChange[i];

      while(val > 0){
        change = change - coins[i];
        val--;

      }

      val = 0;

    }

    if (change == 0){

      return tempChange;

    }

  }

  return tempChange;
}

/**
 * Greedy algorithm for calculating minimun quantities of coin denomination to make specified change.
 * @function
 * @param {number} change - The amount of change to make.
 * @param {Array} coins - Currency denominations available to make change.
 * @returns {Array} tempChange - Array with counts of coins required to make minimum change.
 */
function changegreedy(change, coins) {
  var tempChange = new Array(coins.length);     // Create a new array the same size as the coins available.

  var i = 0;

  for(i = 0; i < tempChange.length; i++) {
    tempChange[i] = 0;
  }

  if(change === 0) {                    // No change required.
    return tempChange;
  }

  i = coins.length-1;  // Reset counter.
  coin = coins[i];     // Get highest denomination coin (last value in array).

  // Keep looping while we have denominations available and change to make.
  while(coins.length >= 0 && change > 0) {
    if((change-coin) >= 0) {            // Check we can fit current denomination into change.
      change -= coin;                   // Subtract coin denomination from change.
      tempChange[i]++;       // Increment change array denomination counter.

    } else {                            // Denomination won't fit in change.
      i--;
      coin = coins[i];               // Get next highest value denomination.

    }
  }

  return tempChange;                    // Return change array.
}


/**
 * Dynamic Programming algorithm for calculating minimun quantities of coin denomination to make specified change.
 * Algorithm based off example provided here: https://www.youtube.com/watch?v=rdI94aW6IWw
 * In the linked example minArray = c and lastCoinUsed = s;
 * @function
 * @param {number} change - The amount of change to make.
 * @param {Array} coins - Currency denominations available to make change.
 * @returns {Array} tempChange - Array with counts of coins required to make minimum change.
 */
function changedp(change, coins) {
  var changeArr = new Array(coins.length);     // Create a new array the same size as the coins available.

  var minArray = new Array(change+1);        // Array to store minimum number of coins for each sub-change (change-n) where n is the index of the array.
  var lastCoinUsed = new Array(change+1);    // Array to store the last coin used in determining the minimum coins required, needed to figure out how many of each quantity.
  var minCoins;             // Temp variable to hold min-coin count.

  // Iterators
  var i = 0;
  // var z = 0;
  var k = 0;
  var m = 0;


  // Initialize changeArr to 0's
  for(i = 0; i < changeArr.length; i++) {
    changeArr[i] = 0;
  }

  // Loop through each possible sub-change value for change. (change-n);
  for(i = 0; i < change+1; i++) {
    if(i === 0) {     // Sub-change = 0 so no possible coins, and last coin used is 0.
      minArray[i] = 0;
      lastCoinUsed[i] = 0;

    } else {
      minCoins = 1000*1000;     // A huge number that will never actually be the minimum number of coins.
      k = 0;                                  // Iterator over our coins array.

      while(i >= coins[k] && k < coins.length) {  // As long as our sub-change value is less than or equal to a coin denom lets find the minimum number required.
        if(minCoins >= minArray[i-coins[k]]+1) {
          minCoins = minArray[i-coins[k]]+1;
          lastCoinUsed[i] = coins[k];         // Set last coin used.
        }
        k++;
      }
      minArray[i] = minCoins;                 // Set minium coins for subchange value.
    }


  }

  // Loop back through each sub-change value and figure out the last coins used for each.
  // This is will total up all the coins required to make the full change value.
  m = minArray.length-1;

  while(m > 0) {
    for(i = 0; i < coins.length; i++) {
      if(lastCoinUsed[m] === coins[i]) {          // Coin used and coin array position the same.
        changeArr[i]++;                           // Increment coin count.
      }
    }
    m = m - lastCoinUsed[m];
  }

  // For Testing.
  // console.log(changeArr);
  // console.log(minArray);
  // console.log(lastCoinUsed);

  return changeArr;
}


/**
 * Function appends algorithm results to the specified text file.
 * @function
 * @param {String} alg - Name of the algorithm.
 * @param {Array} arr - Array of count of coins required to create specified change.
 * @returns {String} output - Filename results will be appended to.
 */
function writeToOutPut(alg, arr, output) {
  var arrString = "[" + arr + "]";
  var coinCount = arr.reduce(function(prev, curr) {
    return prev + curr;
  });

  var outputString = "Algorithm " + alg + "\n" + arrString + "\n" + coinCount + "\n\n";

  fs.appendFile(output, outputString, function(err) {
    console.log("Done!");
  });

  return;
}






// V1 = [1, 2, 6, 12, 24, 48, 60] and V2 = [1, 6, 13, 37, 150].
// [2000, 2001, 2002, …, 2200]
var denom = [1, 6, 13, 37, 40, 55, 75, 85, 90, 93, 133, 145, 150, 173, 180, 197, 200, 222, 233, 235];
var chArray = new Array(denom.length);
var change = 0;
var coinCount = 0;
var start;
var end;
var timeDiff;
var i = 0;

var hrTime = 0;


// Number of coins required.
console.log("Greedy");
console.log("n, coin count")
for(i = 2000; i < 2200; i++) {
  change = i;
  // Greedy - Timing: http://stackoverflow.com/questions/11725691/how-to-get-a-microtime-in-node-js
  hrTime = process.hrtime();
  start = hrTime[0] * 1000000 + hrTime[1] / 1000;

  chArray = changeslow(change, denom);

  hrTime = process.hrtime();
  end = (hrTime[0] * 1000000 + hrTime[1] / 1000) - start;

  console.log(Math.round(end));
  // console.log(i);
}

//
console.log("Dynamic");
console.log("n, coin count")
for(i = 2000; i < 2200; i++) {
  change = i;

  // DP
  hrTime = process.hrtime();
  start = hrTime[0] * 1000000 + hrTime[1] / 1000;

  chArray = changedp(change, denom);

  hrTime = process.hrtime();
  end = (hrTime[0] * 1000000 + hrTime[1] / 1000) - start;

  console.log(Math.round(end));
}
// //
// //
console.log("Slow");
console.log("n, coin count")
for(i = 2000; i < 2200; i++) {
  change = i;

  // Slow
  hrTime = process.hrtime();
  start = hrTime[0] * 1000000 + hrTime[1] / 1000;

  chArray = changeslow(change, denom);

  hrTime = process.hrtime();
  end = (hrTime[0] * 1000000 + hrTime[1] / 1000) - start;

  console.log(Math.round(end));
}
