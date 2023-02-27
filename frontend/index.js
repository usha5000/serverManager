function create() {
    let data = {
        hallo: "hallo",
    }

    axios.post('/api/create', data).then(response => {
        let res = response.data
        console.log(res)
    })
}