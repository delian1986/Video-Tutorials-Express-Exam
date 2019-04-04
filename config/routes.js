const restrictedPages = require('./auth');
const homeController = require('../controllers/home-controller')
const userController = require('../controllers/user-controller')
const courseController=require('../controllers/course-controller')
const lectureController=require('../controllers/lecture-controller')

module.exports = app => {
    app.get('/', homeController.index)

    //user routes
    app.get('/user/login',restrictedPages.isAnonymous, userController.loginGet)
    app.post('/user/login', restrictedPages.isAnonymous,userController.loginPost)
    app.get('/user/register',restrictedPages.isAnonymous,userController.registerGet)
    app.post('/user/register',restrictedPages.isAnonymous,userController.registerPost)
    app.post('/user/logout',restrictedPages.isAuthed,userController.logout)

    //admin course
    app.post('/course/create',restrictedPages.hasRole('Admin'),courseController.createPost)
    app.get('/course/panel/',restrictedPages.hasRole('Admin'),courseController.panelGet)
    app.get('/course/edit/:courseId',restrictedPages.hasRole('Admin'),courseController.editGet)
    app.post('/course/edit/:courseId',restrictedPages.hasRole('Admin'),courseController.editPost)

    //admin lectures
    app.get('/lecture/add/:courseId',restrictedPages.hasRole('Admin'),lectureController.addGet)
    app.post('/lecture/add/:courseId',restrictedPages.hasRole('Admin'),lectureController.addPost)
    app.get('/lecture/edit/:lectureId',restrictedPages.hasRole('Admin'),lectureController.editGet)
    app.post('/lecture/edit/:lectureId',restrictedPages.hasRole('Admin'),lectureController.editPost)
    app.get('/lecture/delete/:lectureId',restrictedPages.hasRole('Admin'),lectureController.delete)

    //auth users
    app.get('/course/all',restrictedPages.isAuthed,courseController.getAll)
    app.get('/course/search',restrictedPages.isAuthed,courseController.search)
    app.get('/course/details/:courseId',restrictedPages.isAuthed,courseController.detailsGet)
    app.post('/course/enroll/:courseId',restrictedPages.isAuthed,courseController.enroll)
    app.get('/course/:courseId/lecture/:lectureId',restrictedPages.isEnrolled,lectureController.play)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};