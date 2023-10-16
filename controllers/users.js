const {User} = require("../db/models/user");
const { httpError, ctrlWrapper, sendEmail } = require('../helpers');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {v4} = require('uuid');
const path = require("path");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


const {SECRET_KEY, BASE_URL} = process.env;

//------ КОНТРОЛЛЕРИ ДЛЯ РОБОТИ ІЗ КОЛЛЕКЦІЄЮ USERS (для залогіненого юзера) -----------------------------

// поверення поточного користувача
  const getCurrent = async(req, res) => {
    const {id, name, email, avatarURL} = req.user;
    res.status(200).json({id, name, email, avatarURL});
  }

// оновлення даних про поточного користувача (можемо оновити або аватар, або ім'я юзера - user profile window)
  const updateUser  = async(req, res) => {

    let newUserName, newAvatarURL;
    
    const {_id, name: currentUserName} = req.user;                                                  //забираємо поточне ім'я юзера
    const {name} = req.body;                                                                        //забираємо нове ім'я юзера

    if (!name) { newUserName = currentUserName}
    else { newUserName = name};
    
    if (!req.file)                                                                                  // якщо нового файлу аватара немає, то змінемо лише ім'я юзера
      {                                         
        const usr = await User.findByIdAndUpdate(_id, {name: newUserName}, {new: true});            // оновлюємо ім'я поточного юзера   
        res.json({ name: usr.name, avatarURL: usr.avatarURL});   
      }
    else                                                                                            // якщо є новий файл аватара, то закидуємо йього на claudinary, та оновлюємо name і avatatURL юзера
      {
        newAvatarURL = req.file.path;
        const usr = await User.findByIdAndUpdate(_id, {name: newUserName, avatarURL: newAvatarURL}, {new: true}); // оновлюємо поля name та avatarURL для поточного юзера в базі
        res.json({name: usr.name , avatarURL: usr.avatarURL });
      }                
  }

// надсилання листа з повідомленням про підписку на розсилку
  const subscribe = async(req, res) => {
      const {email, name} = req.user;
       
      // створюємо поштове повідомлення
       const EmailAboutSubscription = {
        to: email,
        subject: `Subscription message from ${BASE_URL}`,
        html: ` <h1 style="font-size: 20px"> Hello, ${name}!</h1>
                <p  style="font-size: 16px"> You are subscribed to our newsletters. </p>
                <p  style="font-size: 16px"> You will recieve letters about our news and special offers, etc. </p>
                <p  style="font-size: 16px"> Thank you! </p>

                <p  style="font-size: 14px"> Visit out site! 
                  <a target="_blank" href="https://dimachernyaev.github.io/drinkMaster-Team-1" style="font-size: 20px; font-wight:bolt">Drink Master web-site</a>
                </p>`
      };
      
      // відправляємо на email юзера лист з повіломленням про підписку
      await sendEmail(EmailAboutSubscription);

      res.json( { message: `Subscribtion successful. Letters about subscribtion was sent to your email ${email}` } );

  }

//---------------------------------------------------------------------------------------------------------

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
  subscribe: ctrlWrapper(subscribe),
 // updateAvatar: ctrlWrapper(updateAvatar),
};

