export async function GET() {
    console.log("Testing")
    return Response.json({
        name: 'Thunder'
    })
}