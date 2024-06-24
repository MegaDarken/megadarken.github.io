---
layout: post
title:  "Bitshift and conquer"
date:   2024-06-24 20:00:00 +0100
categories: computing
---
System performance has been at the point for a while that the impact of an operation can be somewhat obfuscated, programmers can write functional code faster and with less consideration having to be put towards performance. However, I find that many now seem to be ill prepared and almost completely unaware of optimisation outside of time complexity. I understand why time complexity does and should receive the lion's share of attention when optimising. It almost always should be the priority but with all of the abstraction the impact of the hardware's strengths and what is occuring in each operation can be forgotten when you may need that improvement.

CPU instructions do not all take the same amount of time, this is obvious once you think about it but seems to be frequently overlooked. Historically the complexity of some operations could impact the cost and complexity substantially if they were included. I am mainly thinking about the difference between the mechanical operations of the [Arithmometer]( https://en.wikipedia.org/wiki/Arithmometer ), which did multiplication through successive addition and did division through a combination of subtraction and digit shifting that the user had to do manually, and "[The Millionaire]( https://en.wikipedia.org/wiki/The_Millionaire_(calculator) )", which could calculate multiplications and divisions in a single crank.

Here we are measuring operators when in an applied setting as a point of reference to work from. This testing was done in C between and on 16 bit integers, using for loops to iterate over each operator 1,000,000,000 times.

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
| Bitwise OR ('\|') | 2076915 |
| Bitwise XOR ('^') | 2076656 |
| Bitshift Left ('\<<') | 2376427 |
| Bitshift Right ('\>>') | 2056248 |

In these results we see some interesting variance, there is many similar durations but multiplication notably takes some more time than most other operations, but the division and modulo take double the amount of time of almost all of the other operators we tested.

Do note that the scale we are seeing this in means that the impact is apparent because such a substantial proportion of the processing is just that operation, but in most programs expect the overall impact to be minimal. It does not take long before you will have spend more time thinking about improvements than the improvements will ever save, so keep it simple and don't waste time with *premature optimisation*. 

Now that we have some measurements of how performant each operator is, we can work with a more informed preference for procedures based on which, and which quantities of operators are used. In some cases the improvements would be to make use of tricks and shortcuts that exist around a function or formula in the field of Mathematics already as avoiding division being desirable did not start with electronic computers.

If you know a division is going to be consistent and used a lot, you can precalculate the reciprocal of the divisor, this can be gotten from the following:  $$ 1 / x $$ where $$ x $$ is the value we are wanting to be dividing by. With the reciprocal, for any given division we can instead divide as $$ n / x = n * (1 / x) $$.

Even if a divisor is unknown at compile time but you know it will have to be used more than once it can quickly become worth calculating the reciprocal to multiply by, over having to do more than one division. A prominent example of such a use case in my mind would be a division operation for a vector:

```c
float = reciprocal = 1 / divisor;
x *= reciprocal;
y *= reciprocal;
z *= reciprocal;
```

If an operation is known to be dividing or multiplying power of 2 and you are dealing with an integer then this can be improved further, by making use of a bitshift operation. A leftward bit shift, usually denoted by the operator `<<`, has the same effect as multiplying by $$ 2^n $$ , while a rightward bit shift, usually denoted by the operator `>>`,is the equivalent for dividing by $$ 2^n $$. 

$$ n / 2 = n * 0.5 = n >> 1 $$

A conceptually similar operation can be done with floating point values by interacting directly with its exponent but I can only really wish you luck if you want to pursue that in your projects.

It is also worth being aware that within any good, smart, modern compiler will convert divisions into a more performant operation with the same outcome when possible. So this ends up being more the concern of interpreted languages and projects where even if this optimisation is occurring it is having to be processed more frequently. So for most this may be worth being aware of but should only be focused on in moderation. Time should be put in when you know the operation is frequently used and you know the improvement can be easily implemented without compromising readability or taking too long.

It is not unreasonable to think that this is rather trivial now, but I have seen multiple instances of people arguing about the benefits of ```++i``` over ```i++```. These division alternatives can be situational but can also confer a substantial benefit.
