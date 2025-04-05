import React from "react";

const blogs = [
  {
    id: "blog-001",
    title: "Understanding Fundamental Rights in India",
    summary:
      "A beginner-friendly guide to the fundamental rights provided under the Indian Constitution and their importance.",
    link: "#",
  },
  {
    id: "blog-002",
    title: "How to File an FIR: Step-by-Step",
    summary:
      "Know your rights and learn the correct procedure to file a First Information Report in India.",
    link: "#",
  },
  {
    id: "blog-003",
    title: "Legal Rights of Women in India",
    summary:
      "An overview of key legal protections and support systems available to women under Indian law.",
    link: "#",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f8fbf6] py-12 px-4 sm:px-6 lg:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800">
          LexInsight Blog
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Expert opinions, legal updates, and in-depth insights into Indian law.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-2xl p-6 transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-green-700">
              {blog.title}
            </h2>
            <p className="mt-3 text-gray-600">{blog.summary}</p>
            <a
              href={blog.link}
              className="mt-4 inline-block text-green-600 font-medium hover:underline"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
