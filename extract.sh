#!/bin/sh

cd data
FILE=$1.json

if [ -e "$FILE" ]; then
    node extract.js $FILE
else
    FILES=*.json
    for file in $FILES
    do
        node extract.js $file
    done
fi
