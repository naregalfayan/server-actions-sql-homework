"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "@/app/lib/api";
interface CourseDetailsProps {
  params: {
    id: string;
  };
}

export default function CourseDetails({ params }: CourseDetailsProps) {
  const [course, setCourse] = useState<ICourse | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (response.ok) {
          const courseData = await response.json();
          setCourse(courseData);
        } else {
          // router.push("/courses");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        router.push("/courses");
      }
    };

    fetchCourse();
  }, [params.id, router]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="is-size-3">{course.name}</h1>
      <img
        src={`/${course.cover}`}
        alt={course.name}
        style={{ width: "150px", height: "150px" }}
      />
      <p>
        <strong>Price:</strong> ${course.price}
      </p>
      <p>
        <strong>Duration:</strong> {course.duration} hours
      </p>
      <a href={`/courses/edit/${course.id}`} className="button is-primary">
        Edit Course
      </a>
    </div>
  );
}
