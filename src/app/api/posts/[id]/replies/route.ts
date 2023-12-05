import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import {
  query,
  collection,
  getDocs,
  setDoc,
  doc,
  Timestamp,
  where,
} from "firebase/firestore";
import { PostReplyType } from "@/models/reply";
import { generateUUID } from "@/helpers/uuid";
import { AddPostRequestType, AddReplyRequestType } from "@/models/apiTypes";
import moment from "moment"

type ReplyResponseType = {
  id: string;
  name: string;
  email: string;
  description: string;
  post_id: string;
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
};

export async function GET(request: NextRequest) {
  try {
    const post_id = request.url.split("/")[5];
    const docRef = collection(db, "replies");
    const q = query(docRef, where("post_id", "==", post_id));
    const snapshots = await getDocs(q);
    let data: PostReplyType[] = snapshots.docs.map<PostReplyType>((doc) => {
      const postResponse = { ...doc.data(), id: doc.id } as ReplyResponseType;
      const milliseconds =
        postResponse.created_at.seconds * 1000 +
        postResponse.created_at.nanoseconds / 1000000;
      const reply: PostReplyType = {
        ...postResponse,
        created_at: moment(new Date(milliseconds).toISOString()).fromNow(),
      };
      return reply;
    });
    return NextResponse.json({
      message: "Replies found",
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const docRef = doc(db, "replies", generateUUID());
    const reqBody = await request.json();
    const post_id = request.url.split("/")[5];
    const postBody: AddReplyRequestType =
      reqBody as unknown as AddReplyRequestType;
    if (!postBody.name || !postBody.email || !postBody.description) {
      throw new Error("Please fill all the fields");
    }
    await setDoc(docRef, {
      ...postBody,
      post_id,
      created_at: Timestamp.now(),
    });
    return NextResponse.json({
      message: "Reply Added",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
