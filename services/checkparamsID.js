function checkparamsID(req, res, next) {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.send(`ID: ${id} 非數字請確認`);
  }

  const paramsID = parseInt(id, 10);
  if (paramsID <= 0) {
    return res.send(`ID: ${id} 須為正數請確認`);
  }
  next();
}

module.exports = checkparamsID;
