const express = require('express')
const app = express()
const port = 300
const web=require('./routes/web')
const connectDb=require('./Connectdb/connectdb')
const cookieParser=require('cookie-parser')



//file upload
const fileupload=require('express-fileupload')

//file upload
app.use(fileupload({useTempFiles:true}))
app.use(express.urlencoded({ extended: false }));

//connect flash and express session
const session = require('express-session')
const flash = require('connect-flash');

//token get
app.use(cookieParser());

//connect db fuc.
connectDb()
//message
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: flash,
  saveUninitialized: flash

}))
//flash message
app.use(flash())
//views
app.set("view engine", "ejs");
//css include
app.use(express.static("public"));
//route
app.use("/",web)
//server
app.listen(port, () => {
  console.log(`Started  on port ${port}`)
})