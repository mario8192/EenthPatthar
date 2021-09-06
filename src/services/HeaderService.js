const tokenHeader = () => {
    return ({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-access-token': localStorage.getItem('token') || null
    })
}

export {tokenHeader}