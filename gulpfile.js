var gulp = require('gulp');

moveTask('electron-html', 'src/electron/**/*.html', 'dist/electron');

gulp.task('skein', [
    'electron-html',
]);

gulp.task('default', [
    'skein'
]);

function moveTask(taskName, fileGlob, dest) {
    gulp.task(taskName, function () {
        return gulp.src(fileGlob).pipe(gulp.dest(dest));
    });
}

