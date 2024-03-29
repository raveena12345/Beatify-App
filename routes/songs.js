const router = require("express").Router();
const { User } =require("../Model/user");
const { Song, validate } = require("../Model/song");
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");

//create song
router.post("/", admin, async(req,res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});

    const song = await Song(req.body).save();
    res.status(201).send({data: song, message: "Song created successfully"});
});

//get all songs
router.get("/", async(req,res) =>{
    const songs = await Song.find();
    res.status(200).send({data: songs});
});

//update song
router.put("/:id", [validObjectId, admin], async(req, res)=>{
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {new: true });
    res.status(200).send({data: song, message: "Song updated successfully"});
});

// Delete song by ID
router.delete("/:id", [validObjectId, admin], async (req, res) => {
	await Song.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Song deleted sucessfully" });
});

//like sing
router.put("/like/:id", [validObjectId, auth], async(req, res)=>{
    let resMessage = "";
	const song = await Song.findById(req.params.id);
	if (!song) return res.status(400).send({ message: "song does not exist" });

	const user = await User.findById(req.user._id);
	const index = user.likedSongs.indexOf(song._id);
	if (index === -1) {
		user.likedSongs.push(song._id);
		resMessage = "Added to your liked songs";
	} else {
		user.likedSongs.splice(index, 1);
		resMessage = "Removed from your liked songs";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
});

// Get liked songs
router.get("/like", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const songs = await Song.find({ _id: user.likedSongs });
	res.status(200).send({ data: songs });
});

module.exports = router;