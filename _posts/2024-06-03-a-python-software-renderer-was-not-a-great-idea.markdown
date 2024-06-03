---
layout: post
title:  "A Python software renderer was not a great idea in retrospect"
date:   2024-06-03 20:00:00 +0100
categories: graphics
---
Years ago now, during 2017 and early 2018 to be specific, I was required to create a project, the only criteria was that it had to be made in Python and demonstrate the use of a database. It may not come as much of a surprise that even back then that how graphics, especially 3D graphics, operates was an interest of mine even back then. So I knew that I wanted to make a 3D graphics implementation, but I wasn't that deluded about my abilities so it was simple in its ambitions.

The program just displays a 3D transform of the geometry you feed in from the database, and allows you to move your perspective using the UI. It is essentially a somewhat obtuse model viewer.

This was also the earliest instance of me making use of GIT for source control, GIT has seldom been absent from a project since.

Interestingly, while there are not the requirements in terms of hardware that you would expect with contemporary 3D, as the program displays using 'TKinter' it essentially only works with Windows making it much less broadly compatible than any of the hardware limitations would have.

In some respects this was a series of experiments bolted together, each element existed as a focus of interest and investigation for me, even if that ended up being redundant or unnecessary work. I wonder to what degree this impacted how it was viewed, as they demonstrate technical ability but also demonstrate poor design decisions, and it may also have been unclear that such decisions were intentional.

One example of a roundabout design would be the trigonometric functions, instead of using existing functions or specialised hardware which would have been standard and completely fine, the program makes use of Taylor serieses for Sine, Cosine, and Arctangent. This is an infinite sum, a polynomial approximation of a function, which with more iterations give you more precision. However, each step involves a power operation, a factorial operation, and division, and you are going to at least need iterations up to 7 before it starts being usable. These functions can be expensive in software, so it should come as no surprise that early real time implementations in the industry may use look up tables or be specifically designed around specific hardware to be even viable.

I had a mainly structural understanding of what composed geometry, and did make use of indexing to reduce repeat data such as vertices, but to achieve the use of a database for the program's requirement, all model data was stored in SQL format, meaning there is no direct interaction with standard formats.

Technically this program makes use of a spherical projection rather than the more ubiquitous planar perspective projection, this is not necessarily, it can be less complicated and high fields of view can have significantly less distortion but there is almost never straight lines meaning the rendering will be more complicated or inaccurate. This is still something I would like to see more of. If you would like to see a well thought out method of spherical, or more accurately in this case cartographic, projection I would recommend looking at blinky quake:
<https://github.com/shaunlebron/blinky/tree/master/>

While running there is some display modes you can switch between, but this is basic and was mostly for testing purposes as I built up.

![Wireframe](/assets/images/nea1.png)![Color](/assets/images/nea2.png)

The result is functional, even if not very useful, very basic software renderer with many issues and minimal compatibility with existing model formats. It exists as a curio.

![Bilinear](/assets/images/nea5.PNG)

Overall it is hardly amazing, the most major issues were fundamental design choices and I get the impression that many would be adverse to showing this at all. However from my perspective it was an important step, as it was my start point, my first functional 3D implementation. Without this I would not have started my journey towards bettering my understanding of what makes efficient and performant code. In another way; this now exists in my mind as a point of reference from which I can see how much I have improved, I would not say that I am proud of it as such but it makes me feel something close to that. I still feel somewhat embarrassed about its antiquity but also acknowledge that I only feel that because of how much I have improved, and the alternative is worse.