const { render } = require("ejs");
const Music = require("../models/Music");

//ADMIN
class MusicController {
    //[GET] --page admin music: address: .../admin
    manager(req, res, next) {
        if (req.query.name) {
            Music.find({ name: { "$regex": req.query.name, "$options": "i" } })
                .then(result => res.render('admin/home', { result, textsearch: req.query.name }))
                .catch(next);
        } else {
            Music.find({})
                .then(result => res.render('admin/home', { result, textsearch: req.query.name }))
                .catch(next);
        }

    };

    //[GET] --create music-- address: .../admin/create/
    create(req, res, next) {
            Music.find({})
                .then(result => res.render('admin/create', {
                    result,
                }))
                .catch(next);
        }
        //[POST] --save music-- address: .../admin/create/
    store(req, res, next) {
        const data = new Music(req.body);
        data
            .save()
            .then(() => res.redirect('/admin'))
            .catch((err) => function(err, next) {
                res.render('404');
                console.log(err);
            });
    };

    //[GET] --show page update-- address: .../update/:id
    edit(req, res, next) {
            Music.findById(req.params.id)
                .then(music => res.render('admin/update', {
                    music,
                }))
                .catch(next);
        }
        //[PUT].../update/:id
    update(req, res, next) {
            Music.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/admin'))
                .catch(next);
        }
        //[DELETE] .../admin/delete/:id
    destroy(req, res, next) {
        Music.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] .../admin/delete/:id/force
    forceDestroy(req, res, next) {
        Music.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] .../admin/delete/:id/restore
    restore(req, res, next) {
        Music.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

}

module.exports = new MusicController();