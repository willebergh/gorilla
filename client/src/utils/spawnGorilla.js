module.exports = function (animationDisabled, callback) {
    const gorilla = `
                 _
             ,.-" "-.,
            /   ===   \\
           /  =======  \\
        __|  (o)   (0)  |__
       / _|    .---.    |_ \\
      | /.----/ O O \\----.\\ |
       \\/     |     |     \\/
       |                   |
       |                   |
       |                   |
       _\\   -.,_____,.-   /_
   ,.-"  "-.,_________,.-"  "-.,
  /          |       |          \\
 |           l.     .l           |
 |            |     |            |
 l.           |     |           .l
  |           l.   .l           | \\,
  l.           |   |           .l   \\,
   |           |   |           |      \\,
   l.          |   |          .l        |
    |          |   |          |         |
    |          |---|          |         |
    |          |   |          |         |
    /"-.,__,.-"\\   /"-.,__,.-"\\"-.,_,.-"\\
   |            \\ /            |         |
   |             |             |         |
    \\__|__|__|__/ \\__|__|__|__/ \\_|__|__/
`

    if (animationDisabled) {
        console.log(gorilla);
        callback();
    } else {
        const lines = gorilla.split("\n");
        let count = 0;
        const loop = setInterval(() => {
            count++; console.log(lines[count]);
            if (count === lines.length - 1) {
                clearInterval(loop);
                callback();
            }
        }, 10)
    }

}