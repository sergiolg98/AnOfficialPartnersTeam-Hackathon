export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    
    const slug = (await params).id // 'a', 'b', or 'c'
    return Response.json({message: slug});
  }
  