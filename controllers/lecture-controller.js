// const encryption = require('../util/encryption');
const Course = require('../models/Course.js')
const Lecture = require('../models/Lecture.js')


module.exports = {
    addGet: async (req, res) => {
        const courseId = req.params.courseId

        try{
            const course = await Course.findById(courseId)
            .populate('lectures')
            
            res.render('lecture/add', { course });
        }catch(e){
            console.log(e)
        }


    },
    addPost: async (req, res) => {
        const { title, videoUrl } = req.body
        const courseId = req.params.courseId

        try {
            const createdLecture = await Lecture.create({
                title, videoUrl, course: courseId
            })

            const course = await Course.findById(courseId)
            course.lectures.push(createdLecture._id)
            await course.save()

            return res.redirect(`/lecture/add/${courseId}`)
        } catch (e) {
            console.log(e)
            return
        }

    },
    editGet: async (req, res) => {
        const lectureId = req.params.lectureId

        try{
            const lecture = await Lecture.findById(lectureId)
        const course = await Course.findById(lecture.course)
            .populate('lectures')

        res.render('lecture/add', { course, lecture });
        }catch(e){
            console.log(e)
        }
        

    },
    editPost: async (req, res) => {
        const lectureId = req.params.lectureId
        const { title, videoUrl } = req.body

        const lecture = await Lecture.findById(lectureId)
        lecture.title = title
        lecture.videoUrl = videoUrl
        await lecture.save()

        return res.redirect(`/lecture/add/${lecture.course}`);
    },
    delete: async (req, res) => {
        const lectureId = req.params.lectureId

        const lecture = await Lecture.findById(lectureId).populate('course')
        const courseId = lecture.course.id
        
        let course = await Course.findById(courseId)
        
        
        if (course.lectures.indexOf(lectureId) > -1) {
            const lectureToRemoveIndex = course.lectures.indexOf(lectureId)
            course.lectures.splice(lectureToRemoveIndex, 1)
            await course.save()
            await lecture.remove()
        }


        return res.redirect(`/lecture/add/${courseId}`)
    },
    play:async (req,res)=>{
        const courseId=req.params.courseId
        const lectureId=req.params.lectureId

        try{
            let course=await Course.findById(courseId)
                                    .populate('lectures')
            let lecture = await Lecture.findById(lectureId)

            
            return res.render('lecture/play',{course,lecture})

        }catch(e){
            console.log(e)
        }
    }

}
