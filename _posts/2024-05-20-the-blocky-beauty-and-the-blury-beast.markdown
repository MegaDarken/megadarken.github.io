---
layout: post
title:  "The Blocky Beauty and the Blurry Beast"
date:   2024-05-20 20:00:00 +0100
categories: programming graphics
---
When it comes to texture filtering, forgoing the mipmapping and anisotroping filtering techniques for now and just focusing on sampling preferances, there is 2 main options: Bilinear and Nearest Neighbour.

![Bilinear and Nearest](/assets/images/~)

Nearest Neighbour just gets the value of the nearest pixel and uses it, while Bilinear takes the 4 nearest pixels and interpolates between them based on the distances from them. Nearest Neighbour was the faster of the 2 but there is not a huge increase with Bilinear.

Nearest Neighbour was used in the PS1 and Software rendered PC games of the 90s and so it has come to denote that, while Bilinear filtering came in with a smoothness as part of the next generation of realistic graphics. 

Now texture size, anti-aliasing, and postprocessing have gotten to the point that the differences between the choices are minimised, but they do still exist. Nowerdays technical limitation are occationally the reason but mainly when you are noticing the texture filtering, expecially when it is Nearest Neighbour, that usually means it was an artistic choice.

