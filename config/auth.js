module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },
    isAnonymous: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    },

    isEnrolled: (req, res, next) => {
        if (req.user) {
            const courseId = req.params.courseId
            if (req.user.enrolledCourses.indexOf(courseId) > -1) {
                next()
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/user/login');

        }
    }
}