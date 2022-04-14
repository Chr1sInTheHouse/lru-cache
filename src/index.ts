import { AppDataSource } from "./data-source"
import express, { Express, Request, Response } from "express"
// import dotenv from "dotenv"
import { UserView } from "./user/view"

// dotenv.config()

AppDataSource.initialize().then(async () => {

    const app: Express = express()
    const port = 8001
    
    const userView = new UserView
    app.use("/user", userView.router)
      
    app.listen(port, () => {
        console.log("⚡️[server]: Server is running at https://localhost:8001")
    })


}).catch(error => console.log(error))
