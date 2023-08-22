export default defineEventHandler(async(event) => {
try {
    setCookie(event, 'session', null)
    return {status : 200, message: 'Signed Out Successfully'}
}catch (e) {
    return {status : 400, error: 'Something Has Gone Wrong'}
}
})