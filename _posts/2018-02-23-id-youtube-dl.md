---
layout: post
title:  "Download video / mp3 hassle-free with Youtube-dl"
date:   2018-02-23
categories: [Linux]
language: id
excerpt_separator: <!--more-->
frontimage: https://fthmb.tqn.com/8QBeIKnt94VsMyMYBWviQr8a8s4=/768x0/filters:no_upscale()/YouTube_logo_2015.svg-57ebbd433df78c690fc6ffa0.png

---
Ga usah lagi ribet cari online downloader atau cari idm bajakan buat download video atau mp3 dari youtube / beberapa situs lainnya
<!--more-->

> youtube-dl is a command-line program to download videos from YouTube.com and a few more sites. It requires the Python interpreter (2.6, 2.7, or 3.2+), and it is not platform specific.   
> --Deskripsi di [official site](http://rg3.github.io/youtube-dl/)

Sebenarnya bisa multiplatform, tapi tulisan ini buat linux.

### Bahan - bahan

* Python interpreter 2.7 / 3

### Step - step

#### Install youtube-dl
Pilih salah satu:   
Pake **curl**

{% highlight bash %}
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
{% endhighlight %}

Pake **wget**

{% highlight bash %}
sudo wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
{% endhighlight %}

Pake **pip** (biasanya kalo udah ada python, udah otomatis ada pip)

{% highlight bash %}
sudo pip install --upgrade youtube_dl
{% endhighlight %}


#### Set alias

Karena command + option yang mesti diketik lumayan panjang semisal mau download mp3, video 480p atau video 720p, lebih enak dijadiin alias

Buka file `.bashrc` atau `.zshrc` kalau pake zsh

Contoh template alias:

Buat download mp3 ke `~/Music/` dengan kualitas audio paling tinggi di _alias_ jadi **ytdlmp3**:

{% highlight bash %}
alias ytdlmp3='youtube-dl --output "~/Music/%(title)s.%(ext)s" --extract-audio --audio-format mp3 --audio-quality 0'
{% endhighlight %}

Buat download video (biasanya mp4) ke `~/Videos/` dengan kualitas 480p di **
_alias_** jadi **ytdlvid480**:

{% highlight bash %}
alias ytdlvid480='youtube-dl --output "~/Videos/%(title)s.%(ext)s" -f "bestvideo[height<=480]+bestaudio/best[height<=480]"'
{% endhighlight %}

Buat download video (biasanya mp4) ke `~/Videos/` dengan kualitas 720p di **_alias_** jadi **ytdlvid720**:

{% highlight bash %}
alias ytdlvid720='youtube-dl --output "~/Videos/%(title)s.%(ext)s" -f "bestvideo[height<=720]+bestaudio/best[height<=720]"'
{% endhighlight %}

Kalau mau explore option - option nya liat di [sini](https://github.com/rg3/youtube-dl#options)

### Usages

Di terminal tinggal panggil aliasnya sama link video (ato bisa juga playlist / channel) youtubenya

misal buat download mp3 [We Are - One Ok Rock](https://www.youtube.com/watch?v=nU307tV32B0) tinggal : 

{% highlight bash %}
ytdlmp3 https://www.youtube.com/watch?v=nU307tV32B0
{% endhighlight %}

kalo mau videonya tinggal : 

{% highlight bash %}
ytdlvid720 https://www.youtube.com/watch?v=nU307tV32B0
{% endhighlight %}


### Sources

[Youtube-dl github](https://github.com/rg3/youtube-dl)
