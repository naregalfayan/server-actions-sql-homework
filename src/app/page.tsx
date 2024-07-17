import { getAllCourses, ICourse } from "./lib/api";
import Link from "next/link";

export default async function Home() {
  const courses: ICourse[] = getAllCourses();

  return (
    <main>
      <h1 className="is-size-4">Courses</h1>
      <div className="columns is-multiline">
        {courses.map((course) => (
          <div className="column is-one-third" key={course.id}>
            <div className="box">
              <h2 className="is-size-5">{course.name}</h2>
              <p>Duration: {course.duration} hours</p>
              <p>Price: ${course.price}</p>
              <Link
                href={`/courses/details/${course.id}`}
                className="button is-info"
              >
                Details
              </Link>
              <Link
                href={`/courses/edit/${course.id}`}
                className="button is-warning ml-2"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
