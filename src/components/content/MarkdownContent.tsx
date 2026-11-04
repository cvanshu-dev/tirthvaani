import Link from "next/link";

export type MarkdownHeading = {
  title: string;
  id: string;
  depth: number;
};

function normalizedHeadingId(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-") || "section"
  );
}

function nextHeadingId(title: string, counts: Map<string, number>) {
  const base = normalizedHeadingId(title);
  const count = (counts.get(base) ?? 0) + 1;
  counts.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

export function extractMarkdownHeadings(source: string): MarkdownHeading[] {
  const counts = new Map<string, number>();
  return source.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (!match) return [];
    return [
      {
        title: match[2].trim(),
        depth: match[1].length,
        id: nextHeadingId(match[2], counts),
      },
    ];
  });
}

function inlineContent(text: string) {
  const tokens =
    /(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\((?:https?:\/\/[^\s)]+|\/[^\s)]*)\))/g;
  return text.split(tokens).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("_") && part.endsWith("_"))
      return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(
      /^\[([^\]]+)\]\(((?:https?:\/\/[^\s)]+|\/[^\s)]*))\)$/,
    );
    if (link) {
      const external = link[2].startsWith("http");
      return external ? (
        <a key={index} href={link[2]} rel="nofollow noopener noreferrer">
          {link[1]}
        </a>
      ) : (
        <Link key={index} href={link[2]}>
          {link[1]}
        </Link>
      );
    }
    return part;
  });
}

export function MarkdownContent({ source }: { source: string }) {
  const lines = source.split(/\r?\n/);
  const nodes: React.ReactNode[] = [];
  const headingCounts = new Map<string, number>();
  let paragraph: string[] = [];
  let list: string[] = [];
  let ordered = false;
  const flushParagraph = () => {
    if (paragraph.length)
      nodes.push(
        <p key={`p-${nodes.length}`}>{inlineContent(paragraph.join(" "))}</p>,
      );
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) {
      const items = list;
      nodes.push(
        ordered ? (
          <ol key={`list-${nodes.length}`}>
            {items.map((item, index) => (
              <li key={index}>{inlineContent(item)}</li>
            ))}
          </ol>
        ) : (
          <ul key={`list-${nodes.length}`}>
            {items.map((item, index) => (
              <li key={index}>{inlineContent(item)}</li>
            ))}
          </ul>
        ),
      );
    }
    list = [];
  };

  for (const line of lines) {
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const content = inlineContent(heading[2]);
      const key = `h-${nodes.length}`;
      const id = nextHeadingId(heading[2], headingCounts);
      if (heading[1].length === 1)
        nodes.push(
          <h2 id={id} key={key}>
            {content}
          </h2>,
        );
      else if (heading[1].length === 2)
        nodes.push(
          <h3 id={id} key={key}>
            {content}
          </h3>,
        );
      else
        nodes.push(
          <h4 id={id} key={key}>
            {content}
          </h4>,
        );
    } else if (unordered || numbered) {
      flushParagraph();
      const nextOrdered = Boolean(numbered);
      if (list.length && nextOrdered !== ordered) flushList();
      ordered = nextOrdered;
      list.push((unordered ?? numbered)![1]);
    } else if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      nodes.push(
        <blockquote key={`q-${nodes.length}`}>
          {inlineContent(line.slice(2))}
        </blockquote>,
      );
    } else if (!line.trim()) {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushList();
  return <div className="cms-rich-content">{nodes}</div>;
}
