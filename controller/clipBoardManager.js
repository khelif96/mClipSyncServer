var clipboardy = require('clipboardy');

exports.getClipBoardContents = (req, res) => {
  const contents = clipboardy.readSync();
  res.json({message: contents});
  res.status(200);
};

exports.writeClipBoardContents = (req, res) => {
  const {
    clipBoardMessage
  } = req.body;
  const contents = clipboardy.writeSync(clipBoardMessage);

  res.json({message: contents});
  res.status(200);
};
