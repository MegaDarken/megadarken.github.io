---
layout: post
title:  "Proton on Applications outside of Steam"
date:   2024-08-05 20:00:00 +0100
categories: software
---

~ I find that this is more than workable with most older programs that use common graphical bindings such as OpenGL, DirectX, or Vulcan. Where you will run into issues is with programs that make use of '.Net' panels, windows and elements, or if it is dependant upon a more obtuse resource within Windows. ~

![Paint dot net in Proton]()

~ the location where 'Wine' exists on your system, by default this has the directory "~/.wine".

An good way of finding the location of your Proton install is; in your Steam library, find the version of Proton that you are wanting to use, right click on it.

![Right Clicked]()

Select 'Properties...', this should open the properties window, select 'Installed Files', and in that section click the 'Browse...' button. This will have opened the directory containing the 'proton' file whose location we need.