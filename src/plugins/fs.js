const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "data");

const readData = (file) => {
  const rawData = fs.readFileSync(path.join(dataPath, file));
  return JSON.parse(rawData);
};

const writeData = (file, data) => {
  fs.writeFileSync(path.join(dataPath, file), JSON.stringify(data, null, 2));
};

export { readData, writeData };
