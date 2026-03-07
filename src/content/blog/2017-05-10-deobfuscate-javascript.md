---
title: "Deobfuscate obfuscated javascript"
description: "Confused no more with malzilla and beautify!"
pubDate: 2017-05-10
tags: ["Web Development", "JavaScript", "Security"]
---

Confused no more with malzilla and beautify!

Mau liat js dari web buat analisa, tapi isinya beginian?
![Obfuscated javascript!](http://res.cloudinary.com/hyuwah-github-io/image/upload/v1494395181/hyuwah.github.io/blog/BSVmJ0D.png)

Pertama di deobfuscate pake [malzilla](http://malzilla.sourceforge.net/)
![step 1 - malzilla](http://res.cloudinary.com/hyuwah-github-io/image/upload/v1494391301/hyuwah.github.io/blog/dojs1.png)

Kedua di beautify pake [jsnice](http://jsnice.org/) (atau tools js beautifier favorit kamu)
![step 2 - js beautifier](http://res.cloudinary.com/hyuwah-github-io/image/upload/v1494391476/hyuwah.github.io/blog/at4ZZdu.png)

Hasilnya :

```javascript
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
```
