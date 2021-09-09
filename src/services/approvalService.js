import { tokenHeader } from "./HeaderService"

const approveAll =(advertisements) => {
    advertisements.advertisements.map(property => {
        return fetch( process.env.REACT_APP_SERVER_URL + "/approve?id=" + property._id + "&approval=" + true, {
            method: "PUT",
            headers: tokenHeader()
        })
    })
    window.location.reload()
}

export default approveAll