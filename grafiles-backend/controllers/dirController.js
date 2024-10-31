const Directory = require('../models/directoryModel');

exports.getDirectorios = async (req, res) => {
    const ownerId = req.query.owner_id;
    console.log(ownerId);
    try {
        const directories = await Directory.find({
            'owner_id': ownerId,
        });

        const shared = await Directory.findOne({
            '_id' : "SHARED",
        })

        shared.owner_id = ownerId;

        directories.push(shared)

        res.status(200).json(directories);
    } catch (err) {
    res.status(500).send(err);
    }
};


exports.newDirectorio = async (req, res) => {
    const { owner_id, name, parent_id } = req.body;
    try {
        const dir = new Directory({ owner_id, name, parent_id });
        await dir.save(); 
        res.status(201).send(dir._id);
    } catch (err) {
    res.status(500).send(err);
    }
}