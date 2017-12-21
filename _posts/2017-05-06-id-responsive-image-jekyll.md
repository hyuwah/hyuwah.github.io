---
layout: post
title: "Responsive image di Jekyll Post"
date: 2017-05-06
categories: [Web Development]
language: id
excerpt_separator: <!--more-->
frontimage: https://www.letsnurture.com/wp-content/uploads/2013/07/responsive-website-design.png
---

Cat can snug into its container like fluid, image in jekyll can too!  
<!--more-->

Normalnya, pasang gambar di jekyll dilakukan dengan cara ini :

{% highlight markdown linenos %}
![Contoh default](http://www.lilbub.com/uploads/images/about5.jpg)
{% endhighlight %}

Ada beberapa masalah dari cara itu, 
1. Gambarnya tidak `center-aligned`.
2. Ukuran gambar yang tampil selalu maksimum.
3. Karena no. 2, ketika browser di _resize_ gambarya berpotensi terpotong karena ukurannya tak menyesuaikan dengan _container_.
4. Karena digenerate oleh Jekyll, agak sulit untuk menambahkan class buat styling.

**Solusinya**   

**Step 1, buat file baru dengan nama `image.html` di folder `_includes`, isi dengan ini:**

{% highlight html linenos %}
{%raw%}
<div class="image-wrapper">
    <img src="{{ include.url }}" alt="{{ include.description }}" />
</div>
{%endraw%}
{% endhighlight %}

**Step 2, tambah styling biar _responsive_ di file css kamu**

{% highlight css linenos %}
.image-wrapper{
  max-width:90%;
  height:auto;
  position: relative;
  display:block;
  margin:0 auto;
}

.image-wrapper img{
  max-width:100% !important;
  height:auto;
  display:block;
  margin: auto;
}
{% endhighlight %}

**Step 3, kapanpun kamu mau memasukkan gambar di markdown, gunakan tag _include_**

Dari yang biasanya begini,

{% highlight html linenos %}
![Deskripsi](http://url/to/image "alt")
{% endhighlight %}

Jadi begini,

{% highlight liquid linenos %}
{%raw%}
 {% include image.html url="http://url/to/image" description="Deskripsi" %} 
{%endraw%}
{% endhighlight %}

Contoh jadi nya:

{% include image.html url="http://www.lilbub.com/uploads/images/about5.jpg" desc="Contoh responsive" id="1" %}   
   
   
   **Perbandingannya :**
{% include image.html url="http://res.cloudinary.com/hyuwah-github-io/image/upload/v1494327650/hyuwah.github.io/blog/ResponsiveImageJekyll-Before-After.png" desc="Perbandingan before - after" id="2" %}

Referensi: [EricToulson](http://erictoulson.com/2014/01/21/responsive-images-with-jekyll/), [LilBub](http://www.lilbub.com/)