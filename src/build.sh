#!/bin/bash

declare -a css_files=( 'default' 'styles' )

buildjs() {
	echo 'Build JS: Started'
	rm -rf assets/js
	mkdir -p assets/js
	cp src/frontend/js/scripts.js assets/js/scripts.js
	./node_modules/.bin/uglifyjs assets/js/scripts.js -c -m -o assets/js/scripts.min.js --source-map
	echo 'Build JS: Complete'
}

buildcss() {
	echo 'Build CSS: Started'
	rm -rf assets/css
	mkdir -p assets/css

	for i in "${css_files[@]}"; do
		# Compile SCSS to CSS
		./node_modules/.bin/node-sass --output-style expanded --source-map true src/frontend/css/$i.scss assets/css/$i.css

		# Autoprefix
		./node_modules/.bin/postcss --use autoprefixer --map false --output assets/css/$i.css assets/css/$i.css

		# Uglify
		cleancss -o assets/css/$i.min.css assets/css/$i.css
	done
	echo 'Build CSS: Complete'
}

if [ -z "$1" ]; then
	buildjs
	buildcss
else
	echo 'Building Separately?'
fi
