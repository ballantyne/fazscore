var path = require('path');
var assert = require('assert');
var FAZScore = require(path.join(__dirname, '..'));

describe('fazscore', function() {
  describe('ruby readme example', function() {
    it('identify the trending term', function() {

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
      var list = [];

      var keys = Object.keys(history);

      var i;
      for (i = 0; i < keys.length; i++) { 
        var term = keys[i];
        var score = new FAZScore(0.5, history[term])
        scores[term] = score.score(current[term]);
        list.push([term, scores[term]]);
      };

      // Display 'most' trending term with trending score

      assert.equal(scores['England'], -0.6437116131343118);
      assert.equal(scores['Ireland'], 6.324685526546452);
      assert.equal(scores['Scotland'], 5.082337064517753);

      list = list.sort(function(a, b) {
        return b[1] - a[1];
      });

      assert.equal(list[0][0], 'Ireland');

    });
  });

})
