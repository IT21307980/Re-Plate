const express = require('express');
const router = express.Router();
const { addItem, getItems, item, addComment, getComments, getUsersPosts, deletePost, editItem } = require('../controllers/ItemController')


router.post('/add', addItem);
router.put('/edit-item/:id', editItem);
router.get('/get', getItems);
router.get('/:id', item );
router.post('/:id/comments', addComment );
router.get('/:id/comments', getComments );
router.post('/userPosts', getUsersPosts);
router.delete('/deletePost/:id', deletePost);


module.exports = router;