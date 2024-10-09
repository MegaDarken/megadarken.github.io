---
layout: post
title:  "Crossword"
date:   2024-10-10 20:00:00 +0100
categories: puzzle
---
For context; I find myself unable to pinpoint my exact motive for creating a crossword making program, it seems like it was a long term and cumulative drive, building up a robust collection of C functions was a good excuse though. Overall I am fairly happy with how it has turned out.

I have set this up flexibly, fetching the list of words and their corresponding clues at runtime. The list itself is within a standard text file with a clue-word pair on each line, separated by a semicolon (';'). An example line would look like the following:

binoclard;French four eyed.

As of writing this the text file used contains ~ words. I've been adding to that list a bit at a time as I have gotten the urge.

The primary process itself proceeds like the following:
- Load in the list of words.
- Sort them ordered by length, with the longest words first.
- Create a grid for letters to be entered into.
- Place a single letter to build off from.
- Examine each character in the grid to see if a down or across word can logically be placed in it, based on the characters around it.
- If it is possible, examine the characters along that line to determine the maximum bounds that a word could be.
- Search through the list of word for one that fits, starting from the index of the number of words already placed.
- If a word fits; place the word on the grid and swap that word to the index of the number of words already placed.
- Keep searching and placing words until the desired word count or until no more words are able to be placed.

There are aspects of this design that I like. Because of the bounds and swapping within the word list it is not necessary to check if a word has already been used, keeping the time complexity linear. As mentioned at the start, the majority of the code written for and around this were designed to be general purpose and easily able to be reused.


~

