"use server";

import { createWriteStream } from "fs";
import { addCourse, InputCourse } from "../api";
import { redirect } from "next/navigation";

export const handleAdd = async (data: FormData) => {
  const photo = data.get("cover") as File;
  if (photo) {
    let extension = photo.type.split("/").at(-1);
    const filename = Date.now() + "." + extension;
    const stream = createWriteStream("public/images/" + filename);
    const bufferedImage = await photo.arrayBuffer();
    stream.write(Buffer.from(bufferedImage));
    let course: InputCourse = {
      name: data.get("name") as string,
      price: +(data.get("price") as string),
      duration: +(data.get("duration") as string),
      cover: "images/" + filename,
    };
    addCourse(course);
    redirect("/");
  }
};
