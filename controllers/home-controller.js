const Course = require('../models/Course.js')

module.exports = {
    index: async (req, res) => {
        const user=req.user

        if(user && user.isInRole('Admin')){
            return res.redirect('/course/panel')
        }else{
            try {
                const  courses  = await Course.find({ isListed: true })
                .sort({ "timesEnrolled": -1 })
                .limit(3)
                return res.render('home/index', {courses});
    
            } catch (e) {
                console.log(e)
            }
        }
    }
}