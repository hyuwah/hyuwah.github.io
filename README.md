# hyuwah.github.io

[![CircleCI](https://circleci.com/gh/hyuwah/hyuwah.github.io.svg?style=svg)](https://circleci.com/gh/hyuwah/hyuwah.github.io)

This is the source code for [hyuwah.github.io](http://hyuwah.github.io)

## Tech Used

[Jekyll](http://http://jekyllrb.com/)

[Materializecss](http://materializecss.com/)

## Dependencies

TODO: explain dependencies

* Node.js & npm
* Ruby, Rubygem & Bundler
* Jekyll
  * jekyll-paginate
  * jekyll-feed
* Gulp:
  * gulp-sass
  * gulp-autoprefixer
  * gulp-jade
  * browsersync
  * child_process

## Usage

* TODO: explain structure
* TODO: explain projects/portfolio Usage
* TODO: explain timelines Usage
* TODO: explain gulp workflow (local development)
* TODO: explain jade and scss Usage

## Workaround Temporary

NPM Install: gulp, gulp-cli, gulp-jade, gulp-autoprefixer, browsersync, gulp-sass, child_process  
Ruby and Rubygems : update SSL  
Gem install : jekyll, jekyll-feed, jekyll-paginate  

On local development :
modify gulp default task on `gulpfile.js` to 
```javascript
// for local development
gulp.task('default', ['browser-sync', 'watch']); 
// for production only (Only build, Prevent CircleCI endless loop watching files)
// gulp.task('default', ['sass','jade','jekyll-build']); 
```
When pushing to remote :
modify default task on `gulpfile.js` to
```javascript
// for local development
//gulp.task('default', ['browser-sync', 'watch']); 
// for production only (Only build, Prevent CircleCI endless loop watching files)
gulp.task('default', ['sass','jade','jekyll-build']); 
```

## Credits

This site is based on Jekyll-Materialize theme by riefachan and some adaptation from [Samet Erpik](http://erpik.com) website.

Main image used on this site provided by [Sai Kiran Anagani](https://stocksnap.io/author/21245).

Image Hover effect used on portfolio listing by [Mike Young](http://miketricking.github.io/dist/).

Integrated Jekyll with GulpJS, SASS, AutoPrefixer, Browser-Sync using gulp config by [shakyShane](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync).

## License

MIT
