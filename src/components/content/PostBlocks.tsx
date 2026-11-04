import Image from "next/image";
import Link from "next/link";

export type PostBlock = {
  id: string;
  type: string;
  text?: string;
  level?: 2 | 3;
  url?: string;
  alt?: string;
  caption?: string;
  author?: string;
  style?: "bullet" | "numbered";
  items?: string[];
};

export function PostBlocks({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="cms-rich-content">
      {blocks.map((block) => {
        if (block.type === "paragraph") {
          return <p key={block.id}>{block.text}</p>;
        }

        if (block.type === "heading") {
          return block.level === 3 ? (
            <h3 key={block.id}>{block.text}</h3>
          ) : (
            <h2 key={block.id}>{block.text}</h2>
          );
        }

        if (block.type === "image" && block.url) {
          return (
            <figure key={block.id}>
              <Image
                src={block.url}
                alt={block.alt || ""}
                width={1200}
                height={800}
                unoptimized
              />
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={block.id}>
              <p>{block.text}</p>
              {block.author && <cite>{block.author}</cite>}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const List = block.style === "numbered" ? "ol" : "ul";

          return (
            <List key={block.id}>
              {block.items?.map((item, index) => (
                <li key={`${block.id}-${index}`}>{item}</li>
              ))}
            </List>
          );
        }

        if (block.type === "button" && block.url) {
          return (
            <p key={block.id}>
              <Link className="button button-primary" href={block.url}>
                {block.text || "Learn more"}
              </Link>
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}