const express = require('express');
const Course = require('../model/course');

const router = express.Router();

//create course
router.post('/', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course)
    } catch (error) {
        res.status(404).json({ message: "err.message" })
    }
});

//get all courses no pagination
// router.get('/', async (req, res) => {
//     try {
//         const courses = await Course.find();
//         res.status(200).json(courses)
//     } catch (error) {
//         res.status(500).json({ message: "err.message" })
//     }
// });


//get all courses with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const courses = await Course.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//get single course
router.get('/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message   
   });
    }
  });


//update course
// router.patch('/:id', async (req, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if (!course) {
//             return res.status(404).json({ message: 'Course not found' });
//         }
//         course.title = req.body.title;
//         course.description = req.body.description;
//         course.instructor = req.body.instructor;
//         course.startDate = req.body.startDate;
//         course.endDate = req.body.endDate;
//         await course.save();
//         res.json(course);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

//delete course
// router.delete('/:id', async (req, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if (!course) {
//             return res.status(404).json({ message: 'Course not found' });
//         }
//         await course.remove();
//         res.json({ message: 'Course deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }); 

// Update an existing course
router.put('/:id', async (req, res) => {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);   
  
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a course
  router.delete('/:id', async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json({ message: 'Course deleted'   
   });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;