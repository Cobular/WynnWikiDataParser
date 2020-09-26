import parser from "fast-xml-parser";
import fs from "fs";
import { URL } from "url";

type Dictionary = { [index: string]: object };
interface NodeData {
  name: string;
  x: number;
  y: number;
  z: number;
  link: string;
}

const file = fs.readFileSync("dist/data.xml", "utf-8");
const titleRegex: RegExp = /\/[a-z]*/;
const locationRegex: RegExp = /{{\s*Location\s*\|\s*location\s*=\s*(.+?(?=\s*\|\s*x\s*))\s*\|\s*x\s*=\s*(-?\d*)\s*\|\s*y\s*=\s*(-?\d*)\s*\|\s*z\s*=\s*(-?\d*)\s*}}/g;
// https://regex101.com/r/R9srPf/1
const englishDict: Dictionary = {};
const namesAndLocationsDict: Array<Object> = [];

function checkForDuplicateNodes(pastNodes: Array<NodeData>, node: NodeData) {}

const storeData = (data: any, path: string | number | Buffer | URL) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

if (parser.validate(file) === true) {
  //optional (it'll return an object in case it's not valid)
  var jsonObj = parser.parse(file);
}

jsonObj["mediawiki"]["page"].forEach((element: any) => {
  const title: string = element["title"];
  if (titleRegex.test(title)) {
  } else {
    englishDict[title] = element;
    for (const match of (element.revision.text as string).matchAll(
      locationRegex
    )) {
      namesAndLocationsDict.push([
        ...match.slice(1, 5),
        `https://wynncraft.gamepedia.com/${encodeURI(title)}`,
      ]);
    }
  }
});

storeData(englishDict, "dist/englishData.json");
storeData(namesAndLocationsDict, "dist/nodeData.json");
