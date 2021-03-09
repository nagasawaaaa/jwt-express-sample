const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Authorization Header は「Bearer <token>」という文字列で構成されているので
    // 半角空白で分割し配列の1番目の値を取得する
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, 'secret123');
    next();
  } catch (e) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};
