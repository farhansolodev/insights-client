import { useState } from "react";
import { Link } from "react-router-dom";
import {
    // db,
    auth
} from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth'
// import { collection, getDocs, query, where } from "firebase/firestore";
import { onError } from "../utils"
import styles from './auth.module.css';

const Login = ({ history }) => {
    // const [denied, setDenied] = useState(false);
    const [error, setError] = useState({code: "", msg: ""});
    const [info, setInfo] = useState({
        email: "",
        password: ""
    });

    // console.log(info)

    const handleInputChange = (event) => {
        if(error.code) setError({code: "", msg: ""})
        const name = event.target.name;
        const value = event.target.value;
        setInfo({...info, [name] : value})
    }

    function checkFieldsEmpty() {
        if (info.email && info.password) return
        // eslint-disable-next-line no-throw-literal
        throw { code: "auth/empty-fields" }
    }

    async function handleSubmit(e){
        e.preventDefault()

        try {
            checkFieldsEmpty()
            await signInWithEmailAndPassword(auth, info.email, info.password)
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
        <div className={styles["container"]}>
            <div className={styles["form"]}>
                <div className={styles["header"]}><h1>Login</h1></div>
                <div className={styles["errorHandle"]}>{error.msg}</div>
                <div className={styles["form_group"]}>
                    <label htmlFor="Email">E-mail</label>
                    <input onKeyPress={keyPressHandler} onChange={handleInputChange} type="email" name="email" placeholder="Enter your e-mail address"></input>
                </div>
                <div className={styles["form_group"]}>
                    <label htmlFor="Password">Password</label>
                    <input onKeyPress={keyPressHandler} onChange={handleInputChange} type="password" name="password" placeholder="Enter your password"></input>
                </div>
                <div className={styles["footer"]}>
                    <Link to="/signup" className={styles["links"]}>Create an account?</Link>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]}>Login</button>
                </div>
            </div>
        </div>
     );
}
 
export default Login;
