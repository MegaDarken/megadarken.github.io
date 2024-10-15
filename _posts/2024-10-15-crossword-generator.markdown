---
layout: post
title:  "Crossword generator"
date:   2024-10-15 20:00:00 +0000
categories: puzzle
---
As I mentioned in a [previous post]({% post_url 2024-10-10-crossword %}); I have created a program that can throw together a crossword puzzle out of a list of words and clues.

Since then I have:
- Given the crossword functionality its own repo.
- Polished up the usability a little, keeping it simple.
- Added command line arguments, making use of C++ `constexpr` for compile time hashes of the arg strings so args can be given to a switch statement.
- Set it up with CMake and a build YAML file so that compilation across Windows, MacOS, and Ubuntu is automated via Github Actions.

With that, and the modest scope, I felt that it was now in a reasonably releasable state:

https://github.com/MegaDarken/Crossword-standalone/releases/tag/v1.0.0

Now, you can just run the executable in a directory with a `wordQuestions.txt` file for it to pull the list from, and you will be prompted to enter all of the information the program needs. However you also have the option of providing command line arguments for these values, if one is given then that detail is not prompted.

- "-w" or "--width" How many letters wide the crossword will be, must be an integer.
- "-h" or "--height" How many letters tall the crossword will be, must be an integer.
- "-c" or "--count" The upper bound on words placed, must be an integer.s
- "-f" or "--first" is the central character the crossword will start with and build off of, must be a character.

I am considering further options and functionality, such as randomization of word selection, currently the work attempt order is longest first as this fills the most area, but is as a result consistent every time for any given start condition. What I am considering would take a seed value that could be used in the random shuffling of the word list. Another facet could be to give the option to change the output stream used so that you could write it to a file, or format an output as a CSV or similar.