"use strict";
exports.__esModule = true;
exports.parseLocation = void 0;
/** A RegExp pattern describing some quantity of whitespace characters. */
var WHITESPACE_PATTERN = "\\s*";
/** A RegExp pattern describing some delimiter between fields. */
var DELIMITER_PATTERN = WHITESPACE_PATTERN + "\\|" + WHITESPACE_PATTERN;
/** A RegExp pattern that captures the name of the location. */
var LOCATION_PATTERN = [
    "Location",
    "\\|",
    "location",
    "=",
    "(.+?)",
].join(WHITESPACE_PATTERN);
/** The axis expressed in the given patterns in order. */
var AXES = ["x", "y", "z"];
/**
 * Creates a RegExp pattern that captures an axis's value.
 * @param axis The axis to capture.
 */
function makeAxisPattern(axis) {
    return [axis, "=", "(-?\\d+)"].join(WHITESPACE_PATTERN);
}
/** A RegExp pattern that captures the coordinates of the location. */
var COORDINATE_PATTERN = AXES.map(makeAxisPattern).join(DELIMITER_PATTERN);
/** A RegExp that captures the name of a location and it's coordinates. */
var LOCATION_REGEXP = new RegExp("{{" +
    WHITESPACE_PATTERN +
    LOCATION_PATTERN +
    DELIMITER_PATTERN +
    COORDINATE_PATTERN +
    WHITESPACE_PATTERN +
    "}}");
/**
 * Parsing, lol
 * @param string
 */
function parseLocation(string) {
    var value = LOCATION_REGEXP.exec(string);
    if (value === null) {
        throw new Error();
    }
    var capture = value[0], name = value[1], rawCoordinates = value.slice(2);
    var _a = rawCoordinates.map(parseInt), x = _a[0], y = _a[1], z = _a[2];
    return {
        capture: capture,
        name: name,
        x: x,
        y: y,
        z: z
    };
}
exports.parseLocation = parseLocation;
