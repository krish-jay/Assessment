const fs = require('fs');

// Utility to read data (intentionally sync to highlight blocking issue)
async function readData(DATA_PATH) {
    const raw = await fs.readFileSync(DATA_PATH);
    return JSON.parse(raw);
  }
  
  // Utility to write data (async)
async function writeData(DATA_PATH, data) {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2)); 
}

module.exports ={
  readData,writeData
}