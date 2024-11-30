export async function POST(request: Request) {
    const res: any = await request.json();
    return Response.json({ res })
}
