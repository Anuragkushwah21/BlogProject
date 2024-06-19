const ContactModel=require("../models/contact")

class ContactController{
    static SendMessage = async (req, res) => {
        try {
            // console.log('data')
            const {name,email,phone,message}=req.body
            const contact=await ContactModel({
                name:name,
                email:email,
                phone:phone,
                message:message,
            })
            console.log(contact)
            await contact.save()
          res.render("contact",{name:name});
        } catch (error) {
          console.log(error);
        }
      };
// message display
      static MessageQuiry = async (req, res) => {
        try {
          const { name } = req.Userdata;
            const contact = await ContactModel.find();
            console.log(contact)
          res.render("admin/message/message_quiry",{m:contact,name:name});
        } catch (error) {
          console.log(error);
        }
      };
      static MessageView = async (req, res) => {
        try {
          // console.log(req.params.id)
          const { name } = req.Userdata;
          const contact = await ContactModel.findById(req.params.id);
          // console.log(result)
    
          res.render("admin/message/message_view", { m: contact ,name:name});
        } catch (error) {
          console.log(error);
        }
      };
      static MessageDelete = async (req, res) => {
        try {
            const contact =await ContactModel.findById(req.params.id)
            await ContactModel.findByIdAndDelete(req.params.id)
            res.redirect("/admin/message/message_quiry")
        } catch (error) {
          console.log(error);
        }
      };
}

module.exports=ContactController