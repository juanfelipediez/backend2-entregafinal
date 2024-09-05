import express from "express"
import handlebars from "express-handlebars"
import Handlebars from "handlebars"
import __dirname from "./dirname.js"
import viewsRoutes from "./routes/views.router.js"
import mongoose from 'mongoose';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import initializePassport from "./config/passport.config.js"
import passport from 'passport'
import routes from "./routes/index.js"
import {config} from "./config/config.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//const userName = 'juanfelipediez'
//const password = 'Felipe10'
//const dbName = 'base'

app.use(cookieParser());
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/backend2-entregaFinal",
      ttl: 15,
    }),
  })
);
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect("mongodb://localhost:27017/backend2-entregaFinal")
    .then(() => {
        console.log('DB connected!')
    })
    .catch((error) => {
        console.log(error)
    })

app.engine("handlebars", handlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname+"/public"))

app.use("/api", routes)
app.use('/', viewsRoutes)

const httpServer = app.listen(config.PORT, () => {
    console.log(`Server is running on port http://localhost:${config.PORT}`);
})

