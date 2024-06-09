---
layout: post
title:  "Normal maps and TBN"
date:   2024-05-10 20:00:00 +0100
categories: graphics
---
When rendering with any consideration for the directions surfaces are facing, such as almost any time that lighting is involved, having or calculating a polygon's normal vector becomes effectively nessercery.

For a quick overview; a surface normal is effectively a vector that points directly out of any point on a surface, you could think about it in term of the direction that part of the face is flatly towards. When discussing normals you may commonly see surface normals being shown as a line or arrow coming out of the surface.

![Normal Diagram](/assets/images/normal.png)

Above: a diagram of a triangle in 3D space, with its surface normal represented by an arrow.

~

![Normal Teapot](/assets/images/Screenshot%20from%202023-01-23 21-32-10.png)

Above: a teapot model whose normal vectors are visable as RGB color.

This kind of visualisation is useful for checking that the normals make sense on a per fragment scale in a feasable way. This data is on the GPU's end so it is in some sense more distant than other areas of memory, and there can easily be millions on your screen at any one time so checking indivual values would be more than a little obtuse. Putting the surfaces in a comprehendable enviromental context also helps.

In terms of actual utility; A prolific use of normals would be in the context of reflection of the light direction based on the normal, the result of which is then used in a dot product with the vector from the view point to the surface. ~

~

Modifing the surface normal on a texture level requires of the further context of directions that the texture is going to be modifing the normal in. For the most part these direction vectors point along the surface and align with the orientation of the surface's texture or UV. As they exist as 2 directions, and function relitive to the normal, they would be the 'tangent' and 'bitangent'. Both the 'tangent' and 'bitangent' can be expected to be vectors 90 degrees from the normal vertor, and usually 90 degrees from each other unless the UV is skewed or distorted.

~

If there is any form of generation or modification of model UVs then it will be nessercery to be able to calculate the correct 'tangent' and 'bitangent' from the geometry. ~

```
vertexDeltaA = vertexA - vertexC
vertexDeltaB = vertexB - vertexC

textureCoordinatesDeltaA = textureCoordinatesA - textureCoordinatesC
textureCoordinatesDeltaB = textureCoordinatesB - textureCoordinatesC

reciprocal = 1 / (textureCoordinatesDeltaA.x * textureCoordinatesDeltaB.y - textureCoordinatesDeltaA.y * textureCoordinatesDeltaB.x)

tangent = reciprocal * (textureCoordinatesDeltaB.y * vertexDeltaA - textureCoordinatesDeltaA.y * vertexDeltaB)

bitangent = reciprocal * (-textureCoordinatesDeltaB.x * vertexDeltaA + textureCoordinatesDeltaA.x * vertexDeltaB)
```

~
