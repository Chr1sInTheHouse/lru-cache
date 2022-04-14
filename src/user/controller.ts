import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { LRUCache } from "../lru_cache"

export class Controller {
    private cache: LRUCache<Number, String>
    constructor() {
        this.cache = new LRUCache<Number, String>(3)
    }

    async CreateUser(req: Request, res: Response, next: NextFunction) {
        console.log("Inserting a new user into the database...")
        let user = new User()
        user.name = req.body.name
        AppDataSource.manager.save(user)
        this.cache.set(user.id, user.name)
        console.log("Saved a user with id: " + user.id)

    }


    async GetUser(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id)
        console.log("Loading users from the cache...")
        let userFromCache = this.cache.get(id)
        if(userFromCache != undefined){
            console.log("Loaded user from cache: ", userFromCache)
    
            res.set('Content-Type', 'text/html')
            res.send(JSON.stringify(userFromCache))
        }
        else {
            console.log("Loading users from the database...")
            const user = await AppDataSource.manager.findOneBy(User, {
                id: Number(req.params.id),
            }) 
            console.log("Loaded user: ", user)

            res.set('Content-Type', 'text/html')
            res.send(JSON.stringify(user?.name))
        }

    }
}
