const express = require("express")
const router = express.Router()
const {getPrivateData} = require("../controller/private.controller")
const {protect} = require('../middleware/Auth.middleware')

router.route("/").get(protect, getPrivateData)



module.exports = router