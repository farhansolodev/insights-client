import { useState } from "react";
import {
    // useHistory,
    Link
} from "react-router-dom";
import { db, auth } from "../firebase";
import {
    doc, setDoc,
    // getDocs, collection, where, query
} from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { v4 as uuidv4 } from 'uuid';
import { onError } from "../utils"
import styles from './auth.module.css';

async function postUser({uid, email, username, pfp}){
    try{
        const data = {
            email,
            username,
            pfp,
            previousCollabs: [],
            publishedCollabs: [],
            previousRooms: [],
            previousCommunities: [],
        }
        setDoc(doc(db, "users", uid), data)
        // localStorage.setItem("pw", password)
    } catch(e) {
        throw e
    }
}

const uploadPic = (e,cb) => {
    // console.log('button to upload clicked')
    const file = e.target.files[0]
    const reader = new FileReader(); 
    reader.onload = () => {
        // console.log('file value: ', file)
        if(reader.readyState === 2){
            cb(reader.result);
            //// console.log(reader.result)
        }
        reader.abort()
    }
    file && reader.readAsDataURL(file);
}

// const errorCodes = {
//     match: "auth/password-mismatch",
// }

const SignUp = ({ history }) => {
    // const [fName, setFName] = useState('');
    // const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    // const [confirm, setConfirmPassword] = useState('');
    const [error, setError] = useState({code: "", msg: ""});
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [pfp, setPfp] = useState(require("../assets/default.images").default.user);
    // const [bio, setBio] = useState('');

    // const [PasswordDiff, setPasswordDiff] = useState();
    // const history = useHistory();

    // async function checkUser() {
    //     const q = query(collection(db, "users"), where("username", "==", username));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         doc.data()
    //         // console.log(doc.data())
    //         return doc.data()
    //     });
    //     // // console.log("E1", existingUser)
    //     return null
    // }

    function checkPasswordMatch() {
        if (password === confirmedPassword) return
        // eslint-disable-next-line no-throw-literal
        throw { code: "auth/password-mismatch" }
    }

    function checkFieldsEmpty() {
        if (email && username && password) return
        // eslint-disable-next-line no-throw-literal
        throw { code: "auth/empty-fields" }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            checkFieldsEmpty()
            checkPasswordMatch()
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            const uid = user.uid
            postUser({ uid, username, email, pfp });
            console.clear()
            history.push("/app")
        } catch (e) {
            // console.log(e.code || e)
            onError(e, setError)
        }

    }

    const keyPressHandler = (e) => { 
        e.key === "Enter" && handleSubmit(e);
    }

    return ( 
        // If session exists, redirect to /app, else continue
        <div className={styles["container"]}>
            <div className={styles["form"]}>
                <div className={styles["header"]}><h1>Create an account</h1></div>
                <div className={styles["errorHandle"]}>{error.msg}</div>
                {/* <div className={styles["form_group"]}> */}
                    {/* <div className={styles["header"]}><h1>Create an account</h1></div> */}
                    {/* <label htmlFor="First Name">Name</label>
                    <input type="text" name="firstname" placeholder="First Name" onChange={(e) => setFName(e.target.value)} className={styles["name_textBox"]}></input>
                    
                    <input type="text" name="lastname" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} className={styles["name_textBox"]}></input> */}
                {/* </div> */}
                <div className={styles["form_group"]}>
                    Email
                    <br />
                    <input onKeyPress={keyPressHandler} type="email" name="email" placeholder="Enter an e-mail" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className={styles["form_group"]}>
                    Username
                    <br />
                    <input onKeyPress={keyPressHandler} type="username" name="username" placeholder="Enter a username" onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className={styles["form_group"]}>
                    Password
                    <br />
                    <input onKeyPress={keyPressHandler} type="password" name="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className={styles["form_group"]}>
                    Confirm Password
                    <br />
                    <input onKeyPress={keyPressHandler} type="password" name="confirm-password" placeholder="Confirm your password" onChange={(e) => {
                        // setErrors((prev) => prev.filter(msg => msg !== errorCodes.match))
                        if (e.target.value === password || e.target.value === '' || error.code === "auth/password-mismatch") setError('')
                        setConfirmedPassword(e.target.value)
                    }}></input>
                </div>
                <div className={styles["form_group"]}>
                <div className={styles["pfp"]}>
                    <p>
                        Add profile picture
                    </p>
                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={(e) => uploadPic(e,setPfp)}></input>
                    {/* need to add the functionallity for uploading poic ture will do later after finishing the resty of the work */}

                </div>
                </div>
                {/* <div className={styles["form_group"]}>
                    Add Biography
                    <br />
                    <input type="text" name="bio" placeholder="Bio..." value={bio} onChange={(e) => setBio(e.target.value)}></input>
                </div> */}
                <div className={styles["footer"]}>
                    <div className={styles["msg"]}>Already have an account?</div>
                    <br />
                    <Link to="/login" className={styles["links2"]}>Log in</Link>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]}>Sign up</button>
                </div>
            </div>
        </div>
     );
}
 
export default SignUp;