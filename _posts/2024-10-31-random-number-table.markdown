---
layout: post
title:  "Random Number Table"
date:   2024-10-31 18:00:00 +000
categories: mathematics
---
Admittedly an unusual approach using a table to produce random numbers like this, rather than a more traditional pseudorandom number generator, is a somewhat self indulgent experiment. This started as an examination and expansion of the pseudorandom number table used by Doom (1993). 

```
__UINT8_TYPE__ rndtable[256] = {
    0,   8,   109, 220, 222, 241, 149, 107,  75, 248, 254, 140,  16,  66 ,
    74,  21,  211, 47,  80,  242, 154,  27, 205, 117, 157,  89,  208,  36 ,
    95,  110, 85,  48,  212, 29, 32, 179,  22,  79, 200,  119,  28, 188 ,
    234, 23,  202, 55,  68,  145,  62,  131, 184, 190,  91, 127, 152, 217 ,
    12,  104, 25,  178, 252, 182, 83, 177, 141, 169,   4,  81, 181, 35 ,
    199, 42,  39,  227, 155, 124, 225, 193, 219,  93, 122, 88, 249,   1 ,
    210, 143, 70,  174, 46,  246, 65,  53, 163, 5, 168, 135,   2, 235 ,
    67,  92,  20,  207, 138, 233,  69, 166,  78, 176, 173, 160, 148, 113 ,
    94,  161, 41,  50,  239, 49, 111, 164,  134,  60,   189,  37, 171,  13 ,
    214, 156, 11,  56,  204, 215, 44, 229,  73, 146,  77,  61,  218, 64 ,
    209, 106, 63,  105, 195, 86,  96, 203, 121, 101, 170, 247, 137, 213 ,
    34,  250, 108, 7,   255, 237, 129, 40,  144, 18, 112, 142, 103, 10 ,
    24,  223, 51,  120, 198, 58,  172,  82, 128,   3, 132,  30, 150, 115 ,
    72,  224, 97,  206, 133, 45,  240,  90, 151, 114,  59,  33, 159,  228 ,
    191, 139, 153, 98,  125, 196,  15,  245, 194, 253,  54,  14, 6, 226 ,
    71,  17,  180, 147, 186, 87, 244, 130,  230,  102, 123, 251,  26,  162 ,
    192, 201, 52,  231, 232, 76,  31, 221,  84,  167, 216, 165, 158, 116 ,
    197, 38,  183, 43,  185, 175, 19, 238, 100,  243, 118, 9, 187, 136 ,
    57,  99,  236, 126
};
```

Above you see the table used by Doom (1993) but with the duplicates replaced.

Doom uses multiple indices, one for each of the purposes a random number could be used for, so that the program as a whole could remain deterministic, consistent between multiple instances or iterations of the program running, and not have something like a screen effect cause a enemy to act different if you have a widescreen monitor.  

Being deterministic was crucial for Doom's demo replay feature and keeping multiplayer's bandwidth down, minimizing incongruities, this need has not gone away.

My adaption adds an array of 256 8bit indexes that are used to reference the original table. When an index is used it is incremented, and indices are selected by value of the previous component of an operation, with the 0th index used at the start. Larger integers are created by bit-shifting and combining the data type's size worth of bytes. There are distinct functions for each size of data type, accompanying functions for seeds to be given for adding customization to the randomization, and _generics for automatically handling the ambiguity between architectures.

It is more like a shuffled deck of cards in theory this should only repeat approximately after a number of iterations of the maximum value of the data type size in integer form, although it will be less if the same set is having other gets.

This means at least on the scale of the data type used, repeated values should be considerably less likely, all going well you should not see a value again until the next interval's worth of iterations but in terms of the interval for a random number generator it's not bad but it's not great, and its using 512 bytes, certainly more that most pseudorandom number generator algorithms. The size is certainly an area that could be improved. One of the bytes does also repeat, which is not ideal.

This method does have the qualities of being very simple, fast and portable, consisting of only array accesses, increments and bit-shifts. It also trends towards being a more human pleasing kind of pseudo-randomness. I know that likely sounds a bit ephemeral, but it is very possible for someone to be explicitly asking for more randomness while implicitly asking for less.

![Tim Cain talking about randomness:](https://youtu.be/DqL9R5PqE20)
<div class="video-container ratio16by9">
    <iframe class="responsive-iframe" src="http://www.youtube.com/embed/DqL9R5PqE20" allowfullscreen="" frameborder="0">
    <a href="https://youtu.be/DqL9R5PqE20">Implementing Randomness</a>
    </iframe>
</div>

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