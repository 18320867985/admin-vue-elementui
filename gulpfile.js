
/*
安装：npm install -g cnpm --registry=https://registry.npm.taobao.org  安装淘宝镜像）用淘宝镜像快！

修改：npm config set registry http://registry.npm.taobao.org
*/

//1. 全局安装 gulp： $ npm install --global gulp
//2. 作为项目的开发依赖（devDependencies）安装：$ npm install --save-dev gulp
//3. 在项目根目录下创建一个名为 gulpfile.js 的文件：var gulp = require('gulp');
//4. gulp.task('default', function() {
// 将你的默认的任务代码放在这
//});
// 升级了node版本/ node版本太高会造成node-sass不兼容的问题，那么就再 install node-sass一下就行了。
// install  --save-dev  babel-preset-latest 最新的转码guize

var gulp = require('gulp');
var del = require("del");
var watch = require("gulp-watch");
var minCss = require('gulp-clean-css'); //gulp-minify-css:压缩css文件 npm install gulp-clean-css 
var img = require('gulp-imagemin'); //gulp-imagemin:压缩png、jpj、git、svg格式图片 npm install --save-dev gulp-imagemin
var postcss = require("gulp-postcss"); // 手机端自动补全css3前缀  cnpm install --save-dev gulp-postcss
var autoprefixer = require('autoprefixer'); // npm install --save-dev autoprefixer

/*
 *	cnpm install node-sass --save-dev
 * cnpm install gulp-sass --save-dev 
 * 使用：sass().on('error', sass.logError)
 */
var sass = require('gulp-sass');

// 清空目录gulp-del
gulp.task('del', function(cd) {

	del(["./dist"], cd); //gulp-del
});


// 文件路径
var paths = {

    // sass文件
    scssPath: ['./src/css-dev/scss/**/*.scss'],

};


gulp.task('release', ["scss-dev"], function() {

	//**是所以文件夹
	//*.*是所以文件
	//gulp.src是查找文件
	//pipe是进入流管道
	//gulp.dest() 是复制文件

	gulp.src('./public/css/**/*.css').pipe(minCss()).pipe(gulp.dest('./dist/css')); //复制css
	gulp.src('./public/fonts/**/*.*').pipe(gulp.dest('./dist/fonts')); //复制
	gulp.src('./public/css/fonts/**/*.*').pipe(gulp.dest('./dist/css/fonts')); //复制fonts
	gulp.src('./public/imgs/**/*.*')
		.pipe(img())                     // 压缩图片
		.pipe(gulp.dest('./dist/imgs/')); //复制img
	gulp.src('web.config').pipe(gulp.dest('./dist/')); //复制web.config
	//gulp.src(['./public/**/*.html']).pipe(gulp.dest('./dist')); //复制html
		
});


//scss合并css文件
gulp.task("scss-dev",async function() {

  return await gulp.src(paths.scssPath)
		.pipe(sass().on('error', sass.logError))     // sass编译
		.pipe(postcss([autoprefixer]))          // 自动添加css3缀-webkit-  适合用于手机端 
		.pipe(gulp.dest('./public/css/'));
		
});


/*
 * watch监听
 * gulp.watch参数说明
 * 1. gulp.watch(path,task);
 * 2.gulp.watch(path,function(){});
 */

gulp.task("watch", ["scss-dev"], function() {

	//sass合并压缩css文件
	//gulp.watch(paths.scssPath, ['scss']);
	watch(paths.scssPath, function() {
		gulp.start("scss-dev");
		
	});

});
