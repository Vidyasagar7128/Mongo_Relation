const User = require('../models/user.js')
const Car = require('../models/car.js')
module.exports = {
    index: async (req,res,next)=>{
      await User.find().then((data)=>{
          res.status(200).json(data)
      }).catch((e)=>{
          console.log(e);
      })
    },
    newUser: async (req,res,next)=>{
        const newUserdata = new User(req.body)
        await newUserdata.save()
        res.send(newUserdata)
    },
    getUser: async (req,res,next)=>{
       const oneuser = await User.findById({_id:req.params.id})
        res.send(oneuser)
    },
    getUserCar: async (req,res,next)=>{
      const userwithCar = await User.findById({_id:req.params.userId},{"cars" : 1,"_id" : 0}).populate('cars').exec((err,data)=>{
          if(!err){
            var objdata = Object.assign(data)
            console.log(typeof objdata);
            res.status(200).json(objdata)
          }
      })
    },
    getUserCarfordelete: async (req,res,next)=>{
        const cardata = req.params.carId;
        console.log(cardata);
        const userwithCar = await User.findByIdAndUpdate({_id:req.params.userId},{$pull:{cars:cardata}}).exec((err,data)=>{
            if(!err){
              console.log('car',data._id);
              res.status(200).json(data.cars)
              var db = data.cars;
          
            }
        })
      },
    postUserCar: async (req,res,next)=>{

        const newCar = new Car(req.body)
        console.log('NewCar', newCar);
        //get user
        const user = await User.findById({_id:req.params.userId})
        newCar.seller = user
        //save car
        await newCar.save();
        //add car to user's collection
          user.cars.push(newCar)
        //save User
        await user.save()
        res.status(200).json(newCar)
    },
    shoCars: async  (req,res,next)=>{
        console.log("car");
       const cardata =  await Car.find().exec((err,data)=>{
           if(!err){
               res.status(200).json(data)
           }
       })

     },
     deleteCar: async (req,res,next)=>{
        const usr = await Car.findByIdAndDelete({_id:req.params.id})
     },
     delcar: async (req,res,next)=>{
         const id = req.body.id;
         console.log(`id From : ${id}`);

     }



}
