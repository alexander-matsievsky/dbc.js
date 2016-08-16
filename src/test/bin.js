import {dbc, POLICY} from "../main/lib";

// todo: rename `volume` (current barrel fuel level) to something more distinguishable from `capacity`.

const {inv, post, pre} = dbc(POLICY.DEBUGGER);

const barrell = {
  capacity: 1e3,
  volume: .1e3,
  add(volume) {
    if (!(isFinite(volume) && volume > 0)) {
      throw new Error('Smth smth wrong input');
    }
    if (!(this.volume + volume <= this.capacity)) {
      throw new Error('Smth smth wrong input');
    }
    this.volume += volume;
  },
  remove(volume) {
    if (!(isFinite(volume) && volume > 0)) {
      throw new Error('Smth smth wrong input');
    }
    if (!(this.volume - volume >= 0)) {
      throw new Error('Smth smth wrong input');
    }
    this.volume += volume;
  },
  fill() {
    const fill = this.volume / this.capacity;
    if (!(fill >= 0 && fill <= 100)) {
      // note: caller should handle this exception as well.
      throw new Error('Smth smth wrong output');
    }
    return fill;
  }
};

@inv(() => [
  isFinite(this.capacity),
  this.volume >= 0 && this.volume <= this.capacity
])
const barrellDbc = {
  capacity: 1e3,
  volume: .1e3,

  @pre(volume =>
    isFinite(volume) && volume > 0
  )
  add(volume) {
    this.volume += volume;
  },

  @pre(volume => [
    isFinite(volume) && volume > 0
  ])
  remove(volume) {
    this.volume -= volume;
  },

  @post(fill => [
    fill >= 0 && fill <= 100
  ])
  fill() {
    return this.volume / this.capacity;
  }
};
