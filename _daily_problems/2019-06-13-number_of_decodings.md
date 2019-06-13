---
layout: daily_problems
title: Number of decodings
comments: true
category: daily_problems
label: hard
---

## Problem statement
{:#problem_statement}

Given the mapping a = 1, b = 2, ..., z = 26, and an encoded message, you have to
count the number of ways it can be decoded. For example, the message '111' would
give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.

<br />

## The solution 🎉

Let's try looking at some examples to gain a little more clarity on the given
problem. Given any string, say '123456', let's enumerate the possibilities --
'abcdef', 'lcdef' and 'awdef'. Let's try '12121' -- 'ababa', 'laba', 'auba',
'abla', 'abau', 'lla' and 'auu'. Okay, there seems to be a pattern now. Given a
string of length n, we first check if a valid message of length 'n' is possible.
Now we move to a string of length n-1, having one pair, and evaluate the
possibilities, then to a string of length n-2, having two pairs, and do this
till the string is of length n/2. Well, this is the brute-force approach and to
be honest this is quite "brute-ish". I am not doing a time-complexity analysis,
but this looks bad (as bad as O($2^n$)). And having explained this solution, I
am not even gonna write code for this.

Let's try to figure out a better approach, a smarter one. Take the example of
'123456'. If I know the number of possibilities for the string '3456' and '23456',
I can figure out the number of possibilities of '123456'. How you ask? Let's
say I know that there are x number of possibilities for the string '3456', and
y number of possibilities for the string '23456', i.e., `n('3456') = x` and
`n('23456') = y`. Since '12' is a valid pair (value is less than 26), and '1' is
also a valid single digit (not '0'), `n('123456') = x+y`. So this gives us a
recursive algorithm to find the number of ways to decode such a message. Having
known the recursive steps, let's also take a look at the base cases --
`n('') = 1` and `n('0') = 0`. With this is mind, let's write some code.

```c++
int numDecodings(string s) {

    int len = s.length();

    // Base cases
    if (len == 0) {
        return 1;
    }
    if (s[0] == '0') {
        return 0;
    }


    // Recursive steps
    if (len >= 2 && atoi(s.substr(0, 2).c_str()) <= 26) {
        return numDecodings(s.substr(1, len-1)) +
               numDecodings(s.substr(2, len-2));
    }
    else {
        return numDecodings(s.substr(1, len-1));
    }
}
```

Special mention, the function `atoi` converts an ASCII string into integer. Here we
have a recursive function with the recurence relation: $T_n = T_{n-1} + T_{n-2}$,
whose solution is O($2^n$). Though it seems better (and actually is a little better),
but we did not improve much on the worst-case complexity front. Looking at the call
stack we'd realise that this problem has the `overlapping subproblems` property
alongwith the `optimal substructure` property, which makes Dynamic Programming
an ideal candidate for the solution. Here is an iterative dynamic programming solution.

```c++
int numDecodings_dp_iterative(string s) {

    int i = 0, len = s.length();
    vector<int> num_ways(len+1, 0); // num_ways[i] holds the result for n(s[:i])

    // Takes care of the base case when s="" is supplied
     if (len > 0)
        num_ways[i++] = 1;

    while (i <= len) {

        // If a valid pair is present at the beginning of the current substring
        if (i >= 2 && s[i-2] != '0' && atoi(s.substr(i-2, 2).c_str()) <= 26) {
            num_ways[i] += num_ways[i-2];
        }
        // If a valid digit is present at the beginning of the current substring
        if (i >= 1 && s[i-1] != '0') {
            num_ways[i] += num_ways[i-1];
        }

        i++;
    }

    return num_ways[len]; // num_ways[len] will hold the result
}
```

This is a bit (well, a lot) harder to implement than the recursive dynamic
programming solution, but it's better, surely. This solution takes O(n) time
and O(n) space. Now we ask, can we improve a  little more. Well, not from the
time-complexity point of view, but maybe on the space-complexity front. If we
look carefully, at any iteration i, we only need the value of num_ways[i-1] and
num_ways[i-2]. That's just two variables! So, turns out we don't need the array
(well, vector!) at all. Here's the solution.

```c++
int numDecodings_dp_optimised(string s) {

    int i = 0, len = s.length ();
    int m = 0, n = 0, temp;

    // Takes care of the base case when s="" is supplied
    if (len > 0)
        m = 1;

    while (i < len) {
        temp = 0;  // using temp for num_ways[i]
        if (i >= 1 && s[i-1] != '0' && atoi (s.substr (i-1, 2).c_str ()) <= 26){
	        temp += n;  // using n for num_ways[i-2]
	    }
        if (i >= 0 && s[i] != '0') {
	        temp += m;  // using m for num_ways[i-1]
	    }

        /* When i is incremented, num_ways[i-1] becomes num_ways[i-2] and
        num_ways[i] becomes num_ways[i-1] */
        i++;
        n = m;
        m = temp;
    }
    return m;
}
```

After a lot of improvements, this solution looks good to me, so I'd leave it at this.
Find all the source code [here](https://onlinegdb.com/ryt40JgJr). Don't forget
to check out the bonus problems.

### Bonus

Implement the brute-force approach and the recursive dynamic programming solutions
and time all the functions for an arbitrarily long input.

**PS:** Subscribe to [Daily Coding Problems](https://dailycodingproblems.com) for
more fun problems.
