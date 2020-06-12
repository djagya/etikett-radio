export default async function PutData(url, data) {

    const response = await fetch(url, {
        method: "PUT",
        credentials:"include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    return response.json()
}
