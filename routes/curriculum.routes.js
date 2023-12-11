const router = require("express").Router(); 
const Curriculum = require("../models/Curriculum.model");
const mongoose = require("mongoose");
const User = require("../models/User.model");


// GET /curriculums/:curriculumId
router.get("/curriculums/:curriculumId", (req, res) => {
    const { curriculumId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(curriculumId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Curriculum.findById(curriculumId)
      .then((curriculum) => {
        console.log("Retrieved curriculum ->", curriculum);
        res.json(curriculum);
      })
      .catch((error) => {
        console.error("Error while retrieving curriculum ->", error);
        res.status(500).send({ error: "Failed to retrieve curriculum" });
      });
  });



  //GET /curriculums/

router.get("/curriculums", (req, res) => {
 console.log(req.payload)
  Curriculum.find({userId: req.payload._id})
    .then((curriculum) => {
      console.log("Retrieved curriculum ->", curriculum);
      res.json(curriculum);
    })
    .catch((error) => {
      console.error("Error while retrieving curriculum ->", error);
      res.status(500).send({ error: "Failed to retrieve curriculum" });
    });
});


//POST /curriculums
router.post("/curriculums", (req, res, next) => {
  const {
    userId,
    personalData: { name, phone, email, address, position, summary },
    links,
    skills,
    languages,
    projects,
    experience,
    education,
    awards
  } = req.body;

  const newCurriculum = {
    userId,
    personalData: { name, phone, email, address, position, summary },
    links,
    skills,
    languages,
    projects,
    experience,
    education,
    awards
  };

  Curriculum.create(newCurriculum)
    .then(() => {
      res.json(newCurriculum);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});


// PUT /curriculums/:curriculumId
router.put("/curriculums/:curriculumId", (req, res, next) => {
  const { curriculumId } = req.params;

  const { 
    userId,
    personalData: { name, phone, email, address, position, summary },
    links,
    skills,
    languages,
    projects,
    experience,
    education,
    awards
  } = req.body;

  const newRequestBody = {
    userId,
    personalData: { name, phone, email, address, position, summary },
    links,
    skills,
    languages,
    projects,
    experience,
    education,
    awards
  }

  Curriculum.findByIdAndUpdate(curriculumId, newRequestBody,{new:true})
    .then((updatedCurriculum) => {
      res.status(200).json(updatedCurriculum)
    }).catch(() => {
      next(error)
    });
})

// Delete /curriculums/:curriculumId
router.delete("/curriculums/:curriculumId", (req, res, next) => {
  const { curriculumId } = req.params;
  Curriculum.findByIdAndDelete(curriculumId)
    .then(() => {
      res.status(204).send()
    })
    .catch((error) => {
      next(error)
    });
});

module.exports = router;