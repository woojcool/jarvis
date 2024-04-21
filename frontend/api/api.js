const localHost = 'http://127.0.0.1:5000'
const host = localHost;
const tempUserID = "662446b523ac0ad41cd0945c";

export async function check() {
    try {
        const response = await fetch(`${host}/test`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return {
            status: 200
        }

    } catch (error) {
        console.error('FETCH API ERROR:\n', error);
        return {
            status: 500,
        }
    }
}

export async function getPriorityTasks() {

}

export async function createTask(name, userID = tempUserID) {
    try {
        const response = await fetch(`${host}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userID
            },
            body: JSON.stringify({ name: name })

        });
        if (!response.ok) {
            // Handle HTTP errors based on response status
            if (response.status === 404) {
                return { status: 404, error: "User not found" };
            }
            return { status: response.status, error: "Request failed" };
        }
        const data = await response.json();
        return {
            status: 201,
            data: data
        };

    } catch (error) {
        return {
            status: 500,
            error: error.message
        }
    }
}


export async function completeTask() {

}

export async function deleteTask() {

}
