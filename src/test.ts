import { parseLocation } from "./parse_location";

const location: string =
  "{{Location | location = Nivla Woods | x = -316 | y = 72 | z = -1600}} {{Location | location = Cave| x = 90 | y = 44 | z = -15210}}";

const matches = parseLocation(location);
console.log(matches);
// for (const match of matches) {
//   console.log(match);
// }
