
export default async () => {
    return await fetch('http://localhost:3000/api/rooms/', {
        method:'POST'
    }).then(response => response.json());
}