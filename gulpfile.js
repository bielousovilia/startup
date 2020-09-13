let gulp = require('gulp'),
    sass = require('gulp-sass'), // из sass в css
    cleanCss = require('gulp-clean-css'), // минификация css файлов
    UglifyJS = require("uglify-js"), // минификация js файлов
    concat = require('gulp-concat'), // объединение файлов
    del = require('del'), // удаление файлов
    autoprefixer = require('gulp-autoprefixer'), //автопрефикс
    imagemin = require('gulp-imagemin'), //минификация картинок
    browserSync = require('browser-sync').create(); 


function styles () {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions']
        }))
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
}

function scripts () {
    return gulp.src('./app/js/**/*.js')
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch('./app/scss/*.scss', styles);
    gulp.watch('./app/js/*.js', scripts);
    gulp.watch("./app/*.html").on('change',browserSync.reload);
}

// собираем проект 
async function build () {  // создание новой папки с проектом
    let buildHtml = gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));

    let buildCss = gulp.src('./app/css/**/*.css')
    .pipe(cleanCss({level: 2}))
    .pipe(gulp.dest('dist/css/'));
    
    let buildJs = gulp.src('./app/js/**/*.js')
    .pipe(concat('script.js'))
    // .pipe(UglifyJS.minify())
    .pipe(gulp.dest('./dist/js/'));

    let buildFonts = gulp.src('./app/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts'));

    let buildImg = gulp.src('./app/images/**/*.*')
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [
            {
                removeViewBox: true
            }
        ]
    }))
    .pipe(gulp.dest('./dist/images/'));
}

async function funcDel () { // удаление папки с проектом
    del.sync('./dist');
}
// cобрали проект
gulp.task('build', gulp.series(build, funcDel));

gulp.task('default', gulp.parallel(styles, scripts, watch));