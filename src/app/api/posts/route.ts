import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import { query, collection, getDocs } from "firebase/firestore";
import { PostType } from "@/models/post";

export async function GET(request: NextRequest) {
  try {
    // console.log("request :>> ", request.json());
    const q = query(collection(db, "posts"));
    const snapshots = await getDocs(q);
    let data: PostType[] = snapshots.docs.map<PostType>(
      (doc) => ({ ...doc.data(), id: doc.id } as unknown as PostType)
    );
    console.log("data :>> ", data);
    return NextResponse.json({
      message: "Posts found",
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("request :>> ", request.json());
    return NextResponse.json({
      message: "Posts Created",
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
