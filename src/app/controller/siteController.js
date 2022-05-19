const { render } = require("ejs");
const { query } = require("express");
const Music = require("../models/Music");

class SiteController {
    //GET
    home(req, res, next) {
        Music.find({})
            .then(result => res.render('home', { result, err: "Tên bài hát." }))
            .catch(next);

    };
    search(req, res, next) {
        if (req.query.name == "") { res.render('home', { title: "Music online", err: "không có bài hát" }); }
        Music.findOne({ name: req.query.name })
            .then((result) => {
                if (result == null) {
                    res.render('home', { title: "Music online", err: "không có bài hát" })
                } else {
                    Music.find({}).then(list => res.render('detail', { result, list, title: req.query.name }))
                }
            })

    };
    //[GET] --detail music-- address: .../music/:slug
    detail(req, res, next) {

        Music.findOne({ name: req.query.name })
            .then(result => {
                Music.find({}).then(list => res.render('detail', { result, list, title: req.query.name }))
            })
            .catch(next);

    };
    style(req, res, next) {
        Music.find({ style: req.query.style })
            .then(result => { res.render('news', { result, title: req.query.style }) })
            .catch(next);

    };
    notpage(req, res, next) {
        res.render('404');
    }
}

module.exports = new SiteController();