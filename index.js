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


// changeslow(15, [1, 2, 4, 8], 15);
changeslow(1, [1, 2, 4, 8], 1);

console.log(changegreedy(0, [1, 2, 4, 8]));      // Should return 0.
console.log(changegreedy(15, [1, 2, 4, 8]));     // Should be [1, 1, 1, 1]
