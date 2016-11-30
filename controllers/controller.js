// routes

/ ==================================================================================
// dependencies
// ==================================================================================

// require express
var express = require('express');
// initiate router
var router = express.Router();

// require the model .js file


// ==================================================================================
// ROUTES
// ==================================================================================

router.get('/', function (req, res) {
	res.render('/index');
});

// route to handle select all
router.get('/comments', function (req, res) {
	comment.selectAll(function (data) {

		var hbsObject = {
			comments: data
		};

		// console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

// route to handle adding a new comment
router.post('/comments/insert', function (req, res) {
	comment.insertOne(['comment_name'], [req.body.comment_name], function () {
		res.redirect('/comments');
	});
});

// route to handle updating a comment (devouring it)
router.put('/comments/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	// console.log('condition', condition);

	comment.updateOne({devoured: true}, condition, function () {
		res.redirect('/comments');
	});
});

// export router
module.exports = router;
