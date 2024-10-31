---
layout: post
title:  "Random Number Table"
date:   2024-10-31 18:00:00 +000
categories: mathematics
---
Admittedly an unusual approach using a table to produce random numbers like this, rather than a more traditional pseudorandom number generator, is a somewhat self indulgent experiment. This started as an examination and expansion of the pseudorandom number table used by Doom (1993). 

```
__UINT8_TYPE__ rndtable[256] = {
    0,   8, 109, 220, 222, 241, 149, 107,  75, 248, 254, 140,  16,  66 ,
    74,  21, 211,  47,  80, 242, 154,  27, 205, 128, 161,  89,  77,  36 ,
    95, 110,  85,  48, 212, 140, 211, 249,  22,  79, 200,  50,  28, 188 ,
    52, 140, 202, 120,  68, 145,  62,  70, 184, 190,  91, 197, 152, 224 ,
    149, 104,  25, 178, 252, 182, 202, 182, 141, 197,   4,  81, 181, 242 ,
    145,  42,  39, 227, 156, 198, 225, 193, 219,  93, 122, 175, 249,   1 ,
    175, 143,  70, 239,  46, 246, 163,  53, 163, 109, 168, 135,   2, 235 ,
    25,  92,  20, 145, 138,  77,  69, 166,  78, 176, 173, 212, 166, 113 ,
    94, 161,  41,  50, 239,  49, 111, 164,  70,  60,   2,  37, 171,  75 ,
    136, 156,  11,  56,  42, 146, 138, 229,  73, 146,  77,  61,  98, 196 ,
    135, 106,  63, 197, 195,  86,  96, 203, 113, 101, 170, 247, 181, 113 ,
    80, 250, 108,   7, 255, 237, 129, 226,  79, 107, 112, 166, 103, 241 ,
    24, 223, 239, 120, 198,  58,  60,  82, 128,   3, 184,  66, 143, 224 ,
    145, 224,  81, 206, 163,  45,  63,  90, 168, 114,  59,  33, 159,  95 ,
    28, 139, 123,  98, 125, 196,  15,  70, 194, 253,  54,  14, 109, 226 ,
    71,  17, 161,  93, 186,  87, 244, 138,  20,  52, 123, 251,  26,  36 ,
    17,  46,  52, 231, 232,  76,  31, 221,  84,  37, 216, 165, 212, 106 ,
    197, 242,  98,  43,  39, 175, 254, 145, 190,  84, 118, 222, 187, 136 ,
    120, 163, 236, 249
};
```

Above you see the table by Doom (1993) but with the second seemingly erroneous 0 replaced with the missing 1.

Doom uses multiple indices, one for each of the purposes a random number could be used for, so that the program as a whole could remain deterministic, consistent between multiple instances or iterations of the program running, and not have something like a screen effect cause a enemy to act different if you have a widescreen monitor.  

Being deterministic was crucial for Doom's demo replay feature and keeping multiplayer's bandwidth down, minimizing incongruities, this need has not gone away.

My adaption adds an array of 256 8bit indexes that are used to reference the original table. When an index is used it is incremented, and indices are selected by value of the previous component of an operation, with the 0th index used at the start. Larger integers are created by bit-shifting and combining the data type's size worth of bytes. There are distinct functions for each size of data type, accompanying functions for seeds to be given for adding customization to the randomization, and _generics for automatically handling the ambiguity between architectures.

It is more like a shuffled deck of cards in theory this should only repeat approximately after a number of iterations of the maximum value of the data type size in integer form, although it will be less if the same set is having other gets.

This means at least on the scale of the data type used, repeated values should be considerably less likely, all going well you should not see a value again until the next interval's worth of iterations but in terms of the interval for a random number generator it's not bad but it's not great, and its using 512 bytes, certainly more that most pseudorandom number generator algorithms. The size is certainly an area that could be improved. One of the bytes does also repeat, which is not ideal.

This method does have the qualities of being very simple, fast and portable, consisting of only array accesses, increments and bit-shifts. It also trends towards being a more human pleasing kind of pseudo-randomness. I know that likely sounds a bit ephemeral, but it is very possible for someone to be explicitly asking for more randomness while implicitly asking for less.

![Tim Cain talking about randomness](https://youtu.be/DqL9R5PqE20)

The human perception of true randomness is not particularly accurate, this is what the success of casinos is based on. Any value should be equally likely, independent of the values before and after it, but it is common for many to instinctively think that a value that has already occurred is less likely, proportional to its recency.

This algorithm is designed first and foremost to be human facing and not an emulation of true randomness.

This won't stop the complaining about missing a 95% chance to hit, that 5% still exists in some form, but this would ensure that a small chance is inevitable within a finite number of iterations.

I plan to further investigate the qualities of what I have made in future, checking if my presumptions are true. It would also be nice to know if there was any tendencies I overlooked. I am interested about the further utility of this or at least something like this.

Now, really this post is about the crossword program. Previously, in the first release, with any specific set of starting parameters the resulting crossword would always be the same, a 10 by 10 starting with the letter 'r' and the same word list, for example, can be run as many times as you like with no change at all. Now there is the option to add randomness into the process. By default the list of words is sorted into length order so that the longest words are tried first, this means more options are left open later on, ensuring more space is able to be filled. Really a rework to try and focus on longer words, even while randomized, may be worthwhile.

Beyond that there has also been a further version that adds the ability to append the output to a file of the user's choice, through an arg.

The releases can be found here, compiled for Windows, MacOS, and Ubuntu:

![v1.0.2](https://github.com/MegaDarken/Crossword-standalone/releases/tag/v1.0.2)

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=MegaDarken&repo=Crossword-standalone)](https://github.com/MegaDarken/Crossword-standalone)

Anyway, I hope you have a spooky spooker spookums!