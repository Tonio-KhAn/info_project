const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
let Exercise = require('../models/exercise.model');

const storage = multer.diskStorage({
  destination: '../././public/uploads/',
  filename: function(req, file, cb){
  cb(null, file.fieldname + '-'+ Date.now() + path.extname(file.originalname));
  console.log(file)
}
});

const upload = multer({storage: storage}).single('image');

router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route("/add").post(auth,upload,(req, res) => {
  const routineID = req.body.routineID;
  const name= req.body.name;
  const description = req.body.description;
  const numOfReps = req.body.numOfReps;
  const url = req.body.url;
  const date = Date.parse(req.body.date);
  const image = "uploads/" + req.file.filename;
   

  const newExercise= new Exercise({
    routineID,
    name,
    description,
    numOfReps,
    url,
    image,
    date
});

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

  router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/routineID/:id").get((req, res) => {
    Exercise.find({"routineID": req.params.id })
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json("Error: " + err));
  });


  router.route("/:id").delete(auth, (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json("Exercise deleted."))
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/update/:id").put(auth, (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        exercise.username = req.body.username;
        exercise.exerciseName = req.body.exerciseName;
        exercise.description = req.body.description;
        exercise.date = Date.parse(req.body.date);
  
        exercise
          .save()
          .then(() => res.json("Exercise updated!"))
          .catch(err => res.status(400).json("Error: " + err));
      })
      .catch(err => res.status(400).json("Error: " + err));
  });
  
  module.exports = router;