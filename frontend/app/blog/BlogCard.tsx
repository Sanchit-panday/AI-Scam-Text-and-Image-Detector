import Image from "next/image";
import { ChevronRight } from "lucide-react";
type BlogCardProps = {
  id: number;
  slug: string
  image?: string;
  title: string;
  description: string;
  date: Date;
}
function BlogCard({ image, slug, title, description, date }: BlogCardProps) {
  return (
    <div className="flex flex-col border border-gray-400/30 p-4 w-xs">
      <div className="mb-4 relative overflow-clip min-h-60 rounded-md">
        {image ? (
          <Image
            src={image}
            alt={title}
            // width={400}
            // height={71}
            fill
            className="w-full h-auto object-cover"
          />
        ) : <Image
          src="/Assets/images/endless-constellation.svg"
          alt={title}
          fill
          className="object-cover" />}
      </div>
      <div className="min-h-14">
        <div className="font-semibold line-clamp-2">
          {title}
        </div>
      </div>
      <div className="text-sm line-clamp-3 mb-4 text-gray-200/70">{description}</div>
      <div className="flex justify-between items-end mt-auto text-sm">
        {date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        <a href={`/blog/${slug}`}
          className="text-sm hover:underline hover:text-blue-600 flex items-center gap-1">
          Read more
          <ChevronRight size={19} />
        </a>
      </div>
    </div>
  )
}

export default BlogCard