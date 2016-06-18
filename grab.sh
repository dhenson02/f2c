#!/bin/sh

TYPE=$1
WEEK=$2
PLAYER=$3
BASEURL="http://www03.myfantasyleague.com/2015/export?L=45589&TYPE=${TYPE}&JSON=1"
URL=${BASEURL}

if [ ${WEEK} ]; then
    URL="${URL}&W=${WEEK}"
fi

if [ ${PLAYER} ]; then
    URL="${URL}&P=${PLAYER}"
fi

wget -O data/${TYPE}.json ${URL}
