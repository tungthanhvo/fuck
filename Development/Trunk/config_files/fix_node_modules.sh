#!/bin/bash
echo "This file support fix node_modules but current version is not fixed"

echo "- Mocha Version 2.5.3"

declare $( npm ls mocha | grep mocha@ | head -1 | awk -F@ '{print "MOCHA_VERSION="$2}' )

echo "MOCHA VERSION: $MOCHA_VERSION"
if [ "$MOCHA_VERSION" == "2.5.3" ]
then
    echo "---> Reporter doc line 58"
	cp /var/www/html/config_files/node_modules/mocha/lib/reporters/doc.js ./node_modules/mocha/lib/reporters/doc.js
fi

echo "DONE"
