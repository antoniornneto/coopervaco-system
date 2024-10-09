import imageCompression from "browser-image-compression";
import { createSupabaseClient } from "../client";

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

type UploadProps = {
  file: File;
  fileName: string;
  userId?: string;
};

export async function uploadImage({ file, userId, fileName }: UploadProps) {
  const name = file.name;
  const fileExtension = name.slice(name.lastIndexOf(".") + 1);
  const path = `${userId}/${fileName}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });
  } catch (error) {
    console.error(error);
    return { imageUrl: "", error: "Image compression failed" };
  }

  const storage = getStorage();
  const existingAvatar = await storage.from("users_media").exists(path);

  if (existingAvatar.data) {
    const { data, error } = await storage
      .from("users_media")
      .update(path, file);

    if (error) {
      return { imageUrl: "", error: "Image upload failed" };
    }

    const imageUrl = `${process.env
      .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/users_media/${
      data?.path
    }`;
    return { imageUrl, error: "" };
  } else {
    const { data, error } = await storage
      .from("users_media")
      .upload(path, file);

    if (error) {
      return { imageUrl: "", error: "Image upload failed" };
    }

    const imageUrl = `${process.env
      .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/users_media/${
      data?.path
    }`;

    return { imageUrl, error: "" };
  }
}
