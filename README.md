# f2c

### My FFL app using (among many others)
 - [Express JS](http://expressjs.com/) 4.x
 - [Preact](https://preactjs.com/) >= 4.8.0
 - [Babel](http://babeljs.io/) >= 6

and plenty more (see `package.json` for details).

## Requirements

 - [node](https://nodejs.org) I'm using **>= 5.5.0**, so I suggest using that
     
### Semi-Requirements (if you want to use my npm scripts - see **package.json**)

 - screen - `sudo apt-get install screen`
 
## Pre-setup

#### Requires a bit of manual labor.  Most of it can be done by running:

```bash
sh grab-all.sh
```

However, some of these require different parameters (week and/or player number).  Those that don't have this requirement will be filled correctly.  The others can be obtained with:

```bash
sh grab.sh $TYPE $WEEK $PLAYER
    # ... as many times as necessary
sh extract.sh
```

`extract.sh` cleans up the JSON that is returned because it does some unnecessary nesting and adds extra data I don't need.

## Setup

```bash
npm install
cp config.json.blank config.json 
# ^...edit the config.json to match your league's settings
npm run build 
# ^ or dist or watch
npm start
```

## Who this is for

Players and commissioners of [My Fantasy League](http://www.myfantasyleague.com/) teams/leagues.

## Credits

Please give credit to any of the authors of the attributed packages in the package.json file appropriately.  They all work very hard and deserve some extra traffic :)

## License

The MIT License (MIT)

Copyright (c) 2016 Deryck Henson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
