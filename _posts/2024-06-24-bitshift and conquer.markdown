---
layout: post
title:  "Bitshift and conquer"
date:   2024-06-24 20:00:00 +0100
categories: mathematics
---
System performance has been at the point for a while that the impact of an operation can be somewhat obfuscated, programmers can write functional code faster and with less consideration having to be put towards performance. However, I find that many now seem to be ill prepared and almost completely unaware ~. I understand why time complexity does and should receive the lion's share of attention when optimising. It almost always should be the priority but with all of the abstraction the impact of the hardware's strengths and what is occuring in each operation can be forgotten when you may need that improvement.

CPU instructions do not all take the same amount of time, this is obvious once you think about it but seems to be frequently overlooked. Historically the complexity of some operations could impact the cost substantially if they were included. ~.

This testing was done in C between and on 16 bit integers, using for loops to iterate of each operator 1,000,000,000 times.

~
| Operator | Time (microseconds) |
| --- | --- |
| Addition ('+') | 2096568 |
| Subtraction ('-') | 2088277 |
| Multiplication('*') | 2883182 |
| Division ('/') | 4138737 |
| Modulo ('%') | 4517769 |
| Increment Prefix ('++') | 1991810 |
| Increment Postfix ('++') | 1979700 |
| Decrement Prefix ('--') | 1860077 |
| Decrement Postfix ('--') | 1835126 |
| Bitwise NOT ('~') | 2099390 |
| Bitwise AND ('&') | 2081397 |
| Bitwise OR ('|') | 2076915 |
| Bitwise XOR ('^') | 2076656 |
| Bitshift Left ('<<') | 2376427 |
| Bitshift Right ('>>') | 2056248 |

~

Do note that the scale we are seeing this in is ~, ~. So it does not take long before you will have spend more time thinking about improvements than the improvements will ever save, so keep it simple and don't waste time with *premature optimisation*. 

If you know a division is going to be consistant and used a lot, you can precalculate the reciprocal of the divisor, this can be gotten from the following:  $$ 1 / x $$ where $$ x $$ is the value we are wanting to be dividing by. ~

Even if a divisor is unknown at compile time but you know it will have to be used more than once it can quickly become worth calculating the reciprocal to multiply by, over having to do more than one division. A prominant example of such a use case in my mind would be a division operation for a vector:

```c
float = reciprocal = 1 / divisor;
x *= reciprocal;
y *= reciprocal;
z *= reciprocal;
```

If an operation is known to be dividing or multipling power of 2 and you dealing with an integer then this can be improved further, by making use of a bitshift operation. A leftward bit shift, usually denoted by the operator `<<`, has the same effect as multipling by $$ 2^n $$ , while a rightward bit shift, usually denoted by the operator `>>`,is the equivilent for dividing by $$ 2^n $$. 

$$ n / 2 = n * 0.5 = n >> 1 $$

A conceptually similar operation can be done with floating point values by interacting directly with its exponant but I can only really wish you luck if you want to pursure that into a full implementation.

~

In any good, smart, modern compiler will convert divisions into a more performant opertation with the same outcome when possible. So this ends up being more the concern of interpreted languages and projects where even if this optimisation is occouring it is having to be processed more frequently. So for most this may be worth being aware of but should only be focused on in moderation. Time should be put in when you know the operation is frequently used and you know the improvement can be easily implemented without compremising readability or taking too long.

It is not unreasonable to think that this is rather trivial now, but I have seen multiple instances of people arguing about the benifits of ```++i``` over ```i++```. These division alternatives can be situational but can also confer a substantial benefit.
