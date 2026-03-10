---
title: "iMusic"
subtitle: "This is a simple Android music player app that uses the iTunes API to search songs and play a preview of it."
description: "A simple online music app that can search and play a 30s preview of song tracks with data from the iTunes service."
tech: ["Android", "Kotlin", "Jetpack Compose", "Material 3", "Fastlane"]
link: "https://play.google.com/store/apps/details?id=dev.hyuwah.imusic"
github: "https://github.com/hyuwah/imusic"
order: 1
featured: true
type: "Android"
image: "https://res.cloudinary.com/hyuwah-github-io/video/upload/v1695767662/iMusic/imusic-demo.gif"
starsBadge: "https://img.shields.io/github/stars/hyuwah/imusic?style=social"
forksBadge: "https://img.shields.io/github/forks/hyuwah/imusic?style=social"
---

A simple online music app that can search and play a 30s preview of song tracks with data from the iTunes service.

**Features:**
- Search functionality, to search song by artist / song / album name
- The songs result can be played / previewed (30s)
- Support dynamic theme on Android 12+ & Light / Dark Mode

**Tech Stack:**
- JDK 17
- Kotlin 1.9
- Min SDK 24
- Compiles & Target SDK 33
- Jetpack Compose (BOM 2023.06.01)
- Dagger Hilt for dependency injection framework with ksp
- Gradle Version Catalog for dependencies management
- Retrofit, Moshi & OkHttp for networking
- Jetpack Media3 for media/audio player
- Jetpack Lifecycle
- Mockk for mocking / stubbing purpose on unit test
- Sandwich to wrap / model retrofit response for better mapping / exception handling
- Material3 for overal ui
- Landscapist coil for fetching network image
