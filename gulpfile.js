const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const concat = require('gulp-concat');

gulp.task('styles', () => {
    return gulp.src([
        'sass/**/*.scss',
        'src/components/**/*.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./css/'));
});

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('watch', () => {
    gulp.watch([
        'sass/**/*.scss',
        'src/components/**/*.scss'
    ], (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});