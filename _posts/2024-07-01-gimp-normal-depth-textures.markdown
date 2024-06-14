---
layout: post
title:  "GIMP normal depth textures"
date:   2024-07-01 20:00:00 +0100
categories: graphics
---
So you have an image that you think would make a good texture, but you want to make of the most of post-90s texturing technology? Well unfortunately there is a lot to that, but as a start I can at least tell you what I do. We can square up what we have, make it tilable and generate a depth map and a normal map.

~ it can help to first trim down the bulk of the image   ~ then select 'Image' -> 'Crop to Selection' ~

~ guides on the bounds you want the shape to fill ~ this can be done ~

~ perspective transform ~

~ crop to selection to the shape of the texture proper this time. ~

Optionally ~ scale layer ~

~ tile seamless ~

Now that we have the texture in a usable form we can now create the maps for the texture. First you should duplicate the layer for each of the maps, ~

~ normal map ~ 'Filters' -> 'Generic' -> 'Normal Map...' ~ you can adjust these settings but generally~

~ depth~? map ~ you will need to dial in ~

~