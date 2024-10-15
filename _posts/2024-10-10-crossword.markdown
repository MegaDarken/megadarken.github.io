---
layout: post
title:  "Crossword"
date:   2024-10-10 20:00:00 +0100
categories: puzzle
---
For context; I find myself unable to pinpoint my exact motive for creating a crossword making program, it seems like it was a long term and cumulative drive, building up a robust collection of C functions was a good excuse though. Overall I am fairly happy with how it has turned out.

I have set this up flexibly, fetching the list of words and their corresponding clues at runtime. The list itself is within a standard text file with a clue-word pair on each line, separated by a semicolon (';'). An example line would look like the following:

binoclard;French four eyed.

As of writing this the text file used contains 491 words. I've been adding to that list a bit at a time as I have gotten the urge.

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

<h3>An example</h3>

```
┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
│▒▒▒▒│1   │    │2   │    │3   │    │4   │▒▒▒▒│5   │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│6   │    │7   │    │8   │    │9   │    │▒▒▒▒│▒▒▒▒│10  │
│▒▒▒▒│    │    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │    │    │    │    │    │    │    │▒▒▒▒│▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│11  │    │12  │    │13  │    │    │    │14  │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │    │    │    │    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│15  │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│16  │    │    │    │▒▒▒▒│    │▒▒▒▒│17  │    │    │
│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │    │    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│18  │    │    │19  │    │    │▒▒▒▒│▒▒▒▒│20  │    │    │    │    │    │    │21  │▒▒▒▒│    │▒▒▒▒│22  │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│
│    │    │    │    │    │    │▒▒▒▒│▒▒▒▒│    │    │    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│23  │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│24  │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│25  │
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│26  │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│27  │    │    │▒▒▒▒│28  │    │    │    │    │▒▒▒▒│    │
│    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │▒▒▒▒│    │    │    │    │    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│29  │    │    │    │30  │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│31  │    │    │    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│32  │    │▒▒▒▒│    │
│    │    │    │    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│33  │▒▒▒▒│34  │    │    │35  │    │    │▒▒▒▒│36  │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│37  │▒▒▒▒│    │▒▒▒▒│    │
│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │    │▒▒▒▒│    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│38  │    │    │    │    │39  │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
│▒▒▒▒│    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│40  │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │▒▒▒▒│    │
│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│41  │    │    │42  │    │    │    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│43  │    │    │
│    │    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│44  │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│45  │    │▒▒▒▒│    │▒▒▒▒│    │
│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │    │▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│46  │    │    │    │▒▒▒▒│▒▒▒▒│47  │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │    │    │    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│48  │    │    │▒▒▒▒│49  │▒▒▒▒│50  │    │    │    │    │    │    │51  │    │    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│52  │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │
│    │    │    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │    │    │    │    │    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│53  │    │54  │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│
│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │    │    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│55  │    │56  │▒▒▒▒│57  │    │    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│58  │    │59  │    │    │    │60  │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│61  │
│    │    │    │▒▒▒▒│    │    │    │▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│62  │    │63  │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│64  │    │65  │    │    │
│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │    │    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │    │    │    │    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│66  │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
│▒▒▒▒│▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│▒▒▒▒│    │    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│    │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│▒▒▒▒│67  │    │    │    │    │    │    │    │▒▒▒▒│68  │    │    │    │    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│69  │    │    │▒▒▒▒│    │▒▒▒▒│    │
│▒▒▒▒│    │    │    │    │    │    │    │    │▒▒▒▒│    │    │    │    │    │▒▒▒▒│▒▒▒▒│    │▒▒▒▒│    │▒▒▒▒│▒▒▒▒│▒▒▒▒│    │    │    │▒▒▒▒│    │▒▒▒▒│    │
└────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
```

<div class="wrap-container">
    <div class="wrap-column">
<h4>Across</h4>
1: To randomize the order of a set. (7)<br>
6: Dramatic actor. (8)<br>
11: Operating independent of external control. (9)<br>
16: reflection of sound. (4)<br>
17: Feline, organic vermicide. (3)<br>
18: Something coming out of a system. (6)<br>
20: Sleeplessness. (8)<br>
24: Relief carved portrait jewellery. Small guest appearance. (5)<br>
26: Pod born seed vegetable. (4)<br>
27: Hydrophobic hydrocarbon chemical, food, fuel, lubrication. (3)<br>
28: Classically wooly caprine. (5)<br>
29: Biblical sea serpent. (9)<br>
31: Speed of sound multiple. (4)<br>
32: Masculine pronoun. Abrahamic God when capitalized. (2)<br>
34: Critical appraisal. Formal assessment for necessary changes. (6)<br>
36: Inherent vital force in Taoism. (3)<br>
38: To drill a hole, very droll. (6)<br>
40: To understand the will of creativity. To see art in the world. (17)<br>
41: The most allowed. (7)<br>
43: Place down. Put in a state. Assign a value. Mount a stone. To represent a place and time. (3)<br>
44: Rigid elastic season. (6)<br>
45: Impersonal pronoun. Alien clown. (2)<br>
46: Noble emissive signage. (4)<br>
48: Oily cooking. Croaky voice. (3)<br>
50: Erbal verror, transposing the sirst founds of words. (10)<br>
52: Lone star state. (5)<br>
53: Optic organ. (3)<br>
55: Tattered cloth. Newspaper slang. (3)<br>
57: Direct addressment of the one addressed. (3)<br>
58: The speed, ease, and nimbleness of motion. (7)<br>
62: Orientation. Artistic representation of a person. (8)<br>
64: of ancient Scandinavia. (5)<br>
66: Indicating location. (2)<br>
67: Non alkali metal in the lithium group. (8)<br>
68: Basis of commerce. (5)<br>
69: Definite article. (3)<br>
    </div>
    <div class="wrap-column">
<h4>Down</h4>
2: Ancient Sumer city. Primitive phoneme. (2)<br>
3: Association and gridiron, sports. (8)<br>
4: Former. Other from a past relationship. (2)<br>
5: Mixture of solid pigment cosmetic or protective coating, and to apply it. (5)<br>
7: Comprehensive reference media on a range of subjects. (12)<br>
8: As their career. Up to the standards of the job. (12)<br>
9: Furthest point in trajectory from Earth. (6)<br>
10: A set of articles or implements. Young small mammals. (3)<br>
12: Norse hammer wielder, Thursday namesake. (4)<br>
13: Coin production. Strong fresh herb. (4)<br>
14: Transmission and exchange of information. (13)<br>
15: Negative, disagreement. (2)<br>
17: Able to be understood. (14)<br>
19: Leopard and jaguar genus. (7)<br>
21: Recognition of importance or quality. Public gratitude. (15)<br>
22: The accuracy been the mental and physical, in terms of motor skills. (12)<br>
23: zilch. name. (3)<br>
25: Fanciful and creative. (11)<br>
30: Tailless primate. To imitate. (3)<br>
33: Power of will, the act of choice. (8)<br>
35: An atom unequal in nucleus and shell charge. (3)<br>
37: Purest concentrated essence of something. (12)<br>
38: Iron boned dam builders. (6)<br>
39: A space equipped for physical exercise. (9)<br>
40: Protective cover for an end or tip. Close fitting headwear. (3)<br>
42: Document testifying for the bearer. Freudian primitive instincts. (2)<br>
44: Fine granular form mineral, commonly quartz. (4)<br>
47: Draft bull. (2)<br>
48: Promethean gift. (4)<br>
49: Having monarchical nobility. (5)<br>
51: Subcontinental land surrounded by water. (6)<br>
52: Matching pair. Gemini. (5)<br>
54: Mostly harmless. (5)<br>
56: To move or travel. Board game. (2)<br>
59: Clothes flattener. Most atomically stable element, ferrous. (4)<br>
60: Circular portable tent, of the nomadic. (4)<br>
61: Toothed torque transmitter. (4)<br>
62: Female swan. Inky implement. (3)<br>
63: Rodent, commonly considered vermin. (3)<br>
65: Batoid. Photon beam. (3)<br>
    </div>
</div>

