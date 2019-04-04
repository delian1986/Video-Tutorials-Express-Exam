// const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Course = require('../models/Course.js')


module.exports = {
    
    createPost: async (req, res) => {
        const { title, description, imageUrl } = req.body
        const isListed = req.body.isListed === 'on'
        const creator = req.user.id

        try {
            const createdCourse = await Course.create({
                title, description, imageUrl, isListed, creator
            })
            return res.redirect(`/lecture/add/${createdCourse._id}`)

        } catch (e) {
            console.log(e)
            return
        }

    },
    panelGet: async (req, res) => {
        const courses = await Course.find()

        res.render('course/panel', { courses })
    },
    editGet: async (req, res) => {
        const courseId = req.params.courseId

        try {
            let course = await Course.findById(courseId)
            const action="Edit"
            return res.render('course/edit', { course, action })
        } catch (e) {
            console.log(e)
        }

    },
    editPost: async (req, res) => {
        const courseId = req.params.courseId
        const { title, description, imageUrl } = req.body
        const isListed = req.body.isListed === 'on'

        try {
            let course = await Course.findById(courseId)
            course.title = title
            course.description = description
            course.imageUrl = imageUrl
            course.isListed = isListed

            await course.save()
        } catch (e) {
            console.log(e)
        }


        return res.redirect('/course/panel')
    },
    detailsGet: async (req, res) => {
        const courseId = req.params.courseId
        const user = req.user

        try {
            let course = await Course.findById(courseId)
                .populate('lectures')

            let enrolled = user.enrolledCourses.indexOf(courseId) !== -1

            return res.render('course/details', { course, enrolled })
        } catch (e) {
            console.log(e)
        }
    },
    enroll: async (req, res) => {
        let user = req.user
        const courseId = req.params.courseId

        try {
            let course = await Course.findById(courseId)

            if (user.enrolledCourses.indexOf(courseId) === -1) {
                user.enrolledCourses.push(course._id)
                await user.save()

                course.usersEnrolled.push(user._id)
                course.timesEnrolled++
                await course.save()

                return res.redirect(`/course/details/${courseId}`)
            }
        } catch (e) {
            console.log(e)
        }
    },
    getAll: async (req, res) => {
        try {
            
            const courses = await Course.find({ isListed: true })

            return res.render('course/all', { courses })
        } catch (e) {
            console.log(e)
        }
    },
    search: async (req, res) => {
        let needle = req.query.needle
        const userId = req.user.id

        try {
            const allCourses = await Course.find({isListed:true})

            const courses = allCourses.filter(c => c.title.toLowerCase().includes(needle.toLowerCase()))

            return res.render('course/all', { courses })
        } catch (e) {
            console.log(e)
            return
        }
    }
}
