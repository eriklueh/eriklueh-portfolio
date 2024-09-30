import React from "react";
import { Pre } from "@/components/common/pre";
import { BlogPost } from "../blog-data";

const zodPost: BlogPost = {
    id: "1",
    title: "Zod: Type-Safe Schema Validation Made Easy",
    excerpt:
        "Discover how Zod simplifies data validation and type inference in TypeScript projects.",
    date: "2023-09-30",
    readTime: "8 min read",
    category: "TypeScript",
    difficulty: "Medium",
    slug: "zod-type-safe-schema-validation",
    content: (
        <div className="max-w-full overflow-x-auto">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                Understanding Zod: A Powerful Schema Declaration and Validation Library
            </h2>

            <p className="mb-4 text-sm sm:text-base">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Zod is a TypeScript-first schema declaration and validation library that allows you to create complex type-safe schemas with ease. It's designed to be simple to use, yet powerful enough to handle complex validation scenarios.
            </p>

            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Key Features of Zod</h3>

            <ul className="list-inside list-disc space-y-2 text-sm sm:text-base mb-4">
                <li>Zero dependencies</li>
                <li>Works in both Node.js and browsers</li>
                <li>Tiny bundle size (8kb minified + zipped)</li>
                <li>Immutable: methods (e.g. `.optional()`) return a new instance</li>
                <li>Concise and elegant API</li>
                <li>Functional approach</li>
            </ul>

            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Getting Started with Zod</h3>

            <p className="mb-2 text-sm sm:text-base">First, install Zod in your project:</p>

            <Pre className="mt-2 text-xs sm:text-sm mb-4">
                npm install zod
            </Pre>

            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Basic Usage Examples</h3>

            <h4 className="mb-2 text-md font-semibold">1. Simple String Schema</h4>

            <Pre className="mt-2 text-xs sm:text-sm mb-4">
                {`import { z } from 'zod';

const stringSchema = z.string();

console.log(stringSchema.parse("hello")); // => "hello"
console.log(stringSchema.parse(42)); // => throws ZodError`}
            </Pre>

            <h4 className="mb-2 text-md font-semibold">2. Object Schema</h4>

            <Pre className="mt-2 text-xs sm:text-sm mb-4">
                {`import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

type User = z.infer<typeof userSchema>;

const validUser = {
  username: "johndoe",
  email: "john@example.com",
  age: 25,
};

console.log(userSchema.parse(validUser));
// => { username: "johndoe", email: "john@example.com", age: 25 }

const invalidUser = {
  username: "jo",
  email: "not-an-email",
};

console.log(userSchema.safeParse(invalidUser));
// => { success: false, error: ZodError }`}
            </Pre>

            <h4 className="mb-2 text-md font-semibold">3. Array Schema</h4>

            <Pre className="mt-2 text-xs sm:text-sm mb-4">
                {`import { z } from 'zod';

const numberArraySchema = z.array(z.number());

console.log(numberArraySchema.parse([1, 2, 3])); // => [1, 2, 3]
console.log(numberArraySchema.parse(["1", "2", "3"])); // => throws ZodError`}
            </Pre>

            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Advanced Features</h3>

            <h4 className="mb-2 text-md font-semibold">1. Custom Validation</h4>

            <Pre className="mt-2 text-xs sm:text-sm mb-4">
                {`import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  });

console.log(passwordSchema.safeParse("weakpwd")); // => { success: false, error: ZodError }
console.log(passwordSchema.safeParse("StrongPwd123")); // => { success: true, data: "StrongPwd123" }`}
            </Pre>

            <h4 className="mb-2 text-md font-semibold">2. Transformations</h4>

            <Pre className="mt-2 text-xs sm:text-sm mb-4">
                {`import { z } from 'zod';

const dateSchema = z.string().transform((str) => new Date(str));

console.log(dateSchema.parse("2023-09-30")); // => Date object`}
            </Pre>

            <p className="mt-4 text-sm sm:text-base">
                Zod provides a powerful and flexible way to validate data and infer types in TypeScript projects. By using Zod, you can ensure that your data conforms to expected shapes and types, reducing runtime errors and improving overall code quality.
            </p>
        </div>
    ),
};

export default zodPost;