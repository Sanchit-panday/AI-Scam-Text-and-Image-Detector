import { blogList } from "../blogList";
import { contentMap } from "@/app/blog/content/contentMap"
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogPage({
    params,
}: Props) {

    const { slug } = await params;
    const blog = blogList.find(
        (b: { slug: string; }) => b.slug === slug
    );

    const Content =
        contentMap[
        slug as keyof typeof contentMap
        ];

    if (!blog || !Content) {
        notFound();
    }

    return (
        <section className="max-w-6xl mx-auto py-10">
            {/* Default content */}
            <div className="flex items-center gap-4 mb-8">
                <div className="px-3 py-1.5 bg-blue-600 rounded-xl">
                    Articles
                </div>
                <div>
                    {blog.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </div>
            </div>
            <div className="mb-15">
                <div className="text-5xl font-semibold mb-4">{blog.title}
                </div>
                <div className="text-gray-300/70">{blog.description}
                </div>
            </div>
            <div className="w-full border rounded-lg">
                {blog.image ? (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="rounded-lg"
                    />
                ) :
                    <img
                        src="/Assets/images/endless-constellation.svg"
                        alt={blog.title}
                        className="w-full h-auto rounded-lg"
                    />
                }
            </div>
            <div className="mt-20">
                <Content />
            </div>
        </section>
    );
}