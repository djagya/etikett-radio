export default function Delete(checkedIDs, route) {

    checkedIDs.map(id => {
        const deleteData = async (url) => {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWNmODU2MzZiMzg2ZTFkYmM3MjNkMDEiLCJpYXQiOjE1OTA2NTg0MDN9.3EV5TvniP9UCJ1eOZ3ebnrZmH39YWp3PGYSWTAMegro"
                },
            })
            return response.json()
        }
        deleteData(`http://localhost:3000/${route}/${id}`)
            .then(data => { data.success ? console.log("Deleted Data") : console.log(data)
            })

    })
}
