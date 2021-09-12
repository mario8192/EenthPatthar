import { tokenHeader } from "./HeaderService";

export default async function displayRazorpay() {

    const data = await fetch(process.env.REACT_APP_SERVER_URL + "/razorpay", {
      method: "POST",
    }).then((t) => t.json());
    console.log()
    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID_TEST,
        currency: data.currency,
        amount: data.amount,
        name: "EenthPatthar & Co",
        description: "Wallet Transaction",
        image: process.env.REACT_APP_SERVER_URL + "/logo.jpg",
        order_id: data.id,
        handler: async function (response) {
            try{
                const paymentID = response.razorpay_payment_id
                alert("PAYMENT SUCCESSFULL")
                const captureObj = await fetch(process.env.REACT_APP_SERVER_URL+"/capture?id=" + paymentID, {
                    method: "POST"
                }).then((d) => d.json())
                const paymentData = JSON.parse(captureObj)
                // const subscriberData = await fetch(process.env.REACT_APP_SERVER_URL + "/subscription", {
                //     method: "POST",
                //     body: {
                //         payment_type: paymentData.method,
                //         amount: paymentData.amount,
                //         payment_details: {
                //             card_number: paymentData.card_id,
                //             VPA: paymentData.vpa
                //         }
                //     },
                //     headers: tokenHeader()
                // }).then(resp => resp.json())
                console.log(paymentData)
            }
            catch{
                alert("PAYMENT FAILED...") 
            }   
        },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}