export const fetchLoad = () => fetch('https://cpu-monitoring-backend.herokuapp.com/cpu-load', { method: 'GET' }).then(r => r.json())

