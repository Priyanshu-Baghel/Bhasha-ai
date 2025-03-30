const Media = require("../../models/media/Media");

exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// Backendurl/public/videos/file_name.mp4
exports.create = async (req, res) => {
  const { name } = req.body;
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }

  try {
    const createdMedia = await Media.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Media created successfully", createdMedia });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
