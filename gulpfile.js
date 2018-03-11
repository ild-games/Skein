var gulp = require('gulp');

moveTask('electron-html', 'src/electron/**/*.html', 'dist/electron');

gulp.task('spool', [
    'electron-html',
]);

gulp.task('default', [
    'spool'
]);

function moveTask(taskName, fileGlob, dest) {
    gulp.task(taskName, function () {
        return gulp.src(fileGlob).pipe(gulp.dest(dest));
    });
}

