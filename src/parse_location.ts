/** A RegExp pattern describing some quantity of whitespace characters. */
const WHITESPACE_PATTERN = "\\s*";

/** A RegExp pattern describing some delimiter between fields. */
const DELIMITER_PATTERN = WHITESPACE_PATTERN + "\\|" + WHITESPACE_PATTERN;

/** A RegExp pattern that captures the name of the location. */
const LOCATION_PATTERN: string = [
  "Location",
  "\\|",
  "location",
  "=",
  "(.+?(?=",
  "\\|",
  "x",
  "))",
].join(WHITESPACE_PATTERN);

/** The axis expressed in the given patterns in order. */
const AXES = ["x", "y", "z"] as const;

/**
 * Creates a RegExp pattern that captures an axis's value.
 * @param axis The axis to capture.
 */
function makeAxisPattern(axis: "x" | "y" | "z"): string {
  return [axis, "=", "(-?\\d+)"].join(WHITESPACE_PATTERN);
}

/** A RegExp pattern that captures the coordinates of the location. */
const COORDINATE_PATTERN = AXES.map(makeAxisPattern).join(DELIMITER_PATTERN);

/** A RegExp that captures the name of a location and it's coordinates. */
const LOCATION_REGEXP = new RegExp(
  "{{" +
    WHITESPACE_PATTERN +
    LOCATION_PATTERN +
    DELIMITER_PATTERN +
    COORDINATE_PATTERN +
    WHITESPACE_PATTERN +
    "}}",
  "g"
);

export interface ParsedLocation {
  readonly capture: string;
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

/**
 * Parsing, lol
 * @param string
 */
export function parseLocation(string: string): ParsedLocation {
  const value = LOCATION_REGEXP.exec(string);

  if (value === null) {
    throw new Error();
  }

  const [capture, name, ...rawCoordinates] = value;
  const [x, y, z] = rawCoordinates.map((x) => parseInt(x, 10));
  return {
    capture,
    name,
    x,
    y,
    z,
  };
}
