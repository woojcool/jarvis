const localHost = 'http://127.0.0.1:5000'
const host = localHost;

async function api(method, path, token, body) {
    const options = { method }
    if (token) options.headers = { 'Authorization': token }
    if (body) options.body = JSON.stringify(body)
    const res = await fetch(`${host}${path}`, options)
    if (res.body == null) return null
    const json = await res.json()
    return json
}

async function check() {
    try {
        const response = await fetch(`${host}/test`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('API Connection Success')

    } catch (error) {
        console.error('FETCH API ERROR:\n', error);
    }
}

const auth = {
    // returns { error: '...' } or { token: '...' }
    async register(username, password) {
        return api('POST', '/auth/register', null, { username, password })
    },

    // returns { error: '...' } or null
    async deleteAccount(username, password) {
        return api('DELETE', '/auth/delete', null, { username, password })
    },

    // returns { error: '...' } or { token: '...' }
    async login(username, password) {
        return api('POST', '/auth/login', null, { username, password })
    },

    // returns null
    async logout(token) {
        return api('POST', '/auth/logout', token)
    },
}

const habits = {

}

const tasks = {

}

export { auth, habits, tasks, check };
