const Items = require('../models/addItemModel')
const Comments = require('../models/commentsModel')


const addItem = async(req, res) =>{

    const {itemName, ownerId, quantity, expireDate, location, mediaFile, contact, itemType, price, description } = req.body;

    try {

        const item = await Items.create({itemName, ownerId, quantity, expireDate, location, mediaFile, contact, itemType, price, description });
        //console.log("item data is here");

        if (item) {
            res.status(201).json({
                message: 'Item added successfully!!',
            });
        } else {
            res.status(400).json({ message: 'Invalid item data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getItems = async(req, res) => {

    try{
        await Items.find().then(data => {
            res.send({ status: "Ok", data: data })
        })
    }catch (error){
        console.log("Error", error);
    }
}

const item = async(req,res) => {
    try {
        const data = await Items.findById(req.params.id).then(data => {
            if(data){
                res.send({status: 'ok', data: data})
            }else{
                res.status(404).json({message: "Item not found"});
            }
        })
    } catch (error) {
        console.log("Error", error);
    }
}

const addComment = async(req,res) => {

    const {userName, userId, comment, itemId} = req.body
    try{

        const data = await Comments.create({userName, userId, comment, itemId});
        if (data) {
            res.status(201).json({
                message: 'Comment added successfully!!',
            });
        } else {
            res.status(400).json({ message: 'Invalid comment data' });
        }
        
    } catch (error){
        res.status(400).json({ message: error.message});
    }
}

const getComments = async (req, res) => {
    const { itemId } = req.query; // Access itemId from query parameters
    
    //console.log("Item Id:", itemId);

    try {
        const comments = await Comments.find({ itemId: itemId });

        if (comments.length > 0) {
            res.send({ status: "Ok", data: comments });
        } else {
            res.send({ status: "No Comments", data: [] });
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ status: "Error", message: error.message });
    }
}



const getUsersPosts = async (req, res) => {
    const {id} = req.body;

    try {
        const results = await Items.find({ownerId: id}); // Fetch all documents in the collection
        //console.log(results)

        if (results.length > 0) {
            res.send({ status: 'ok', data: results }); // Return the data if found
            //console.log("data sent", id); 

        } else {
            res.status(404).json({ message: "No posts found" }); // Handle case where no data exists
        }
    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error message in case of an exception
    }
};

const deletePost = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedPost = await Items.findByIdAndDelete(id);

        if(deletePost){
            res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
        } else{
            return res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




module.exports = {addItem, getItems, item, addComment, getComments, getUsersPosts, deletePost};