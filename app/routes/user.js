let express = require('express');
let router = express.Router();

// read Userlist
router.get('/', function(req, res, next) {
    res.send('Placeholder');
});

// router.get('/', (req, res, next) => {
//     User.find((err, UserList) => {
//         if (err)
//         {
//             return console.error(err);
//         }
//         else
//         {
//             console.log(UserList);
//         }
//     });
// });

module.exports = router;