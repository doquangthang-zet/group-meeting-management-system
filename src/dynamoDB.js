
const groupAPI = 'https://sm6y72lnrl.execute-api.ap-southeast-1.amazonaws.com/new_dev/groups'
const groupAPISpec = 'https://sm6y72lnrl.execute-api.ap-southeast-1.amazonaws.com/new_dev/groups/'
const groupNUserAPI = ' https://1f4rcj5abe.execute-api.ap-southeast-1.amazonaws.com/dev/groupnuser'
const groupNUserAPISpec = ' https://1f4rcj5abe.execute-api.ap-southeast-1.amazonaws.com/dev/groupnuser/'
const userAPI = "https://7cgo7g7yy2.execute-api.ap-southeast-1.amazonaws.com/dev/users"
const userAPISpec = "https://7cgo7g7yy2.execute-api.ap-southeast-1.amazonaws.com/dev/users/"
//--------------CRUD Group------------------//
//Mốt chỉnh lại cái lambda function đẻ thêm date với giờ vào nữa 
const createGroup = async (data) => {
    fetch(groupAPI, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
}

const updateGroup = (data) => {
    fetch(groupAPI, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

const deleteGroup = (id) => {
    fetch(groupAPISpec + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        window.location.reload()
    })
}

const getGroupbyId = (id) => {
    return fetch(groupAPISpec + id).then((res) => {
        return res.json();
    }).then((resp) => {
        return resp
    })
}

//------------------CRUD GroupNUser--------------------//
// Join a group
const createGroupNUser = async (data) => {
    fetch(groupNUserAPI, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
}


//Leave a group
const deleteGroupNUser = (id) => {
    fetch(groupNUserAPISpec + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        window.location.reload()
    })
}

//Get all groupNUser
const getAllGroupNUser = () => {
    return fetch(groupNUserAPI).then((res) => {
        return res.json();
    }).then((resp) => {
        return resp
    })
}


export {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupbyId,
    createGroupNUser,
    deleteGroupNUser,
    getAllGroupNUser,
}