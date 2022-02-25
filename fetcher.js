const fs = require("fs");
const request = require('request');
const readline = require('readline');

const URL = process.argv[2];




request(URL, (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }

  const size = (response.headers["content-length"]);

  if (fs.existsSync(process.argv[3])) {

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("File exists! Do you want to overwrite the file?  ", function (answer) {
      if (answer === 'y') {
        fs.writeFile(process.argv[3], body, error => {
          if (error) {
            console.log(error);
          }
          console.log(`Downloaded and saved ${size} bytes to ${process.argv[3]}`)
        })
      }
      rl.close();
    });
  }

  else {
    fs.writeFile(process.argv[3], body, error => {
      if (error) {
        return console.log(error);
      }
      console.log(`Downloaded and saved ${size} bytes to ${process.argv[3]}`);
    })
  }



});
