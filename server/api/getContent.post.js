export default defineEventHandler(async (event) => {
    const { url } = await readBody(event);

    try {
        const response = await fetch(url);
        return { status: 200, data: await response.text() };
    } catch (error) {
        return { status: 404, data: "Content not found" };
    }
});