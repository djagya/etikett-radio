export default async function PatchData(url, data) {

    const response = await fetch(url, {
        method: "PATCH",
        credentials:"include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    return response.json()
}
