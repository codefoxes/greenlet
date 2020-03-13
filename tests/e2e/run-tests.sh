#!/bin/bash

export $(egrep -v '^#' .env | xargs)

if [ -z "$1" ]; then
	echo "Running all tests"
	./node_modules/.bin/cypress run --env ENV=local
	[ $? == 0 ] || exit 1
	lighthouse --config-path=./lighthouse/config.js ${LOCAL} --output-path ./lighthouse/reports/report.json --output=json --chrome-flags="--headless"
	./lighthouse/validate-scores.js
	[ $? == 0 ] || exit 1
elif [ "$1" == "lighthouse" ]; then
	if [ "$2" == "view" ]; then
		lighthouse --config-path=./lighthouse/config.js ${LOCAL} --output-path ./lighthouse/reports/report.html --view --chrome-flags="--headless"
	elif [ "$2" == "json" ]; then
		lighthouse --config-path=./lighthouse/config.js ${LOCAL} --output-path ./lighthouse/reports/report.json --output=json --chrome-flags="--headless"
	else
		lighthouse --config-path=./lighthouse/config.js ${LOCAL} --output-path ./lighthouse/reports/report.html --chrome-flags="--headless"
	fi
fi
