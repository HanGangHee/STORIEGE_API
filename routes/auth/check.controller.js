
/*
  GET /auth/check
 */

exports.check = (req, res) => {
    res.json({
        success : true,
        user : req.decoded.user
    })
}