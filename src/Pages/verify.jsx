// import React from 'react'

import { useNavigate, useSearchParams } from "react-router-dom"
import { account } from "../appwrite/config"

function Verify() {
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const secret = params.get("secret")
  const id = params.get("userId")
  // console.log(secret)
  // console.log(id)



  const updateVerifaction = async () => {
    try {
      const updateV = await account.updateVerification(id, secret);
      alert(updateV + "Email Verify Seccussfully .")
      // setTimeout(()=>{
        navigate("/login");
      // })
    }
    catch (error) {
      console.log(error)
    }
  }
  updateVerifaction();



  // const Logout = async () => {
  //   try {
  //     let deleteSession = await account.deleteSession("current");
  //     console.log(deleteSession);
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  return (
    <div>
      <h1>email verifyed .</h1>
      {/* <button onClick={Logout}> Go to Login </button> */}
    </div>
  )
}

export default Verify
