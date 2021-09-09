import { useState, useEffect } from 'react'
import { tokenHeader } from './HeaderService'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: tokenHeader()
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