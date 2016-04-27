Algorithms_Proj_2
Coin change greedy algorithms implemented in JavaScript

!!!(It said on the grading rubricthat we have to include a readme and/or a makefile. So I assume that since we have only one file with some special instructions this readme should suffice for compiling and running our code.)!!!

Run code

node index.js [INPUT FILENAME].txt
Note:'.txt' file extension is required).

Input File Format

[CURRENCY_ARRAY]
[CHANGE_TO_RETURN]
...

Example Input File

[1, 4, 5, 6]
23
[1, 4, 7, 12]
12
...

Results

Results will be output to "[INPUT FILENAME]change.txt"

Output File Format

Algorithm [ALGORITHM_NAME]
[COUNT_OF_DENOMINATIONS]
[MIN_COINS_REQUIRED]
...

Example Output File

Algorithm changegreedy
[1,1,1,1]
4

Algorithm changedp
[1,1,1,1]
4

Algorithm changegreedy
[2,1,0,2]
5
...
