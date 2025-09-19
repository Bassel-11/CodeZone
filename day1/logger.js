function log(message) {
  console.log("this is message from logger1", message);
}

function log2(message) {
  console.log("this is message from logger2", message);
}

function log3(message) {
  console.log("this is message from logger3", message);
}

module.exports = {
  log,
  log2,
  log3,
};
