import React from "react";
import "./SignUp.css";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = (props) => {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   });

   const [errors, setErrors] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   });

   const [signUpMessage, setSignUpMessage] = useState('')
   const [signUpDone, setSignUpDone] = useState(false)


   const validate = () => {
      let validationErrors = {
         username: false,
         email: false,
         password: false,
         confirmPassword: false

      }
      /*User Name*/
      if (formData.username.trim().length < 4) {
         validationErrors.username = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors,
               username: "Polę imie musi zawierać minimum 4 znak"
            }
         });
      } else if (!/^[^\s]*$/.test(formData.username.trim())) {
         validationErrors = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors,
               username: "Polę imie nie może zawierac spacji"
            }
         });
      }

      else {
         validationErrors.username = false;
         setErrors((prevErrors) => {
            return {
               ...prevErrors, username: "",
            };
         });
      }

      /*Email*/
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
         validationErrors.email = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors, email: "Nie poprawny adres E mail",
            };
         });
      } else {
         validationErrors = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors, email: "",
            };
         });
      }

      /*Password valiadation */
      if (formData.password.trim().length < 6) {
         validationErrors = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors,
               password: "Hasło musi zawierać minimum 6 znaków"
            }
         });
      } else if (!/^[^\s]*$/.test(formData.password.trim())) {
         validationErrors = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors,
               password: "Hasło nie może zawierac spacji"
            }
         });
      } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {

         validationErrors = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors,
               password: "Hasło musi zawierać jeden zaznaków specjalnych  ! @ # $ %"
            }
         });
      } else {
         validationErrors = false;
         setErrors((prevErrors) => {
            return {
               ...prevErrors,
               password: ""
            };
         });

      }

      /** Validacja powtórzenia hasła */
      if (formData.password.trim() !== formData.confirmPassword.trim()){
         validationErrors = true;
         setErrors((prevErrors) => {
            return {
               ...prevErrors,
               confirmPassword: "Hasła nie są takie same"
            }
         });
      } else {
        validationErrors = true;
        setErrors((prevErrors) => {
           return {
              ...prevErrors, confirmPassword: "",
            
           };
        });
      }

      return (
         !validationErrors.username &&
         !validationErrors.email &&
         !validationErrors.password &&
         !validationErrors.confirmPassword

      )

   }



   const handleInputChange = (e) => {
      const target = e.target;
      const name = target.name;

      setFormData({
         ...formData,
         [name]: target.value,
      });


   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) {
         return;
      }
      e.preventDefault();
      axios
          .post("https://akademia108.pl/api/social-app/user/signup", {
              username: formData.username,
              email: formData.email,
              password: formData.password
          })
          .then((res) => {
            console.log(res.data)

            let resData =res.data;
            if(resData.signedup){
               setSignUpMessage("Konto stworzone")
               setSignUpDone(true)
            }else{
               if(resData.message.username){
                  setSignUpMessage(resData.message.username[0])
               }else if(resData.message.email){
                  setSignUpMessage(resData.message.email[0])
               }
            }
                      })
          .catch((error) => {
              console.log(error)
          })
   }
   return (
      <div className="signUp">
         {props.user && <Navigate to="/" />}
         <form onSubmit={handleSubmit}>
            {signUpMessage && <h2>{signUpMessage}</h2>}
            <input type="text" name="username" placeholder="User Name" onChange={handleInputChange} />
            {errors.username && <p>{errors.username}</p>}

            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
            {errors.email && <p>{errors.email}</p>}

            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
            {errors.password && <p>{errors.password}</p>}

            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button className="btn" disabled={signUpDone}>Sign Up</button>


            {signUpDone && <div>
               <Link to="/login" className="btn">Zaloguj Się</Link>
               </div>}
         </form>




      </div>


   );
}
export default SignUp;