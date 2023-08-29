import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import { query, collection, getDoc, doc } from "firebase/firestore";
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
    const q = doc(db, "posts", "b147c11d-cdc2-4e9b-ad3a-55038188974f");
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
