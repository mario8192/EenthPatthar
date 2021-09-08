import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJjZTRjOGNlOC1mZmNkLTQ4NWYtYjZmMC0xOTE2MzU1ZTA5YTEiLCJlbWFpbCI6Im1hbmFzQGdtYWlsLmNvbSIsImlhdCI6MTYzMTAyMzM0NiwiZXhwIjoxNjMxMDI2OTQ2fQ.QqB5C8ekaKWW8otPbMepSEas0nNgkeQdxZZY7x7rKgM"
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            setData(data)
            setIsPending(false)
        })
        .catch(err => {
            setIsPending(false)
            console.log(err)
        })
    }, [url])

    return {data, isPending}
}

export default useFetch