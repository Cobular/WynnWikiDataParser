"use strict";
exports.__esModule = true;
var parse_location_1 = require("./parse_location");
var location = "{{Location | location = Nivla Woods | x = -316 | y = 72 | z = -1600}} {{Location | location = Cave| x = 90 | y = 44 | z = -15210}}";
var matches = parse_location_1.parseLocation(location);
console.log(matches);
// for (const match of matches) {
//   console.log(match);
// }
