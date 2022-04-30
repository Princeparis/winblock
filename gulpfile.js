var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();


var paths = {
    styles: {
        src: 'src/css/style.scss',
        dest: 'dist'
    },
    js: {
        src: 'src/javascript/app.js',
        dest: 'dist/javascript'
    },
    img: {
        src: 'src/imgs/*',
        dest: 'dist/imgs'
    },
    fonts: {
        src: "src/fonts/*",
        dest: "dist/fonts"
    }
};

gulp.task("sass", function() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
});



gulp.task("image", function() {
    return gulp.src(paths.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.img.dest))
});

gulp.task("fonts", function() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
});

gulp.task("html", function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task("javascript", function() {
    return gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
})

gulp.task("watch", function() {

    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
    gulp.watch(paths.styles.src, gulp.series("sass"));
    gulp.watch(paths.img.src, gulp.series("image"));
    gulp.watch('src/*.html', gulp.series("html")).on("change", browserSync.reload);
    gulp.watch(paths.fonts.src, gulp.series("fonts"));
    gulp.watch(paths.js.src, gulp.series("javascript")).on("change", browserSync.reload);
});



gulp.task('default', gulp.series("sass",  "image", "fonts", "html", "javascript", "watch"));