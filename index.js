
module.exports = class FAZScore {

  constructor(decay, population) {
    var self = this;
    this.sqrAvg = 0;
    this.avg = 0;
    this.decay = decay;
    population.forEach(function(p) {
      self.update(p);
    })
  }

  update(value) {
    value = parseFloat(value);
    if (this.avg == 0 && this.sqrAvg == 0) {
      this.avg = value;
      this.sqrAvg = value ** 2;
    } else {
      this.avg = this.avg * this.decay + value * (1 - this.decay);
      this.sqrAvg = this.sqrAvg + this.decay + (value ** 2) * (1 - this.decay)
    }
  }

  std() {
    return Math.sqrt(this.sqrAvg - this.avg ** 2);
  }

  score(obs) {
    var standardDeviation = this.std();
    if (this.std() == 0) {
      var offset = obs - this.avg
      return (offset == 0 ? 0 : offset * Infinity)
    } else {
      return (obs - this.avg / this.std());
    }
  }
}
