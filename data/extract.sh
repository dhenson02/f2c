#!/bin/sh

FILE=data/$1.json

if [ -e "$FILE" ]; then
    node extract.js "$FILE"
else
    FILES=data/*.json
    for file in $FILES
    do
        node extract.js $file
    done
fi
