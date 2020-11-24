let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');
   

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))    //expanded делает классический css, compressed делает сжатый
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
    
gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/owl.carousel/dist/owl.carousel.js',               
        'node_modules/inputmask/dist/jquery.inputmask.js',
        'app/js/jquery.validate.min.js'        
    ])
        .pipe(concat('libs.min.js'))   //объединение в один файл
        .pipe(uglify())                //сжатие
        .pipe(gulp.dest('app/js'))     //выкидываем то что получилось
        .pipe(browserSync.reload({stream: true}))    //делаем чтобы он сам обновлялся
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"               
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('default',  gulp.parallel('scss', 'js', 'browser-sync', 'watch'));  