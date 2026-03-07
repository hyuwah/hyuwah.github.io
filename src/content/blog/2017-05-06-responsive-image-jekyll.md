---
title: "Responsive image di Jekyll Post"
description: "Cat can snug into its container like fluid, image in jekyll can too!"
pubDate: 2017-05-06
tags: ["Web Development", "Jekyll"]
---

Cat can snug into its container like fluid, image in jekyll can too!  

Normalnya, pasang gambar di jekyll dilakukan dengan cara ini :

```markdown
![Contoh default](http://www.lilbub.com/uploads/images/about5.jpg)
```

Ada beberapa masalah dari cara itu, 
1. Gambarnya tidak `center-aligned`.
2. Ukuran gambar yang tampil selalu maksimum.
3. Karena no. 2, ketika browser di _resize_ gambarya berpotensi terpotong karena ukurannya tak menyesuaikan dengan _container_.
4. Karena digenerate oleh Jekyll, agak sulit untuk menambahkan class buat styling.

**Solusinya**   

**Step 1, buat file baru dengan nama `image.html` di folder `_includes`, isi dengan ini:**

```html
<div class="image-wrapper">
    <img src="{{ include.url }}" alt="{{ include.description }}" />
</div>
```

**Step 2, tambah styling biar _responsive_ di file css kamu**

```css
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
```

**Step 3, kapanpun kamu mau memasukkan gambar di markdown, gunakan tag _include_**

Dari yang biasanya begini,

```html
![Deskripsi](http://url/to/image "alt")
```

Jadi begini,

```liquid
{% include image.html url="http://url/to/image" description="Deskripsi" %} 
```

Referensi: [EricToulson](http://erictoulson.com/2014/01/21/responsive-images-with-jekyll/), [LilBub](http://www.lilbub.com/)
