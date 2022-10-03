const Laptops = require('../model/laptops')

// here we create our laptops, using the postlaptop controllers, this involves verifications
const postLaptop = async(req, res)=>{
    try {
        if(req.user.id){
            const laptop = new Laptops({...req.body, userId: req.user.id})
            const savedLaptop = await laptop.save()
            res.status(200).json(savedLaptop)
        }else{
            return res.status(400).json("you can't create a post, you are not verified")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

// here we make a request to get all laptop. this does not involve verification
const getLaptopAll = async(req, res)=>{
    const latest = req.query.latest;
    const categories = req.query.categories;
    let laptop;
    try {
        // using conditional statement, we want to fetch the latest laptop
        if(latest){
            laptop = await Laptops.find().sort({createdAt: -1}).limit(6)
        }
        //  using condition statement, we want to fetch a particular category of laptop
        else if(categories){
            laptop = await Laptops.find({
                category: {$in: [categories]}
            })
        }
        //  here we can fetch all the laptops
        else{
            laptop = await Laptops.find().sort({createdAt: -1})
        }

        // here, we return any of the above query
        res.status(200).json(laptop)
    } catch (error) {
        res.status(400).json(error)
    }
}


// here, we get a particular laptop so we can show the details
const getSpec = async(req, res)=>{
    const laptopId = req.params.id
    try {
        const laptop = await Laptops.findById(laptopId)
        res.status(200).json(laptop)
    } catch (error) {
        res.status(400).json(error)
    }
}

// here we make use of put request to update anything needed in the laptop.
const updateLaptop = async(req, res)=>{
    const laptopId = req.params.id;
    try {
        const laptop = await Laptops.findById(laptopId)
        if(req.user.id === laptop.userId){
            const updatedlaptop = await Laptops.findByIdAndUpdate(laptopId, req.body, {new: true})
            res.status(400).json(updatedlaptop)
        }else{
            res.status(400).json("you can only update the laptop you posted")
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

// here we delete laptop that we posted here
const deleteLaptop = async(req, res)=>{
    const laptopId = req.params.id
    const laptop = await Laptops.findById(laptopId)
    try {
        if(req.user.id === laptop.userId){
            await Laptops.findByIdAndDelete(laptopId)
            res.status(200).json("you have successfully deleted the laptop!!!")
        }else{
            res.status(400).json("you can only delete the laptop you posted!!!")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {deleteLaptop, updateLaptop, getLaptopAll, getSpec, postLaptop }