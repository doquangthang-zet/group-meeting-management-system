
export const groupAPI = 'https://sm6y72lnrl.execute-api.ap-southeast-1.amazonaws.com/new_dev/groups'
export const groupAPISpec = 'https://sm6y72lnrl.execute-api.ap-southeast-1.amazonaws.com/new_dev/groups/'
export const groupNUserAPI = ' https://1f4rcj5abe.execute-api.ap-southeast-1.amazonaws.com/dev/groupnuser'
export const groupNUserAPISpec = ' https://1f4rcj5abe.execute-api.ap-southeast-1.amazonaws.com/dev/groupnuser/'
export const notifAPI = 'https://p5acd4z3y4.execute-api.ap-southeast-1.amazonaws.com/dev/request'
export const notifSpecAPI = 'https://p5acd4z3y4.execute-api.ap-southeast-1.amazonaws.com/dev/request/'
export const userAPI = "https://7cgo7g7yy2.execute-api.ap-southeast-1.amazonaws.com/dev/users"
export const userAPISpec = "https://7cgo7g7yy2.execute-api.ap-southeast-1.amazonaws.com/dev/users/"
//--------------CRUD Group------------------//
//Mốt chỉnh lại cái lambda function đẻ thêm date với giờ vào nữa 
// const fetchGroupData = () => {
//     fetch(groupAPI)
//     .then((res) => {return(res.json())})
// }

const createGroup = (data) => {
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

//-------------Notifications-----------------
const createRequest = (data) => {
    fetch(notifAPI, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

const deleteRequest = (id) => {
    fetch(notifSpecAPI + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        // window.location.reload()
    })
}

const updateRequest = (data) => {
    fetch(notifSpecAPI, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

//----------------------------User---------------------//
const getUserbyId = async (id) =>{
    return await fetch(userAPISpec + id).then((res) => {
        return res.json();
    }).then((resp) => {
        return resp
    })}

//Get all Users
const getAllUser = () => {
    return fetch(userAPI).then((res) => {
        return res.json();
    }).then((resp) => {
        return resp
    })
}

const updateUser = async (data) => {
    fetch(userAPI, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}
export {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupbyId,
    createGroupNUser,
    deleteGroupNUser,
    createRequest,
    deleteRequest,
    updateRequest,
    getUserbyId,
    getAllGroupNUser,
    getAllUser,
    updateUser,
}