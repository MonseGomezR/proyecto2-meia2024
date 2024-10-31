const File = require('../models/fileModel');

exports.getFiles = async (req, res) => {
    const dir_id = req.query.dir_id;
    console.log(dir_id);
    try {
        const files = await File.find({
            'dir_id': dir_id,
        });

        res.status(200).json(files);
    } catch (err) {
    res.status(500).send(err);
    }
};


exports.newFile = async (req, res) => {
    const { owner_id, name, parent } = req.body;
    try {
        const file = new File({ owner_id, name, parent });
        await file.save(); 

        res.status(201);
    } catch (err) {
    res.status(500).send(err);
    }
};

exports.newRoot = async (req, res) => {
    const { owner_id, name } = req.body;
    try {
        const file = new File({ owner_id, name, });
        await file.save(); 

        res.status(201);
    } catch (err) {
        res.status(500).send(err);
    }
}


