---
layout: post
title:  "Normal maps and TBN"
date:   2024-06-10 20:00:00 +0100
categories: graphics
---
When rendering with any consideration for the directions surfaces are facing, such as almost any time that lighting is involved, having or calculating a polygon's normal vector becomes effectively nessercery.

For a quick overview; a surface normal is effectively a vector that points directly out of the surface, you could think about it in term of the direction that part of the face is flatly towards. When discussing normals you may commonly see surface normals being shown as a line or arrow coming out of the surface.

![2D Normal Diagram]()

~

![Normal Teapot](/assets/images/Screenshot%20from%202023-01-23 21-32-10.png)
Above: a teapot model whose normal vectors are visable as RGB color.

This kind of visualisation is useful for checking that the normals make sense on a per fragment scale in a feasable way. This data is on the GPU's end so it is in some sense more distant than other areas of memory, and there can easily be millions on your screen at any one time so checking indivual values would be more than a little obtuse. Putting the surfaces in a comprehendable enviromental context also helps.

In terms of actual utility; A prolific use of normals would be in the context of reflection of the light direction based on the normal, the result of which is then used in a dot product with the vector from the view point to the surface. ~

~
