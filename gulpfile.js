var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

const jsFiles = [
  "js/utils/MLoader.js",
  "js/utils/alias.js",
  "js/utils/helpers.js",
  "js/sprites/Bubble.js",
  "js/utils/BubbleSpawner.js",
  "js/ui/Button.js",
  "js/sections/GamePlay.js",
  "js/sections/PauseSection.js",
  "js/scenes/StartScene.js",
  "js/scenes/PlayScene.js",
  "js/main.js"
]

gulp.task('build', function() {
  return gulp.src(jsFiles)
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'))
});
