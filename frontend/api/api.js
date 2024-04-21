const localHost = 'http://127.0.0.1:5000'
const host = localHost;

export async function check() {
    try {
        const response = await fetch(`${host}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('API Connection Success')

    } catch (error) {
        console.error('FETCH API ERROR:\n', error);
    }
}

