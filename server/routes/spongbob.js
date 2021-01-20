const express = require('express');
const router = express.Router();
const axios = require('axios');

const getImages = async () => {
    try {
        const response = await axios.get(
            'https://www.reddit.com/r/programmerhumor.json'
        );
        return JSON.stringify(response.data);
    } catch(error){
        const response = await error;
        return JSON.stringify(error.data);
    }
}

const makeImage = async (req) => {
    console.log(req);
    let topString = req.query.topString;
    let bottomString = req.query.bottomString;
    try {
        const response = await axios.post(
            'https://api.imgflip.com/caption_image',
            null,
            {   params: {
                    template_id: 102156234,
                    username: 'ChrisBlack5',
                    password: 'password',
                    text0: '',
                    text1: '',
                    "boxes[0][type]": "text",
                    "boxes[0][text]": `${topString}`,
                    "boxes[1][type]": "text",
                    "boxes[1][text]": `${bottomString}`
                }
            }
        );
        return JSON.stringify(response.data);
    } catch(error){
        const reponse = await error;
        return JSON.stringify(error.data);
    }
}

router.get('/', (req, res, next) => {  
    makeImage(req).then(response => res.send(response));
});


module.exports = router;