const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const isLogged = require("../middlewares/auth");
// const nodemailer = require('nodemailer');

// Authentication routes

// POST "/api/auth/signup" -> User registration with name, email and password
router.post("/signup", async (req, res, next) => {
  const { name, email, password, alergies, attendance } = req.body;

  if (!name || !email || !password || !alergies) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }

  // // check the password strength
  // const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,}$/gm;
  // if (passwordRegex.test(password) === false) {
  //   res.status(400).json({
  //     errorMessage:
  //       "La contraseña tiene que tener almenos 6 caracteres, con al menos un número",
  //   });
  //   return;
  // }

  // check the email structure
  if (!email.includes("@")) {
    res
      .status(400)
      .json({ errorMessage: "Introduce un correo electrónico válido" });
    return;
  }

  try {
    // check if email is already registered
    const userEmail = await User.findOne({ email });
    if (userEmail !== null) {
      res
        .status(400)
        .json({ errorMessage: "Introduce un correo electrónico válido" });
      return;
    }

    // passowrd codification
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name: name,
      email: email,
      password: hashPassword,
      attendance: attendance, 
      alergies: alergies,
    };

    // create new user and send OK message to FE
    await User.create(newUser);
    // await User.create({ ...newUser, cosplayId: null });
    
    res.status(201).json("Usuario registrado con éxito");
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" -> validete user credentials
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    // check if user exist
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Credenciales no validas" });
      return;
    }

    //check if password is valid
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Credenciales no validas" }); // buena practica (privacidad de usuarios) misma respuesta que anterior clausula de guardia
      return;
    }
        

    // info of the user stored in the Token
    const payload = {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      attendance: foundUser.attendance, 
      alergies: foundUser.alergies,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    res.status(200).json({ authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" -> send to FE if the user is already validate
router.get("/verify", isLogged, (req, res, next) => {
  res.status(200).json(req.payload);
});

// // POST "/api/auth/forgot-password"
// router.post('/forgot-password', async (req, res, next) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       const resetToken = jwt.sign({ userId: user._id }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
//       user.resetToken = resetToken;
//       await user.save();

//       // Use nodemailer to send the reset email
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER, // Your email
//           pass: process.env.EMAIL_PASSWORD, // Your email password
//         },
//       });

//       const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: user.email,
//         subject: 'Password Reset',
//         html: `
//         <p>Hello ${user.name},</p>
//         <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
//       `,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           return res.status(500).json('Error sending reset email.');
//         } else {
//           console.log('Email sent: ' + info.response);
//           return res.status(200).json('Reset email sent.');
//         }
//       });
//     } else {
//       return res.status(400).json({ errorMessage: 'User not found.' });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// // POST "/api/auth/reset-password/:token"
// router.post('/reset-password/:token', async (req, res, next) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decodedToken = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
//     const user = await User.findById(decodedToken.userId);

//     if (user) {
//       const salt = await bcrypt.genSalt(8);
//       const hashPassword = await bcrypt.hash(password, salt);

//       user.password = hashPassword;
//       user.resetToken = undefined; // Clear the reset token
//       await user.save();

//       return res.status(200).json('Password reset successful.');
//     }

//     return res.status(400).json({ errorMessage: 'Invalid token.' });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
