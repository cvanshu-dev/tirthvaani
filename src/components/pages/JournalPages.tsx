import { AssignedPosts } from "@/components/content/AssignedPosts";
import { Contact } from "./ContactPage";

export function Journal() {
  return (
    <>
      <main className="bg-[#f7f3ec] text-[#302018]">
        <AssignedPosts
          pageSlug="journal"
          editorial={{
            eyebrow: "THE JOURNAL",
            heading: "Stories for the sacred road.",
            description:
              "Thoughtful context for rituals, destinations and meaningful journeys across India.",
            emptyMessage:
              "New journal articles will appear here soon.",
            viewAllHref: "/journal",
            viewAllLabel: "View all articles",
          }}
        />
      </main>

      <Contact />
    </>
  );
}