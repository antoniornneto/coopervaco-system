"use client";
import { deleteImage, uploadImage } from "@/supabase/storage/client";
import { convertBlobUrlToFile } from "@/lib/utils";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { Loader2, Plus, Trash } from "lucide-react";

const ProfileForm = () => {
  const [imageUrls, SetImageUrls] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const session = useSession();
  const nameOwnerSession = session.data?.user.name;

  useEffect(() => {
    const req = fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const idUser = users.map((user) =>
    user.name === nameOwnerSession ? user.id : "/"
  );

  const filePathUser = users.map((user) =>
    user.name === nameOwnerSession ? user.image : "/"
  );

  const ImageInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

      SetImageUrls([...imageUrls, ...newImageUrls]);
    }
  }

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = () => {
    startTransition(async () => {
      let urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "avatars",
          userId: idUser[0],
        });

        const changeImageAvatar = await fetch("/api/user", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session.data?.user.email,
            path: imageUrl,
          }),
        });

        if (error) {
          console.log(error);
          return;
        }

        urls.push(imageUrls);
        SetImageUrls([]);
      }
      location.reload();
    });
  };

  const handleClickDeleteImage = () => {
    const deletePathAvatar = fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.data?.user.email,
        path: "",
      }),
    }).then((res) => res.json());
    deleteImage(filePathUser[0]);
  };

  return (
    <div className="w-screen h-[70vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <input
          type="file"
          ref={ImageInputRef}
          onChange={(e) => handleImageChange(e)}
          hidden
        />
        <button
          onClick={() => ImageInputRef.current?.click()}
          className="border-[3px] border-slate-200 rounded-full flex"
        >
          {imageUrls.length > 0 ? (
            <div>
              {imageUrls.map((image, index) => (
                <Avatar key={index} className="w-72 h-72">
                  <AvatarImage src={image} />
                </Avatar>
              ))}
            </div>
          ) : (
            <div className="border-[3px] border-slate-200 rounded-full w-72 h-72 flex justify-center items-center">
              <Plus color="#e2e8f0" size={80} />
            </div>
          )}
        </button>
        <div className="flex gap-4">
          <button
            className="bg-slate-600 py-2 w-40 rounded-lg text-white flex justify-center"
            onClick={handleClickUploadImagesButton}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Salvar nova foto"
            )}
          </button>
          <button
            onClick={handleClickDeleteImage}
            className="bg-slate-600 p-2 rounded-lg flex justify-center"
          >
            <Trash color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
