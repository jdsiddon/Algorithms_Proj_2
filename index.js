// Divide and conquer

// V = [1, 2, 4, 8]
// A = 15
// C = [1, 1, 1, 1], i.e., 1, 1 cent, 1, 2 cent, 1, 4 cent, 1, 8 cent

function changeslow(cents, coins, minChange) {
  // if(cents < 0) { // No solution.
  //   return 0;
  // }
  //
  // if(cents == 0) { // Cents requested in 0, so only 1 solution exists.
  //   return 1;
  // }
  //
  // var sum = 0;
  // for(var i = 0; i < coins.length; i++) {
  //   sum+=changeslow(cents-coins[i], coins, 0)
  // }
  //
  // // if(minChange == coins.length && cents > 0) {
  //   return 0;      //
  // }
  //
  // return changeslow(cents-coins[minChange], coins, minChange) + changeslow(cents, coins, minChange+1);
}



function changegreedy(change, coins) {
  var tempChange = new Array(coins.length);     // Create a new array the same size as the coins available.
  tempChange.fill(0);

  if(change === 0) {                    // No change required.
    return tempChange;
  }

  coin = coins.pop();                   // Get highest denomination coin (last value in array).

  // Keep looping while we have denominations available and change to make.
  while(coins.length >= 0 && change > 0) {
    if((change-coin) >= 0) {            // Check we can fit current denomination into change.
      change -= coin;                   // Subtract coin denomination from change.
      tempChange[coins.length]++;       // Increment change array denomination counter.

    } else {                            // Denomination won't fit in change.
      coin = coins.pop();               // Get next highest value denomination.

    }
  }

  return tempChange;                    // Return change array.
}


// 3. Dynamic Programming:
//
// One dynamic programming approach uses table T indexed by values
// of change 0, 1, 2, . . . , A where T
// [v] is the minimum number of coins needed to make change for v.
// T[v] = min
// V[i}≤v
// {T[v − V[i]] + 1}
// We initialize T [0] = 0. How do you store and return the number
// of each type of coin to return? (That
// is, how do you build C[i]?) This implementation is called changedp. Note: there are other versions of
// the DP algorithm you may use one but need to explain in your report.


// https://www.youtube.com/watch?v=rdI94aW6IWw
// In the linked example minArray = c and lastCoinUsed = s;
function changedp(change, coins, minCoins) {
  var changeArr = new Array(coins.length);     // Create a new array the same size as the coins available.
  changeArr.fill(0);

  var minArray = [];        // Array to store minimum number of coins for each sub-change (change-n) where n is the index of the array.
  var lastCoinUsed = [];    // Array to store the last coin used in determining the minimum coins required, needed to figure out how many of each quantity.
  var j = 0;
  var z = 0;

  // Loop through each possible sub-change value for change. (change-n);
  for(var i = 0; i < change+1; i++) {
    if(i === 0) {     // Sub-change = 0 so no possible coins, and last coin used is 0.
      minArray[i] = 0;
      lastCoinUsed[i] = 0;

    } else {

      var minCoins = Number.MAX_SAFE_INTEGER;     // A huge number that will never actually be the minimum number of coins.
      var k = 0;                                  // Iterator over our coins array.

      while(i >= coins[k] && k < coins.length) {  // As long as our sub-change value is less than or equal to a coin denom lets find the minimum number required.
        if(minCoins > minArray[i-coins[k]]+1) {
          minCoins = minArray[i-coins[k]]+1;
        }
        k++;
      }

      minArray[i] = minCoins;            // Set minium coins for subchange value.


      // Figure out the last coin that was used in making the minimum coins.
      z = k;
      while((i % coins[z]) > 0) { // The last coin used will be the largest one the sub-value is divisible by.
        z--;
      }
      lastCoinUsed[i] = coins[z];            // Store last coin used.
    }


  }

  m = minArray.length-1;
  var d = 0;

  while(m > 0) {
    for(var h = 0; h < coins.length; h++) {
      if(lastCoinUsed[m] === coins[h]) {
        changeArr[h]++;
        break;
      }
    }
    m = m - lastCoinUsed[m];
  }

  console.log(changeArr);
  console.log(minArray);
  // console.log(lastCoinUsed);

  return lastCoinUsed;

}





// changeslow(15, [1, 2, 4, 8], 15);
// console.log(changeslow(1, [1, 2, 4, 8], 0));
// console.log(changeslow(25, [1, 2, 4, 8], 0));
// console.log(changeslow(5, [1, 2, 3], 0));
//
//
// console.log(changegreedy(0, [1, 2, 4, 8]));      // Should return 0.
// console.log(changegreedy(15, [1, 2, 4, 8]));     // Should be [1, 1, 1, 1]
//
// console.log(changedp(0, [1, 2, 4, 8], new Array()));      // Should return 0.
console.log(changedp(16, [1, 5, 12, 25]));     // Should be [1, 1, 1, 1]
