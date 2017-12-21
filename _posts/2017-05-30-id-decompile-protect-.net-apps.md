---
layout: post
title:  "Decompile aplikasi .NET dan cara proteksinya"
date:   2017-05-30
categories: [C#, Windows]
language: id
excerpt_separator: <!--more-->
frontimage: https://chocolatey.org/content/packageimages/ilspy.2.4.0.1963.png
---

ILSpy, decompile .net exe/assemblies
http://ilspy.net/
<!--more-->

{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496130238/hyuwah.github.io/blog/XyH3vBR.png" desc="Contoh aplikasi yang didecompile dengan ILSpy" id="7" %}   



Obfuscate .net with confuserEx <= mantap
https://yck1509.github.io/ConfuserEx/

Folder

{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496130220/hyuwah.github.io/blog/zboPDw8.png" desc="Contoh aplikasi yang akan di obfuscate" id="4" %}   


{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496129499/hyuwah.github.io/blog/HVlEtjy.png" desc="Tampilan awal ConfuserEx" id="1" %}   

{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496129553/hyuwah.github.io/blog/qLMzkf9.png" desc="Tampilan setting ConfuserEx" id="2" %}   

{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496129603/hyuwah.github.io/blog/8FiiSQf.png" desc="Protect it!" id="3" %}   


{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496130229/hyuwah.github.io/blog/ytfBKVV.png" desc="Executable hasil ConfuserEX" id="5" %}   

Ketika di decompile via ILSpy

{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496130244/hyuwah.github.io/blog/GS2yjDD.png" desc="Confused!" id="6" %}   


Ketika di run

{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1496130916/hyuwah.github.io/blog/IYNBuYm.png" desc="Confused!" id="6" %}   

Hasil identik, tetapi penggunaan ram berbeda
