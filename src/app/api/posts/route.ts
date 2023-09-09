import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import {
  query,
  collection,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { PostType } from "@/models/post";
import { generateUUID } from "@/helpers/uuid";
import { AddPostRequestType } from "@/models/apiTypes";

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
    // console.log("request :>> ", request.json());
    const q = query(collection(db, "posts"));
    const snapshots = await getDocs(q);
    let data: PostType[] = snapshots.docs.map<PostType>((doc) => {
      const postResponse = { ...doc.data(), id: doc.id } as PostResponseType;
      const milliseconds =
        postResponse.created_at.seconds * 1000 +
        postResponse.created_at.nanoseconds / 1000000;
      const post: PostType = {
        ...postResponse,
        created_at: new Date(milliseconds).toISOString(),
      };
      return post;
    });
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
    const docRef = doc(db, "posts", generateUUID());
    const reqBody = await request.json();
    const postBody: AddPostRequestType =
      reqBody as unknown as AddPostRequestType;
    if (
      !postBody.name ||
      !postBody.email ||
      !postBody.title ||
      !postBody.description
    ) {
      throw new Error("Please fill all the fields");
    }
    await setDoc(docRef, {
      ...postBody,
      created_at: Timestamp.now(),
    });
    return NextResponse.json({
      message: "Posts Added",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
