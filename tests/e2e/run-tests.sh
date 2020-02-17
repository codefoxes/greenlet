#!/bin/bash

export $(egrep -v '^#' .env | xargs)

if [ -z "$1" ]; then
	echo "Running all tests"
elif [ "$1" == "lighthouse" ]; then
	if [ "$2" == "view" ]; then
		lighthouse --config-path=./lighthouse/config.js ${LOCAL} --output-path ./lighthouse/reports/report.html --view --chrome-flags="--headless"
	else
		lighthouse --config-path=./lighthouse/config.js ${LOCAL} --output-path ./lighthouse/reports/report.html --chrome-flags="--headless"
	fi
fi
