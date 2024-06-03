---
layout: post
title:  "A python software renderer was not a great idea in retrospect"
date:   2024-06-03 20:00:00 +0100
categories: graphics
---
Years ago now, during 2017 and early 2018 to be specific, I was required to create a project, the only criteria was that it had to be made in Python and demonstrate the use of a database. It may not come as much of a surprise that even back then that how graphics, esspecially 3D graphics, operates was an interest of mine even back then. So I knew that wanted to make a 3D graphics implementation, but I wasn't that deluded about my abilities so it was simple in its ambisions.

The program just displays a 3D transform of the geometry you feed in from the database, and allows you to move your perspective using the UI. It is essentally a somewhat obtuse model viewer.

This was also the earliest instance of me making use of GIT for source control, GIT has seldom been absent from a project since.

Interestingly; while there is not the requirements in terms of hardware that you would expect with contempory 3D, as the program displays using 'TKinter' it essentially only works with Windows making it much less broadly compatable than any of the hardware limitations would have.

In some respects was a series experiments bolted together, each element existed as a focus of interest and investigion for me, even if that ended up being redundant or unnessercery work. I wonder to what degree this impacted how it was viewed, as it may have been unclear ~

One example would be trigonometric functions, instead of using existing functions or speciallised hardware which would have been standard and completely fine, the program makes use of Taylor serieses for Sine, Cosine, and Arctangent. This is an infinite sum, a polynomial aproximation of a function, which which more iterations give you more precision. However, each step involves a power operation, a factorial operation, and division, and you are going to at least need iterations up to 7 before it starts being usable. So it should come as no surpise that early real time implementations ~

I had a mainly structural understanding of what composed geometry, and did make use of indexing to reduce repeat data such as vertexes, but ~

Technically this program makes use of a spherical projection rather than the more ubiquitous planar perspective projection, this is not nessercerrly, it can be less complecated and high fields of view can have significantly less distortion but there is almost never straight lines meaning the rendering will be more complicated or inaccurate. ~ ~

![Wireframe](/assets/images/nea1.png)![Color](/assets/images/nea2.png)

The result is functional, even if not very useful, very basic software renderer with many issues and minimal compatibility with existing model formats. ~

![Bilinear](/assets/images/nea5.PNG)

Overall it is hardly amazing, the most major issues were fundemental design choices~ it was an important step towards bettering my understanding of what makes efficent and performant code, ~. This now exists in my mind as a point of referance from which I can see how much I have improved, I would not say that I am proud of it as such but it is a related feeling. ~