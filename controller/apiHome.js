exports.getApi = (req, res) => {
  res.json({message: "Welcome to the mClipSyncServer API"});
  res.status(200);
};

exports.postApi = (req,res) => {
  res.json({error: "Route does not allow POST"});
  res.status(200);
};

// Middle wear to check if path is correct
exports.invalidPath = (req,res) => {
    res.status(400).json({"error": "Invalid Path"});
};
