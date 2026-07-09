import {NextResponse} from "next/server";

export async function GET() {
    const posts = [
        { id: '1', title: 'Перший пост' },
    ];
    return NextResponse.json(posts);
}