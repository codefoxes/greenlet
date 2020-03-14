#!/usr/bin/env node

const process = require( 'process' )

const config = require( './config.js' )
const report = require( './reports/report.json' )

const BOLD = '\x1b[1m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RESET = '\x1b[0m'

let cats = ['performance', 'accessibility', 'best-practices', 'seo']
if ( 'settings' in config && 'onlyCategories' in config.settings ) {
    cats = config.settings.onlyCategories
}

cats.forEach(( cat ) => {
    if ( report.categories[ cat ].score < 1 ) {
        console.log(`${BOLD}${RED}Error: ${cat} score is ${report.categories[ cat ].score * 100}${RESET}\n`)
        process.exitCode = 1
    } else {
        console.log( `${BOLD}${GREEN}${cat} score: ${YELLOW}${report.categories[ cat ].score * 100}${RESET}` )
    }
})
