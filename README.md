# fazscore

## Description

An implementation of a Floating Average Z-Score algorithmic method for use in identifying trends in historical data.

For further information see - http://stackoverflow.com/questions/787496/what-is-the-best-way-to-compute-trending-topics-or-tags/826509#826509

This is a port from  - https://github.com/rattle/fazscore

## Installation

    npm install fazscore --save

## Usage

Typically you'll have a set of historical data points that you want to compare to a current data point and see how much the latest data point has deviated from the historical average, to identify if it's trending.

```javascript
var assert = require('assert');
var FAZScore = require('fazscore');

const history = {
  'England': [5,1,3,4,4],
  'Ireland': [1,0,0,1,2],
  'Scotland': [2,4,1,4,5]
}

// The current number of mentions for each term
const current = {
  'England': 0,
  'Ireland': 7,
  'Scotland': 6
}

// Calculate the trending scores
var scores = {}
var sortable = [];

var keys = Object.keys(history);

var i;
for (i = 0; i < keys.length; i++) {
  var term = keys[i];
  var score = new FAZScore(0.5, history[term])
  scores[term] = score.score(current[term]);
  sortable.push([term, scores[term]]);
};

// Display 'most' trending term with trending score

assert.equal(scores['England'], -0.6437116131343118);
assert.equal(scores['Ireland'], 6.324685526546452);
assert.equal(scores['Scotland'], 5.082337064517753);

sortable = sortable.sort(function(a, b) {
  return b[1] - a[1];
});

assert.equal(sortable[0], 'Ireland');

```

## Contributing to fazscore
 
* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2019 Scott Ballantyne. See LICENSE.txt for further details.

