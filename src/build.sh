#!/bin/bash

declare -a css_files=( 'default' 'styles' 'shop' )

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
		./node_modules/.bin/node-sass --output-style expanded --indent-type tab --indent-width 1 --source-map true src/frontend/css/$i.scss assets/css/$i.css

		# Autoprefix
		./node_modules/.bin/postcss --use autoprefixer --map false --cascade false --output assets/css/$i.css assets/css/$i.css

		# Remove spaced alignment from autoprefixer.
		sed -i '' 's/\  \ *//g' assets/css/$i.css

		# Uglify
		cleancss -o assets/css/$i.min.css assets/css/$i.css
	done
	echo 'Build CSS: Complete'
}

buildfonts() {
	DIR="$(cd "$(dirname "$0")" && pwd)"
	python3 $DIR/build-google-fonts
}

buildbackend() {
	DIR="$(cd "$(dirname "$0")" && pwd)"
	python3 $DIR/build-controls
}

if [ -z "$1" ]; then
	buildjs
	buildcss
	buildbackend
	buildfonts
elif [ "$1" == "--watch" ]; then
	fswatch -0 ./src | xargs -0 -n 1 -I {} ./src/build.sh
elif [ "$1" == "--final" ]; then
	buildjs
	buildcss
	buildbackend
	buildfonts
	rsync -avP --exclude '*.git*' --exclude '*node_modules*' --exclude '*package*' --exclude '*tests*' --exclude '*.DS_Store*' --exclude '*src/build.sh' --exclude 'todo.txt' ./* --delete ~/Desktop/greenlet
	current=$(pwd)
	cd ~/Desktop
	zip -r greenlet.zip greenlet
	cd $current
elif [ "$1" == "fonts" ]; then
	buildfonts
elif [ "$1" == "css" ]; then
	buildcss
elif [ "$1" == "js" ]; then
	buildjs
elif [ "$1" == "backend" ]; then
	buildbackend
	if [ "$2" == "--watch" ]; then
		fswatch -0 ./src | xargs -0 -n 1 -I {} ./src/build.sh backend
	fi
fi
