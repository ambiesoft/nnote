var fs=require('fs')
// Work on POSIX and Windows
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
console.log(stdinBuffer.toString());
