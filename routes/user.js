const express = require("express");
const { importCsv, createUser, getUser, getUserById, updateUser, deleteUser } = require("../controllers/user");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/importData", upload, importCsv);
router.post("/createUser", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;
