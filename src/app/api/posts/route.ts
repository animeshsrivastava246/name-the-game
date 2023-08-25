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
    await setDoc(docRef, {
      description: "Test Description2",
      title: "Test Post 2",
      email: "animesh@gmail.com",
      created_at: Timestamp.now(),
      name: "Animesh Test",
      image:
        "https://images.unsplash.com/photo-1689229415614-f360cc829c48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
      links: "",
    });
    return NextResponse.json({
      message: "Posts Added",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
