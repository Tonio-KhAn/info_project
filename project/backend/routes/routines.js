const router = require('express').Router();
const auth = require('../middleware/auth');
let Routine = require('../models/routine.model');



router.route('/').get((req, res) => {
    Routine.find()
    .then(routines => res.json(routines))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const routineName = req.body.routineName;
    const description = req.body.description;
    const url = req.body.url;
    const date = Date.parse(req.body.date);

    const newRoutine = new Routine({username, routineName, description, url, date});

    newRoutine.save()
    .then(() => res.json('Routine added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Routine.findById(req.params.id)
    .then(routine => res.json(routine))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/myRoutine/:id").get((req, res) => {
    Routine.find({"username": req.params.id })
      .then(routine => res.json(routine))
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route('/:id').delete(auth, (req, res) => {
    Routine.findByIdAndDelete(req.params.id)
    .then(() => res.json('Routine deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put(auth, (req, res) => {
    Routine.findById(req.params.id)
    .then(routine => {
        routine.username = req.body.username;
        routine.routineName = req.body.routineName
        routine.description = req.body.description;
        routine.url = req.body.url;
        routine.date = Date.parse(req.body.date);

        routine.save()
        .then(() => res.json('Routine updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;