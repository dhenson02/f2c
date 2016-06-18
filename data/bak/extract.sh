#!/bin/sh
cd data
FILES=*.json
for file in $FILES
do
    node extract.js $file
done
