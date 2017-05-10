---
layout: post
title:  "Deobfuscate obfuscated javascript"
date:   2017-05-10 02:39:00
categories: [Web Development]
language: id
---

Mau liat js dari web buat analisa, eh isinya beginian :
{% include image.html url='http://res.cloudinary.com/hyuwah-github-io/image/upload/v1494395181/hyuwah.github.io/blog/BSVmJ0D.png' desc='Obfuscated javascript'%}

Pertama di deobfuscate pake [malzilla](http://malzilla.sourceforge.net/)

{% include image.html url='http://res.cloudinary.com/hyuwah-github-io/image/upload/v1494391301/hyuwah.github.io/blog/dojs1.png' desc='step 1 - malzilla' %}

Kedua di beautify pake [jsnice](http://jsnice.org/) (atau tools js beautifier favorit kamu)

{% include image.html url='http://res.cloudinary.com/hyuwah-github-io/image/upload/v1494391476/hyuwah.github.io/blog/at4ZZdu.png' desc='step 2 - js beautifier' %}

Hasilnya :

{% highlight javascript linenos %}
/** @type {number} */
var pageNo = 0;
/** @type {number} */
var rowsPerPage = 15;
/** @type {number} */
var recOffset = 0;
/** @type {number} */
var pageMax = 0;
/** @type {string} */
var limit = recOffset + "," + rowsPerPage;
/** @type {string} */
var proxy = "../../app.php/";
/** @type {boolean} */
var useClock = true;
/** @type {Array} */
var work_flow = [{
  text : "Hadir",
  ws : "receive_clock"
}, {
  text : "Fit to Work",
  ws : "postFitToWork"
}, {
  text : "Status Match",
  ws : "postAmtStatMatched"
}, {
  text : "Key Pickup",
  ws : "postKeyPickup"
}, {
  text : "Kiosk Ready",
  ws : "postKioskReady"
}, {
  text : "Gate in",
  ws : "postGateIn"
}, {
  text : "Loading Start",
  ws : "postLoadingStart"
}, {
  text : "Loading Finished",
  ws : "postLoadingFinished"
}, {
  text : "Gate Out",
  ws : "postGateOut"
}, {
  text : "Arrive to Dest",
  ws : "postArrivalToDest"
}, {
  text : "Back to Depo",
  ws : "postBackToDepo"
}, {
  text : "Close Shipment",
  ws : "postCloseShipment"
}];
/** @type {Array} */
var headers = ["ID", "Name", "Position", "Cap", "Kehadiran", "Fit to Work", "Rit No", "Match", "Position Match", "Car License No", "Partner", "Key Pickup", "Kiosk Ready", "Gate In", "Loading Start", "Loading Finished", "Gate Out", "Arrival to Dest", "Back to Depo", "Shipment Status"];
...
{% endhighlight %}