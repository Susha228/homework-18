const inpname = document.querySelector('.Name')
const inpage = document.querySelector('.Age')
const inpcity = document.querySelector('.City')
const inpid = document.querySelector('.Id')
const inpsearchbycity = document.querySelector('.input')
const add = document.querySelector('.Add')
const list = document.querySelector('ul')
const deletebtn = document.querySelector('.Delete')


const getDatafunction = async url => {
    const getData = async url => {
        const res = await fetch(url)
        const json = await res.json()
        return json
    }

    try {
        const data = await getData(url)
        console.log(data)
        return data
    }

    catch (error) {
        console.log(error.message)
    }
}

window.addEventListener("load", async () => {
    let USERS = await getDatafunction('http://localhost:3000/getUsers')
    list.innerHTML = ""
    USERS.forEach(el => {
        list.insertAdjacentHTML(
            `beforeend`,
            `<li class = "user">Name: ${el.name}, Age: ${el.age}, City: ${el.city}</li>`
        )
    });
})


const postDatafunction = async url => {
    const postData = async (url, obj) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        const text = await res.text()
        return text
    }

    try {
        let name = inpname.value
        let city = inpcity.value
        let age = inpage.value
        let obj = { name: name, age: age, city: city }
        const data = await postData(url, obj)
        return data
    }
    catch (error) {
        console.log(error.message)
    }
}

const deleteDatafunction = async (id) => {
    try {
       await fetch(`http://localhost:3000/deleteUser/${id}`, {method: 'DELETE'})
    }
    catch (error) {
        console.log(error.message)
    }
}

const SearchDatafunction = async (city) => {
    try {
        const res = await fetch(`http://localhost:3000/SearchByCity/${city}`, { method: 'GET' });
        const json = res.json()
        return json
    }
    catch (error) {
        console.log(error.message)
    }
}

add.addEventListener('click', async () => {
    await postDatafunction('http://localhost:3000/addUser')
})

deletebtn.addEventListener('click', async () => {
    await deleteDatafunction(inpid.value)
})

window.addEventListener('click', async () => {
    if (inpsearchbycity.value == '') {
        console.log('Empty')
    }
    else {
        const SortUsers = await SearchDatafunction(inpsearchbycity.value);
        list.innerHTML = ""
        console.log(SortUsers)
        SortUsers.forEach(el => {
            list.insertAdjacentHTML(
                `beforeend`,
                `<li class = "user">Name: ${el.name}, Age: ${el.age}, City: ${el.city}</li>`
            )
        });
    }
})

