---
layout: post
title:  "Running macOS Sierra on Linux / Windows"
date:   2018-02-02
categories: [Windows, Linux]
language: id
excerpt_separator: <!--more-->
frontimage: https://i0.wp.com/techsviewer.com/wp-content/uploads/2017/06/macOS-High-Sierra-Final-on-WMware-on-Windows-PC.jpg?resize=810%2C455&ssl=1

---
Mau sekedar coba / pake software yang mac only **tapi ga punya mac?** _Gampang_.. tinggal pinjem temen yang punya mac.. atau
<!--more-->

Run macOS inside VM.

### Bahan - bahan

* VMDK Image dari macOS 10.13 : [Google Drive](https://goo.gl/dPJhqw)

> Di google drive, kalo **download has reached limit** / **quota exceeded for this file**
> * buka linknya
> * sign in
> * open in drive
> * make a copy
> * download dari copyannya

* VMWare Tools / Patch: [MEGA](https://goo.gl/aSaMxC)

* VMWare Player: [VMWare](https://my.vmware.com/en/web/vmware/free#desktop_end_user_computing/vmware_workstation_player/14_0)


### Step - step

* Extract File .rar VMDK macOS nya

* Install VMWare Player
    * Buka terminal di lokasi file `.bundle` nya
    * Di linux, ganti dulu file permissionnya jadi executable `chmod a+x VMware-Player-xxxxx.bundle`
    * Baru execute as root `sudo ./VMware-Player-xxxxx.bundle`

* Extract VMWare Tools / Patch
    * Patch VMWare 
        * Run as administrator `win-install.bat` untuk windows   
        * Buka terminal di folder yang ada `lnx-install.sh`
            * Bikin jadi executable `chmod a+x lnx-install.sh`
            * Execute as root `sudo ./lnx-install.sh`

{% include image.html url="https://i1.wp.com/techsviewer.com/wp-content/uploads/2016/06/7-Run-as-adminl.png?w=748&ssl=1" desc="patch di windows" id= "1" %}

> By default di VMWare ga ada pilihan macOS buat guest OS (karena violating aturannya Apple) jadi ga bakal bisa boot image macOS, tapi pake tools itu jadi munculin pilihnnya lagi

* Buat New Virtual Machine
    * Pilih **I will install the operating system later.**
    * Pilih **Apple Mac OS X** sebagai Guest OS
    * Pilih versi 10.12 / 10.13
    * Kasih nama, next - next sampai beres

* Edit VM yang barusan dibuat
    * Assign Memory 50 - 65% total RAM di PC/Laptop
    * Assign Processor 50 - 70%
    * Select **Hard Disk**, lalu **remove**
    * Add **Hard Disk**, pilih **SATA**, pilh Use **an existing disk**, Browse file .vmdk macOS yang tadi udah di extract

{% include image.html url="https://i0.wp.com/techsviewer.com/wp-content/uploads/2017/06/Select-an-Existing-virtual-disk.jpg?resize=810%2C373&ssl=1" desc="ganti harddisk dengan vmdk yang udah diextract" id="2" %}

* Edit **VMX file** dari VM yang barusan dibuat
    * Di windows defaultnya `Documents\Virtual Machines\{nama VM}\{file .vmx}`
    * Di linux defaultnya `~/vmware/{nama VM}/{file .vmx}`
    * buka pake text editor favorit
    * tambah `smc.version = "0"` di akhir file
    * save

{% include image.html url="https://i2.wp.com/techsviewer.com/wp-content/uploads/2017/06/Edit-VMX-File.jpg?resize=810%2C415&ssl=1" desc="tambah smc.version = 0" id="3"%}

* Jalanin VM
    * Instalasi dan Bikin akun **Apple ID**
    * Install VM Tools
        * Ke `Player` – `Removable Devices` – `CD/DVD` – `Setting…`- Open file **VM Tool.iso** (dari hasil extract VM Tools / Patch tadi). Centang **Connected** di Device status. Terus **OK**.
        * Reboot / restart
        * Ke `System Preferences` – `Security & Privacy`, **Allow** VMWare Extension, Restart lagi
        * Done!

{% include image.html url="https://i1.wp.com/techsviewer.com/wp-content/uploads/2017/06/Allow-VMware-Extension.jpg?w=730&ssl=1" desc="allow vmware extension" id="4"%}

#### Terkait Apple ID

Besar kemungkinan pas instalasi terus mau bikin Apple ID, ga dibolehin karena somewhat sudah melebihi batas dst dst.. untuk pembuatan akun di "machine" tersebut

Solusinya registrasi akun via webnya [Apple](https://appleid.apple.com/account#!&page=create), setelah jadi, sign in pake akun yang barusan dibikin di VMnya..

#### Extra step khusus Linux

`sudo vmware-modconfig --console --install-all`

**Kalo pake vmware player 12, dengan kernel 4.x keatas, ada kemungkinan ga bakal jalan..**

Ada yang bilang install dulu gcc buat kernel yang lagi dipake via   
`sudo apt install gcc build-essential -y`

Ada yang bilang skip check via workaround ini   
`sudo sed 's/gcc version 6/gcc version 7/' /proc/version > /tmp/version`   
`sudo mount --bind /tmp/version /proc/version`   
`sudo vmware-modconfig --console --install-all`   
`sudo umount /proc/version && rm /tmp/version`   

### Sources

[Techsviewer](https://techsviewer.com/install-macos-high-sierra-vmware-windows/)
