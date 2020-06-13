
export default function Delete(checkedIDs, route) {

    // checkedIDs.map(id => {
    //     const deleteData = async (url) => {
    //         const response = await fetch(url, {
    //             method: "DELETE",
    //             credentials: "include",
    //             headers: {"Content-Type": "application/json"},
    //         })
    //         return response.json()
    //     }
    //     deleteData(`http://localhost:3000/${route}/${id}`)
    //         .then(data => {
    //             // data.success ? console.log("Deleted Data") : console.log(data)
    //             if (data.success) {
    //                 alert.success('Data has been deleted.');
    //             } else {
    //                 alert.error('Something went wrong... Please try again later');
    //             }
    //         })
    // })

    // Options
    const options = {
        method: 'DELETE',
        credentials: 'include',
        headers: {"Content-Type": "application/json"}
    }

    const getEachResponse = () => {
        let responseArray = [];

        checkedIDs.forEach(id => {
            fetch(`http://localhost:3000/${route}/${id}`, options)
                .then(res => res.json())
                .then(data => responseArray.push(data.success))
                .catch(error => responseArray.push(error))
        })
        console.log(responseArray)
        return responseArray
    }
    console.log('getEachResponse: ', getEachResponse())
}
