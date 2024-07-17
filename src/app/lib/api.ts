import Database from "better-sqlite3";

export interface ICourse {
  id: number;
  name: string;
  price: number;
  cover: string;
  duration: number;
}

export type InputCourse = Omit<ICourse, "id">;

const db = new Database("courses.db");

export const addCourse = (course: InputCourse) => {
  db.prepare(
    `INSERT INTO courses(name, price, cover, duration)
    VALUES (@name, @price, @cover, @duration)`
  ).run(course);
};

export const getAllCourses = () => {
  return db
    .prepare(
      `
        SELECT * FROM courses
        `
    )
    .all() as ICourse[];
};

export const getCourseById = (id: number): ICourse | undefined => {
  const course = db.prepare(`SELECT * FROM courses WHERE id = ?`).get(id);
  return course as ICourse | undefined;
};

export const updateCourse = (course: ICourse) => {
  db.prepare(
    `UPDATE courses SET name = @name, price = @price, cover = @cover, duration = @duration WHERE id = @id`
  ).run(course);
};
