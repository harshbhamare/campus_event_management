import db from "../models/db.js";

export const homeRouter = async (req, res) => {
    try {
        res.render("home")
        
    } catch (error) {
        console.log(error)
        
    }

}