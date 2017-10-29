---
layout: post
title:  "Getting started with Raspberry Pi 3"
date:   2017-06-12
categories: [IoT, Raspberry Pi]
language: id
excerpt_separator: <!--more-->
frontimage: https://http2.mlstatic.com/raspberry-pi3-pi-3-model-b-quadcore-12ghz-pronta-entrega-D_NQ_NP_100215-MLB25150209828_112016-F.jpg
---

Instalasi sistem operasi Raspbian Jessie headless.
<!--more-->


### Bahan - bahan
* Raspberry Pi 3
* Micro SD (min 16GB, Class 10)
* Raspbian Jessie IMG : [Download](https://www.raspberrypi.org/downloads/raspbian/) (pilih w/ Pixel)
* Win32DiskImager : [Download](https://sourceforge.net/projects/win32diskimager/)
* Kabel LAN
* Terminal SSH : [Download MobaXterm](http://mobaxterm.mobatek.net/download-home-edition.html) / [Download Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* RealVNC (VNC Viewer) : [Download](https://www.realvnc.com/download/viewer/) (Yang viewer aja, jangan yang connect)

### Step - step

Masukkan SD ke laptop, buka Win32DiskImager, pilih img raspbian jessie-nya, pastikan drivenya drive micro sd, klik write, tunggu sampai beres..

**Enable SSH**

Buka folder boot di sdcard, bikin file baru (txt) dengan nama ssh, hapus ekstensi .txt-nya

**Konfigurasi ip static**

buka cmdline.txt, tambah ip:192.168.x.x sesuai range ip router.

Dalam kasus saya, di set 192.168.0.200 (gateway router 192.168.0.1)

eject sdcard, masukkan ke Raspi, colok kabel LAN raspi ke laptop, colok power

Via terminal ssh, konek ke ip raspi yang sudah di set tadi, login dengan user *pi*, password default *raspberry*

**set hostname di windows**

install bonjour akses dengan raspberrypi.local

kalo masih gabisa, ke windows/system32/etc/host, tambah hostname yang di route ke ip diatas

kalo sudah masuk, enable ssh, vnc, wifi, via sudo raspi-config

reboot

**Remote desktop**

Buka realvnc / vncviewer, masukkan ip raspi, login, done~
