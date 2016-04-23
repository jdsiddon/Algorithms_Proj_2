// Divide and conquer

// V = [1, 2, 4, 8]
// A = 15
// C = [1, 1, 1, 1], i.e., 1, 1 cent, 1, 2 cent, 1, 4 cent, 1, 8 cent

function changeslow(cents, coins, minCoins) {
  var change = new Array();
  var i;
  // To make change for A cents, start by letting K = A

  // No cents, so no coins.
  if(cents === 0) {
    change.push(0);
    change.push(0);
    change.push(0);
    change.push(0);
    return change;
  }

  // If there is a K-cent coin, then that one coin is the minimum
  for(i = 0; i < coins.length; i++) {
    var coinFound = false;        // Flag if we found a coin of sufficient value.

    if(cents === coins[i]) {
      change.push(1);
    } else {
      change.push(0);
    }

    if(coinFound === true) {
      return change;
    }
  }

  // Otherwise, for each value i < K,
  //
  // 1) Find the minimum number of coins needed to make i cents
  // Divide problem
  var reducedChange = cents;
  var currentMin;

  // if(cents === minCoins) {
  //   currentMin = cents;
  // }

  // for(i = 0; i < cents; i++) {
  //   var bottom = changeslow(i, coins, minCoins);
  //   var top = changeslow(cents-i, coins, minCoins);
  //
  //   var totalCoins = bottom.concat(test2).reduce(function(prev, curr) {
  //     return prev + curr;     // Add previous element to current element.
  //   });
  //
  //   if(totalCoins < minCoins) {
  //     minCoins = totalCoins;
  //   }
  //
  //   console.log(bottom, top);
  // }

  // while(reducedChange > 0) {
  //   reducedChange-=1;
  //   var bottom = changeslow(reducedChange, coins, currentMin);
  //   var top = changeslow(cents-reducedChange, coins, currentMin);
  //
  //   // Combine top and bottom and sum the arrays. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  //   var totalCoins = bottom.concat(test2).reduce(function(prev, curr) {
  //     return prev + curr;     // Add previous element to current element.
  //   });
  //
  //   if(totalCoins < minCents) {     // The divided problem returned a smaller sum of coins.
  //     bottom.forEach(function(val, idx) {
  //       change.push(val + top[idx]);
  //     })
  //
  //     return change;
  //   }
  // }
  // 2) Find the minimum number of coins needed to make K - i cents
  //
  // Choose the i that minimizes the sum of 1) and 2)
  console.log(change);
  return change;

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

function changedp(change, coins, minSequences) {
  if(change === 0) {      // Change is 0, don't select any coins.
    return 0;
  }

  // Check if minimum already exists (memoization), return that if it exists because we don't need to calculate it again.
  var minChange = minSequences.findIndex(function(elem, idx){
    if(elem.change === change) {
      return elem;
    }
  })

  if(minChange > -1) {       // Smaller amount found.
    return minChange;
  }

  var min = Number.MAX_SAFE_INTEGER;

  for(var i = 0; i < coins.length; i++) {

    if(coins[i] > change) {
      continue;     // The coin is to big to effect the number of coins required to give change.
    }

    var val = changedp(change-coins[i], coins, minSequences);

    if(val < min) {
      min = val;
    }

  }

  min = (min === Number.MAX_SAFE_INTEGER ? min : min + 1);

  minSequences.push({"change":change, "min":min});
  console.log(minSequences);
  return min;
}





// changeslow(15, [1, 2, 4, 8], 15);
changeslow(1, [1, 2, 4, 8], 1);

console.log(changegreedy(0, [1, 2, 4, 8]));      // Should return 0.
console.log(changegreedy(15, [1, 2, 4, 8]));     // Should be [1, 1, 1, 1]

console.log(changedp(0, [1, 2, 4, 8], new Array()));      // Should return 0.
console.log(changedp(15, [1, 2, 4, 8], new Array()));     // Should be [1, 1, 1, 1]
