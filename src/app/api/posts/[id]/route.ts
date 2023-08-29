import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";
import { PostType } from "@/models/post";

type PostResponseType = {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  image: string;
  links: string;
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
};

export async function GET(request: NextRequest) {
  try {
    const id = request.url.slice(request.url.lastIndexOf("/") + 1);
    const q = doc(db, "posts", id);
    const snapshot = await getDoc(q);
    if (snapshot.exists()) {
      const postResponse = {
        ...snapshot.data(),
        id: snapshot.id,
      } as PostResponseType;
      const milliseconds =
        postResponse.created_at.seconds * 1000 +
        postResponse.created_at.nanoseconds / 1000000;
      const data: PostType = {
        ...postResponse,
        created_at: new Date(milliseconds).toISOString(),
      };
      return NextResponse.json({
        message: "Post found",
        data,
      });
    }
    return NextResponse.json({
      message: "Post Not found",
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
