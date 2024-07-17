"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "@/app/lib/api";

interface EditCourseProps {
  params: {
    id: string;
  };
}

export default function EditCourse({ params }: EditCourseProps) {
  const [course, setCourse] = useState<ICourse | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      console.log(1);
      const response = await fetch(`/api/courses/${params.id}`);
      console.log(response);
      if (response.ok) {
        const courseData = await response.json();
        setCourse(courseData);
      } else {
        // router.push("/courses");
      }
    };
    fetchCourse();
  }, [params.id, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedCourse: ICourse = {
      id: course?.id ?? 0,
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      cover: course?.cover ?? "",
    };
    await fetch(`/api/courses/${course?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCourse),
    });
    router.push("/courses");
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="is-size-3">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              defaultValue={course.name}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="price"
              defaultValue={course.price}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Duration</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="duration"
              defaultValue={course.duration}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Cover</label>
          <div className="control">
            <img
              src={`/${course.cover}`}
              alt={course.name}
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
