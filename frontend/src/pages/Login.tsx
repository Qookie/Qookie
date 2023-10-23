import {
  signInWithRedirect,
  GoogleAuthProvider,
  OAuthProvider,
  getRedirectResult,
} from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useEffect } from "react"
import axios from "axios"


const Login = () => {
  const googleLogin = () => {
    signInWithRedirect(auth, new GoogleAuthProvider())
    console.log("googlelogin")
  }
  const kakaoLogin = () => {
    const provider = new OAuthProvider("oidc.kakao")
    signInWithRedirect(auth, provider)
    console.log("kakaologin")
  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((res) => {
				if (res === null) {
					return
				}
        console.log("RES", res)
				// save user information from firebase into localstorage
				localStorage.setItem("userInfo", JSON.stringify(res.user))
				// send accessToken & userInfo to backend
				axios.post("http://localhost:8000/api/member/login",
				{
					displayName: res.user.providerData[0].displayName,
					email: res.user.providerData[0].email,
					uid: res.user.uid
				},
				{
					headers: {
						Authorization: "Bearer " + res.user.accessToken
					}
				})
					.then((res) => {
						console.log("loginres: ", res)
					})
					.catch((err)=>console.log(err))
      })
      .catch((err) => {
        console.log("ERR", err)
      })
  })

  return (
    <>
      <img src="/google.png" alt="googleLogin" onClick={googleLogin} />
      <img src="/kakao.png" alt="kakaoLogin" onClick={kakaoLogin} />
    </>
  )
}

export default Login
