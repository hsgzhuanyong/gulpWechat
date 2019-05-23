//gulpfile.js

const gulp = require('gulp');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
gulp.task('less', function () {
    gulp.src('src/app.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(autoprefixer({
          browsers: ['ie > 8', 'last 2 versions'],
          cascade: false
        }))
        .pipe(rename(function(path){
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('dist'))
});
gulp.task('pages', function() {
    return gulp.src([
        'src/app.js',
        'src/app.json',
        'src/pages/**',
        'src/images/**',
        'src/utils/**',
        'src/components/**',
        ], {base: 'src'}).pipe(gulp.dest('dist'))
})
gulp.task('auto', function () {
    gulp.watch(['src/app.wxss', 'src/less/**.less'], ['less']);
    gulp.watch(['src/images/*', 'src/pages/**/**/*', 'src/utils/**', 'src/*','src/components/**/*'], ['pages']);
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['less', 'pages', 'auto'])