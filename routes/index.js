const express = require('express');
const router = express.Router();

router.get('/ping', (req, res)=>{
    res.json({response: "pong", details: {project_name: "Zigy", version: "0.0.1", tag: "demo", description: "Zigy assesment ..." } });
});



module.exports = router;