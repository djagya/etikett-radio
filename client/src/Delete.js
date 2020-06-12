import { useAlert } from 'react-alert';

export default function Delete(checkedIDs, route) {
    const alert = useAlert()

    checkedIDs.map(id => {
        const deleteData = async (url) => {
            const response = await fetch(url, {
                method: "DELETE",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
            })
            return response.json()
        }
        deleteData(`http://localhost:3000/${route}/${id}`)
            .then(data => {
                // data.success ? console.log("Deleted Data") : console.log(data)
                if (data.success) {
                    alert.success('Data has been deleted.');
                } else {
                    alert.error('Something is not right. Please try again later');
                }
            })

    })
}
