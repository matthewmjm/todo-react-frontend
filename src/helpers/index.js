const todosUrl = "http://localhost:4000/todos/"

export function patchTodo(updatedTodo){
    
    fetch(todosUrl + updatedTodo.id, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todo: updatedTodo})
    })
}

export function postTodo(newTodo){

    fetch(todosUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todo: newTodo})
    })
}


export function deleteTodo(id) {
    fetch(todosUrl + id, {method: "DELETE"})
}