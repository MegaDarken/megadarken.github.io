---
layout: post
title:  "Proton on Applications outside of Steam"
date:   2024-07-05 20:00:00 +0100
categories: software
---

When you have an application that you are wanting to run on Linux but the program in question has designed and compiled for ~

~ I find that this is more than workable with most older programs that use common graphical bindings such as OpenGL, DirectX, or Vulcan. Where you will run into issues is with programs that make use of '.NET' panels, windows and elements, or if there is dependancies upon a more obtuse resources within Windows. Installers being involved don't help too much either.

![Paint dot net in Proton](/assets/images/PaintDotNetNullError.png)
![Paint dot net in Proton](/assets/images/PaintDotNetFailed.png)

~

~ 'STEAM_COMPAT_CLIENT_INSTALL_PATH' ~ "~/.local/share/Steam/", at least on Debian systems.

The bash variable 'STEAM_COMPAT_DATA_PATH' will have to be set to the location where 'Wine' exists on your system, should you already have it, by default this has the directory "~/.wine".

An good way of finding the location of your Proton install is; in your Steam library, find the version of Proton that you are wanting to use, right click on it.

![Right Clicked](/assets/images/ProtonRightClick.png)

Select 'Properties...', this should open the properties window, select 'Installed Files', and in that section click the 'Browse...' button. This will have opened the directory containing the 'proton' file whose location we need.

The 'proton' python file is run with the parameter 'run' and then the program you are wanting to run.

The variable can be set, and the python program can be run all in the same line. The final command, in its entirity should look something like the following:

```bash
STEAM_COMPAT_CLIENT_INSTALL_PATH=~/.local/share/Steam/ STEAM_COMPAT_DATA_PATH=~/.wine /mnt/drive-id/SteamLibrary/steamapps/common/Proton\ -\ Experimental/proton run example.exe
```