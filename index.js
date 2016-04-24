// Divide and conquer

// V = [1, 2, 4, 8]
// A = 15
// C = [1, 1, 1, 1], i.e., 1, 1 cent, 1, 2 cent, 1, 4 cent, 1, 8 cent

function changeslow(cents, coins) {

  var i, j, k;

  for(i = 0; i < cents; i++) {
    for(j = 0; j < cents; j++) {
      for(k = 0; k < coins.length; k++) {
        console.log(i, j, k);
      }
    }
  }
  // 1,2,3

  // 1,1,1
  // 1,2,2
  // 2,2,2
  // 2,2,3
  // 2,3,3
  // 3,3,3




  // console.log(change);
  // return change;

}

function changegreedy(change, coins) {
  var tempChange = new Array(coins.length);     // Create a new array the same size as the coins available.
  //tempChange.fill(0);
  (tempChange = []).length = 0;

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


// https://www.youtube.com/watch?v=Kf_M7RdHr1M
function changedp(change, coins, minSequences) {
  var tempChange = new Array(coins.length);     // Create a new array the same size as the coins available.
  tempChange.fill(0);     // Each coin is selected 0 times to start.

  if(change === 0) {      // Change is 0, don't select any coins.
    return 0;
  }

  // Check if minimum already exists (memoization), return that if it exists because we don't need to calculate it again.
  var minChange = minSequences.findIndex(function(elem, idx){
    if(elem.change === change) {
      return elem;
    }
  })

  if(minChange > -1) {       // A precalculated value already exists so return that instead of recalculating a value.
    return minChange;
  }

  var min = Number.MAX_SAFE_INTEGER;    // Set a large value as the minimum number of coins to make change

  for(var i = 0; i < coins.length; i++) {

    if(coins[i] > change) {
      continue;     // The coin is to big to effect the number of coins required to give change.
    }

    var val = changedp(change-coins[i], coins, minSequences);     // Recurse with the total quantity of change minus current coin denom.
    console.log("va: " + val);

    if(val < min) {       // The amount returned from recursive call is less than the current minimum.
      min = val;
    }

  }

  min = (min === Number.MAX_SAFE_INTEGER ? min : min + 1);        // Include first recurse.

  minSequences.push({"change":change, "minCoins":min});                // Add object to array with change quantity and minimum number of coins.
  console.log(minSequences);
  return min;
}





// changeslow(15, [1, 2, 4, 8], 15);
changeslow(1, [1, 2, 4, 8], 1);
changeslow(25, [1, 2, 4, 8], 25);


console.log(changegreedy(0, [1, 2, 4, 8]));      // Should return 0.
console.log(changegreedy(15, [1, 2, 4, 8]));     // Should be [1, 1, 1, 1]
//
console.log(changedp(0, [1, 2, 4, 8], new Array()));      // Should return 0.
console.log(changedp(15, [1, 2, 4, 8], new Array()));     // Should be [1, 1, 1, 1]
