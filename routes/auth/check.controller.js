
/*
  GET /auth/check
 */

exports.check = (req, res) => {
    res.json({
        message: 'ok',
        user : req.decoded.user
    })
}