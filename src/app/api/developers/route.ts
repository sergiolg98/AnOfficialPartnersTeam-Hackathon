export async function POST(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await request.json();
    return Response.json({ res })
}
