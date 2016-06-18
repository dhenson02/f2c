#!/bin/sh
while IFS= read -r type
        do
                sh grab.sh "$type"
        done < "shopping-list"

sh extract.sh
