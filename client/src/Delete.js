export default function Delete(checkedIDs, route) {

    checkedIDs.map(id => {
        const deleteData = async (url) => {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIwMTkyMjI0MzAzZDJmNTAyM2FiM2EiLCJpYXQiOjE1ODg1OTkwNzR9.u3oGxeRLOMgILOwWG1VsuJWCEAtkz4G1EbYSQgE5ObY"
                },
            })
            return response.json()
        }
        deleteData(`http://localhost:3000/${route}/${id}`)
            .then(data => {
                if (!data.success) console.log(data)
            })

    })
}
