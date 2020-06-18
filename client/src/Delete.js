export default async function Delete(checkedIDs, route) {

    // Options
    const options = {
        method: 'DELETE',
        credentials: 'include',
        headers: {"Content-Type": "application/json"}
    }
    // Get each response
    const getEachResponse = async () => {
        let responseArray = await Promise.all(checkedIDs.map( async (id) => {
            const response = await fetch(`/${route}/${id}`, options)
            const data = await response.json();
            return await data.success
        }))
        return await responseArray
    }

    // Make sure all responses succeeded 
    const output = await getEachResponse().then(responseArray => {
        let output;
        const verifyRes = responseArray.filter(data => data === true);
        verifyRes.length === checkedIDs.length ? output = true : output = false;
        return output
    })
    return output
}

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
