/**
 * Module contains application gulp tasks
 * @module _/gulpfile.js
 */
const gulp = require('gulp');
const zip = require('gulp-zip');
const args = require('minimist')(process.argv.slice(2));

const fs = require('fs');

/**
 * Handling gulp errors, breaks task execution and trows an error.
 * @param {Object} err - error object.
 */
function handleError(err) {
    process.exit(-1);
    throw new Error(err.toString());
}

/**
 * Creates directories if they does not exist.
 * @function
 *
 * @return {Promise} gulp task
 */
gulp.task('createFilePaths', async function createFilePaths() {
    const folders = [
        'dist',
        'dist/assets',
        'dist/assets/fonts',
        'dist/assets/svg',
        'dist/assets/img',
        'dist/assets/icons',
        'dist/assets/public'
    ];

    folders.forEach((dir) => {
        if (! fs.existsSync(dir)) {
            fs.mkdirSync(dir);

            // eslint-disable-next-line no-console
            console.log('📁✓ Folder created:', dir);
        }
    });
});

/**
 * Creates build folder archive in dist folder
 * @function
 * @return {Function} gulp task
 */
gulp.task('createZip', async function createZip() {
    const flag = args.zip;

    await new Promise((resolve) => {
        if (flag && flag !== 'false') {

            // eslint-disable-next-line no-negated-condition
            const fileName = `${flag !== 'true'
                ? flag
                : 'archive'}.zip`;

            gulp.src('./dist/*')
                .pipe(zip(fileName))
                .pipe(gulp.dest('./dist'))
                .on('end', function onSuccess() {
                    // eslint-disable-next-line no-console
                    console.log(`✓ Created archive [./dist/${fileName}].`);
                    resolve();
                })
                .on('error', handleError);
        }
        resolve();
    });
});

/**
 * Copying all files that should be placed in application root folder.
 * @function
 * @return {Promise} gulp task
 */
gulp.task('copyRootFiles', async function copyRootFiles() {
    await new Promise((resolve) => {
        gulp.src('./assets/public/*.*')
            .pipe(gulp.dest('./dist/'))
            .on('end', function onSuccess() {
                // eslint-disable-next-line no-console
                console.log('✓ Copied files from [./dist/assets/public].');
                resolve();
            })
            .on('error', handleError);
    });
});


/**
 * Combines gulp tasks in `postbuild` task.
 */
gulp.task(
    'postbuild',
    gulp.parallel(
        'createFilePaths',
        'copyRootFiles',
        'createZip'
    )
);
