
const getPrivateData = (req, res, next) => {
    res.status(200).json({
        success:true,
        data:"Got access to private data"
    })
}

module.exports = {getPrivateData}