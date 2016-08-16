import {dbc} from "../main/lib";
import {DEBUGGER} from "../main/policy/debugger";

// todo: rename `volume` (current barrel fuel level) to something more distinguishable from `capacity`.

const {inv, post, pre} = dbc(DEBUGGER);

const barrel = {
    capacity: 1e3,
    volume: .1e3,
    add(volume: number) {
        if (!(isFinite(volume) && volume > 0)) {
            throw new Error("Smth smth wrong input");
        }
        if (!(this.volume + volume <= this.capacity)) {
            throw new Error("Smth smth wrong input");
        }
        this.volume += volume;
    },
    remove(volume: number) {
        if (!(isFinite(volume) && volume > 0)) {
            throw new Error("Smth smth wrong input");
        }
        if (!(this.volume - volume >= 0)) {
            throw new Error("Smth smth wrong input");
        }
        this.volume -= volume;
    },
    fill(): number {
        const fill = this.volume / this.capacity;
        if (!(fill >= 0 && fill <= 100)) {
            // note: caller should handle this exception as well.
            throw new Error("Smth smth wrong output");
        }
        return fill;
    }
};

@inv((barrel: BarrellDbc) => [
    isFinite(barrel.capacity),
    barrel.volume >= 0 && barrel.volume <= barrel.capacity
])
class BarrellDbc {
    private capacity = 1e3;
    private volume = .1e3;

    @pre(volume => [
        isFinite(volume) && volume > 0
    ])
    public add(volume: number) {
        this.volume += volume;
    }

    @pre(volume => [
        isFinite(volume) && volume > 0
    ])
    public remove(volume: number) {
        this.volume -= volume;
    }

    @post(fill => [
        fill >= 0 && fill <= 100
    ])
    public fill() {
        return this.volume / this.capacity;
    }
}
const barrelDbc = new BarrellDbc();

void barrel;
void barrelDbc;

@post(x => [
    x > 0
])
function foobar(x) {
    return x + 1;
}
