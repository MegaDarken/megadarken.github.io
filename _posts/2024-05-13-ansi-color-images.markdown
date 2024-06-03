---
layout: post
title:  "ANSI color images"
date:   2024-05-13 20:00:00 +0100
categories: graphics
---
An idea that has been rattling around in my head is making the most out of the colors that a console output can display.

ANSI escape sequences have been around for a long time but for much of that its relationship with color existed as a course 3 or 4 bit depth. To be fair; for most console applications, especially in its original context, 8 or 16 colors should be sufficient. The standard windows console colors are still 4-bit.

Later a 256 color table and then 24-bit full color was added to ANSI. The 256 colors are designed for lookup tables making them okay if a little cumbersome if you are not working with lookup tables already, but the 24-bit color is perfect if you are wanting to map the color from the majority of image files in use.

Another aspect of notable consideration is that, in my experience, pixels are usually square, but characters in the console tend to be rectangular, but thankfully around twice the height. A character that effectively splits its space horizontally in half, such as a half block character ('▀'), would be able to represent 2 pixels each in a much more square form, and can use the 2 colors of the foreground and background between them.

Implemented in C, and focused on the more broadly used 4-bit color first, images are loaded in and displayed 2 rows at a time.

![4-bit color](/assets/images/Screenshot%20from%202024-04-28%2012-46-11.png)

Adding the functionality of 24-bit ANSI color from here was relatively simple, but having the program at least attempt to make the Windows terminal display 24-bit colors is worth noting as part of this.

![24-bit color](/assets/images/Screenshot%20from%202024-04-28%2016-32-57.png)

The intention of this is at least get a base understanding of what is possible in terms of graphically improving other programs.