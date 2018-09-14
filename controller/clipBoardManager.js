const User = require('../models/user');

exports.getClipBoardContents = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if(err) res.status(500).json({error: 'internal server error'});
    if(!user) res.status(404).json({error: 'Could not find that user'});
    res.status(200).json({currentClip: user.currentClip});
  });
};

exports.writeClipBoardContents = (req, res) => {
  const {
    clipBoardMessage
  } = req.body;
  User.findById(req.userId, (err, user) => {
    if(err) res.status(500).json({error: 'Unable to find User with that id'});
    if(!user) res.status(404).json({error: 'Could not find that user'});
    user.currentClip = clipBoardMessage;
    user.save(error => {
      if (error) res.status(500).json({error: 'internal server error while saving'});
      res.status(200).json({message: 'Successfuly saved clip'});
    });
  });
};
