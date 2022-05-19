const siteRoute = require('./site');
const adminRoute = require('./admin');

function router(app){
    app.use('/admin',adminRoute);
    app.use('/',siteRoute);

}

module.exports = router;