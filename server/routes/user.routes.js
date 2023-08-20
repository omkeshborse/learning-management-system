import { Router } from "express";
import  {register , login , logout , getProfile} from '../controllers/user.controllers.js'

/* this is main default  export than why i can able  import with different name(userRoutes) in app.js */
const router = Router() ;
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", getProfile);





export default router ;