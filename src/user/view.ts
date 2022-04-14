import  express, { Router } from 'express';
import { Controller } from "./controller"

export class UserView {
    router: Router
    constructor() {
        this.router = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        let controller = new Controller()
        this.router.post("/create", controller.CreateUser)
        this.router.post("/get/:id", controller.GetUser)
    }
}
