#!/bin/bash

BGREEN='\033[1;32m'
BRED='\033[1;31m'
BBLUE='\033[1;34m'
NC='\033[0m'

buildjs() {
	echo 'Build JS: Started'
	if [ "$1" == "only_main" ]; then
		ONLY_MAIN=1 ./node_modules/.bin/rollup -c
	elif [ "$1" == "only_cw" ]; then
		ONLY_CW=1 ./node_modules/.bin/rollup -c
	elif [ "$1" == "only_pro" ]; then
		ONLY_PRO=1 ./node_modules/.bin/rollup -c
	else
		./node_modules/.bin/rollup -c
	fi
	echo 'Build JS: Complete'
}

buildcss() {
	printf "${BBLUE}Build CSS: Started${NC}\n"
	CSS=1 ./node_modules/.bin/rollup -c
	printf "${BBLUE}Build CSS: Complete${NC}\n"

	echo 'Copying vendor css files'
	cp ./src/frontend/css/bootstrap.css ./assets/css/bootstrap.css
	cp ./src/frontend/css/bootstrap.min.css ./assets/css/bootstrap.min.css
	echo 'Copy complete'
}

buildfonts() {
	echo 'Build Fonts: Started'
	DIR="$(cd "$(dirname "$0")" && pwd)"
	python3 $DIR/build-google-fonts
	echo 'Build Fonts: Complete'
}

removePOBackups() {
	echo "Removing po backups"
	rm -rf library/languages/*.po~
	rm -rf library/languages/*.pot~
}

copyColorwings() {
	# cp -R ./library/addons/colorwings/* ../../plugins/colorwings/
	rsync -avP --exclude '.git' ./library/addons/colorwings/* ../../plugins/colorwings/
	# Todo: Replace text domain.
	sed -i '' 's/greenlet/colorwings/g' ../../plugins/colorwings/class-colorwings-admin.php
}

if [ -z "$1" ]; then
	buildcss
	buildjs
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
	buildcss
	buildjs
	buildfonts
	removePOBackups
	printf "${BGREEN}STEP 3: BUNDLING${NC}\n"

	if [ -z "$2" ]; then
		rm -rf ~/Desktop/greenlet.zip ~/Desktop/greenlet
		rsync -avP --exclude={'.*','*node_modules*','*package*','*tests*','*src/build*','*src/update*','pro*','todo*','backup*','*.map','*src/backend/colorwings*','rollup.config.js'} ./* --delete ~/Desktop/greenlet
		current=$(pwd)
		cd ~/Desktop
		awk '/pro\/class-pro\.php/{n=2}; n {n--; next}; 1' < ./greenlet/library/init.php > ./greenlet/library/init-awk.php
		mv ./greenlet/library/init-awk.php ./greenlet/library/init.php
		zip -r greenlet.zip greenlet
		cd $current
		rm -rf ../greenlet-final
		cp -R ~/Desktop/greenlet ../greenlet-final
		sed -i '' 's/Theme Name: Greenlet/Theme Name: Greenlet Final/g' ../greenlet-final/style.css
	elif [ "$2" == "pro" ]; then
		rm -rf ~/Desktop/greenlet-pro.zip ~/Desktop/greenlet-pro ~/Desktop/greenlet-pro-envato
		mkdir ~/Desktop/greenlet-pro-envato
		rsync -avP --exclude={'.*','*node_modules*','*package*','*tests*','/src*','/pro*','*pro/src*','todo*','*.map','rollup.config.js'} ./* --delete ~/Desktop/greenlet-pro
		current=$(pwd)
		cd ~/Desktop
		sed -i '' 's/Theme Name: Greenlet/Theme Name: Greenlet Pro/g' greenlet-pro/style.css
		mv greenlet-pro/library/pro/envato/* greenlet-pro-envato/ && rm -rf  greenlet-pro/library/pro/envato
		zip -r greenlet-pro.zip greenlet-pro
		mv greenlet-pro.zip greenlet-pro-envato
		cd greenlet-pro-envato
		zip -r preview.zip preview/* && rm -rf preview
		cd $current
		rm -rf ../greenlet-pro
		cp -R ~/Desktop/greenlet-pro ../greenlet-pro
	elif [ "$2" == "cw" ]; then
		rm -rf ~/Desktop/colorwings.zip ~/Desktop/colorwings
		rsync -avP --exclude={'.*','pro*','*.map'} ../../plugins/colorwings/* --delete ~/Desktop/colorwings
		current=$(pwd)
		cd ~/Desktop
		awk '!/pro\/class-pro\.php/' < ./colorwings/colorwings.php > ./colorwings/colorwings-awk.php
		mv ./colorwings/colorwings-awk.php ./colorwings/colorwings.php
		zip -r colorwings.zip colorwings
		cd $current
	elif [ "$2" == "cwPro" ]; then
		rm -rf ~/Desktop/colorwings-pro.zip ~/Desktop/colorwings-pro
		rsync -avP --exclude={'.*','*pro/src*','*.map'} ../../plugins/colorwings/* --delete ~/Desktop/colorwings-pro
		current=$(pwd)
		cd ~/Desktop
		sed -i '' 's/Plugin Name: Color Wings/Plugin Name: Color Wings Pro/g' colorwings-pro/colorwings.php
		zip -r colorwings-pro.zip colorwings-pro
		cd $current
	fi

	printf "${BGREEN}BUILD COMPLETE${NC}\n"
elif [ "$1" == "fonts" ]; then
	buildfonts
elif [ "$1" == "css" ]; then
	buildcss
elif [ "$1" == "js" ]; then
	buildjs
elif [ "$1" == "backend" ]; then
	buildjs only_main
	if [ "$2" == "--watch" ]; then
		fswatch -0 ./src | xargs -0 -n 1 -I {} ./src/build.sh backend
	fi
elif [ "$1" == "cw:cp" ]; then
	buildfonts
	copyColorwings
elif [ "$1" == "pro" ]; then
	buildjs only_pro
elif [ "$1" == "i18n" ]; then
	current=$(pwd)
	cd library/languages
	wp i18n make-json kn.po --no-purge
	for x in kn-*; do
		mv "$x" "greenlet-$x"
	done
	cd $current
fi
