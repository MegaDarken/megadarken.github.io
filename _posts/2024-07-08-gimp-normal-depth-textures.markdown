---
layout: post
title:  "GIMP normal depth textures"
date:   2024-07-08 20:00:00 +0100
categories: graphics
---
So you have an image that you think would make a good texture, but you want to make of the most of post-90s texturing technology? Well unfortunately there is a lot to that, but as a start I can at least tell you what I do. We can square up what we have, make it tilable and generate a depth map and a normal map.

~ it can help to first trim down the bulk of the image. A good way of doing to use the 'Rectangle Select Tool' which, as of writing this, has the default shortcut of 'R' key, then select 'Image' -> 'Crop to Selection' ~

~ guides on the bounds you want the shape to fill ~ this can be done ~

~ perspective transform ~

~ crop to selection to the shape of the texture proper this time. ~

Optionally, now would be a good time to get your texture to the dimentions you want, generally GPUs can most efficiently handle textures that are square and which have pixel dimentions that are a power of 2, e.g. 32, 64, 128, 256, 512, 1024.

![Layer to be scaled](/assets/images/~);

~ right click on the layer "Scale Layer..." ~

~ tile seamless ~

Now that we have the texture in a usable form we can now create the maps for the texture. First you should duplicate the layer for each of the maps, ~

![Duplicated layers](/assets/images/~);

~ normal map ~ 'Filters' -> 'Generic' -> 'Normal Map...' ~ you can adjust these settings but generally~

~ depth~? map ~ I have found that you will most likely need to dial in ~

~