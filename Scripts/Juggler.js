// hand strings
var RightHand = "R";
var LeftHand = "L";
// Toss direction strings
var Pass = "P";
var Diagonal = "D";
var Self = "S";
var Heff = "H";

// The object that represents a Toss 
// parameters:
//      direction_ - A Toss direction string (maybe a full Toss string)
//      magnitude_ - This siteswap value of the pass (optional: defaults to 3)
//      juggler_   - The name of the destination juggler (optional: defaults to "A")

function Toss(direction_, magnitude_, juggler_) {
    this.originJuggler = null;
    this.originHand = RightHand;
    this.magnitude = magnitude_;
    this.direction = direction_;
    this.juggler = juggler_;
    this.tossPath = null;

    if (direction_ != undefined && direction_.length > 1) {
        let length = direction_.length;
        let i = 0;
        // if the Toss string has more than 3 charaters then it has an origin section
        if (length > 3) {
            this.originJuggler = direction_[i].toUpperCase();
            ++i;
            this.originHand = direction_[i].toUpperCase();
            ++i;
            ++i; // increment past the "-"
        }
        // if the next charater is a not a number
        this.magnitude = Number.parseInt(direction_[i]);
        if (Number.isNaN(this.magnitude)) {
            this.magnitude = 3; // set the magnitude to default
        } else {
            ++i; // go to the next charater to get the direction
        }
        this.direction = direction_[i].toUpperCase();
        ++i;
        if (i < length) {
            this.juggler = direction_[i].toUpperCase();
        }
    } else {
        if (direction_ === undefined) {
            this.direction = Self;
        }

        if (this.magnitude === undefined || isNaN(this.magnitude)) {
            this.magnitude = 3;
        }
        if (direction_ === undefined) {
            this.direction = Self;
        }
        if (juggler_ === undefined) {
            this.juggler = null;
        }
    }
}

Toss.prototype.shortDestinationString = function() {
    let retStr = new String();
    if (this.magnitude != 3) {
        retStr = this.magnitude.toString();
    }
    retStr += this.direction;
    return retStr;
}

Toss.prototype.destinationString = function() {
    let retStr = this.shortDestinationString();
    if (this.juggler != null && this.direction != Self && this.direction != Heff)
        retStr += this.juggler;
    return retStr;
}


Toss.prototype.toString = function() {
    let retStr = new String();
    if (this.originJuggler != null) {
        retStr = this.originJuggler;
        retStr += this.originHand;
        retStr += "-";
    }
    retStr += this.magnitude.toString();
    retStr += this.direction;
    if ((this.direction === Self || this.direction === Heff)) {
        if (this.originJuggler != null) {
            retStr += this.originJuggler;
        }
    } else if (this.juggler != null) {
        retStr += this.juggler;
    }
    return retStr;
}




function Juggler(name_, patternRow_) {
    this.name = name_;
    this.tossHand = RightHand;
    if (patternRow_ != null) {
        this.tosses = new Array(patternRow_.cells.length);
    }

    this.toString = function() {
        let ret = this.name + this.tossHand;
        return ret;
    }

}