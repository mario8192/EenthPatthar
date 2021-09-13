import { tokenHeader } from "./HeaderService"

export default async function updateLists(ad, user){
    console.log("updateLists has been started")
    try{
      if(ad && user){
        if(!ad.interested.includes(user.id)){
          fetch(`${process.env.REACT_APP_SERVER_URL}/addinterestedbuyer?id=${ad._id}` , {
            method: "POST",
            headers: tokenHeader(),
          }).then(res => {
            alert(`The seller has been send your information`)
            console.log(res)
          })
          window.location.reload()
        } else {
          alert(`The seller is already been contacted`)
        }
      }
    } catch(err) {
      console.log(err)
    }
    console.log("updateLists has been ended")
}