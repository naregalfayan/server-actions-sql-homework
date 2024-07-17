import { NextResponse } from "next/server";
import { ICourse, updateCourse } from "@/app/lib/api";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const courseId = parseInt(params.id, 10);
  const updatedCourse: ICourse = await request.json();

  if (isNaN(courseId)) {
    return NextResponse.error();
  }

  try {
    updateCourse({ ...updatedCourse, id: courseId });
    return NextResponse.json({ message: "Course updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
