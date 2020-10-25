#!/bin/bash

BGREEN='\033[1;32m'
BRED='\033[1;31m'
NC='\033[0m'

declare -a css_files=( 'default' 'styles' 'shop' )

buildjs() {
	echo 'Build JS: Started'
	rm -rf assets/js
	mkdir -p assets/js
	cp src/frontend/js/scripts.js assets/js/scripts.js
	./node_modules/.bin/uglifyjs assets/js/scripts.js -c -m -o assets/js/scripts.min.js --source-map
	echo 'Build JS: Complete'
}

generatecss() {
	# $1 = src path
	# $2 = dest path
	# $3 = dest min path

	# Compile SCSS to CSS
	./node_modules/.bin/node-sass --output-style expanded --indent-type tab --indent-width 1 --source-map true $1 $2
	# Autoprefix
	./node_modules/.bin/postcss --use autoprefixer --map false --cascade false --output $2 $2
	# Remove spaced alignment from autoprefixer.
	sed -i '' 's/\  \ *//g' $2
	# Uglify
	cleancss -o $3 $2
}

buildcss() {
	echo 'Build CSS: Started'
	rm -rf assets/css
	mkdir -p assets/css

	for i in "${css_files[@]}"; do
		generatecss src/frontend/css/$i.scss assets/css/$i.css assets/css/$i.min.css
	done
	echo 'Build CSS: Complete'

	echo 'Copying vendor css files'
	cp ./src/frontend/css/bootstrap.css ./assets/css/bootstrap.css
	cp ./src/frontend/css/bootstrap.min.css ./assets/css/bootstrap.min.css
	cp ./src/frontend/js/bootstrap.js ./assets/js/bootstrap.js
	cp ./src/frontend/js/bootstrap.min.js ./assets/js/bootstrap.min.js
	echo 'Copy complete'
}

buildfonts() {
	DIR="$(cd "$(dirname "$0")" && pwd)"
	python3 $DIR/build-google-fonts
}

buildbackend() {
	if [ "$1" == "only_main" ]; then
		ONLY_MAIN=1 ./node_modules/.bin/rollup -c
	elif [ "$1" == "only_cw" ]; then
		ONLY_CW=1 ./node_modules/.bin/rollup -c
	else
		./node_modules/.bin/rollup -c
	fi
}

removePOBackups() {
	echo "Removing po backups"
	rm -rf library/languages/*.po~
	rm -rf library/languages/*.pot~
}

copyColorwings() {
	cp -R ./library/addons/colorwings/* ../../plugins/colorwings/
	# Todo: Replace text domain.
	sed -i '' 's/greenlet/colorwings/g' ../../plugins/colorwings/class-colorwings-admin.php
}

if [ -z "$1" ]; then
	buildjs
	buildcss
	buildbackend
	buildfonts
elif [ "$1" == "--watch" ]; then
	fswatch -0 ./src | xargs -0 -n 1 -I {} ./src/build.sh
elif [ "$1" == "--final" ]; then
	printf "${BGREEN}STEP 1: RUNNING TESTS${NC}\n"
	current=$(pwd)
	cd tests/e2e && ./run-tests.sh
	[ $? == 0 ] || exit 1
	cd $current
	printf "${BGREEN}STEP 2: BUILDING${NC}\n"
	buildjs
	buildcss
	buildbackend
	buildfonts
	removePOBackups
	printf "${BGREEN}STEP 3: BUNDLING${NC}\n"
	rsync -avP --exclude '.*' --exclude '*node_modules*' --exclude '*package*' --exclude '*tests*' --exclude '*src/build*' --exclude '*src/update-version' \
	--exclude 'library/pro*' --exclude 'pro*' --exclude 'todo*' --exclude '*.map' --exclude '*src/backend/colorwings*' --exclude 'rollup.config.js' ./* --delete ~/Desktop/greenlet
	current=$(pwd)
	cd ~/Desktop
	zip -r greenlet.zip greenlet
	cd $current
	rm -rf ../greenlet-final
	cp -R ~/Desktop/greenlet ../greenlet-final
	sed -i '' 's/Theme Name: Greenlet/Theme Name: Greenlet Final/g' ../greenlet-final/style.css
	printf "${BGREEN}BUILD COMPLETE${NC}\n"
elif [ "$1" == "fonts" ]; then
	buildfonts
elif [ "$1" == "css" ]; then
	buildcss
elif [ "$1" == "js" ]; then
	buildjs
elif [ "$1" == "backend" ]; then
	buildbackend only_main
	if [ "$2" == "--watch" ]; then
		fswatch -0 ./src | xargs -0 -n 1 -I {} ./src/build.sh backend
	fi
elif [ "$1" == "colorwings" ]; then
	buildbackend only_cw
	copyColorwings
elif [ "$1" == "i18n" ]; then
	current=$(pwd)
	cd library/languages
	wp i18n make-json kn.po --no-purge
	for x in kn-*; do
		mv "$x" "greenlet-$x"
	done
	cd $current
fi
