import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";





function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a97945]">
      {children}
    </span>
  );
}

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

export function Article({ slug }: { slug: string }) {
  const post =
    articles.find((article) => article.slug === slug) ?? articles[0];

  return (
    <>
      <main className="bg-[#f7f3ec] text-[#302018]">
        <section className="relative h-[300px] overflow-hidden bg-[#211710] sm:h-[360px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <div className="max-w-4xl">
              <Eyebrow>{post.category}</Eyebrow>

              <h1 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-[-0.05em] text-[#fff8ed] sm:text-6xl">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="font-serif text-2xl leading-relaxed text-[#302018] sm:text-3xl">
            {post.intro}
          </p>

          <div className="my-12 flex items-center gap-3 text-[#b3834d]">
            <span className="h-px flex-1 bg-[#d6b98f]" />
            <span>✦</span>
            <span className="h-px flex-1 bg-[#d6b98f]" />
          </div>

          <div className="space-y-12 text-[16px] leading-8 text-[#62554b]">
            <section>
              <h2 className="mb-4 font-serif text-3xl font-normal text-[#302018]">
                A little context
              </h2>

              <p>
                {post.intro} These places and observances hold different
                meanings for different families and communities. Local guidance
                is always important.
              </p>

              <p className="mt-5">
                Take time to understand the setting, customs and practical
                details relevant to your visit.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-3xl font-normal text-[#302018]">
                Before you go
              </h2>

              <p>
                Check travel timings, access and local conditions close to your
                visit. Leave room for delays and make sure everyone travelling
                with you understands the plan.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-3xl font-normal text-[#302018]">
                A note on respect
              </h2>

              <p>
                Sacred spaces are also places of everyday life and worship.
                Follow local guidance and ask before photographing people or
                ceremonies.
              </p>
            </section>
          </div>
        </article>

        <section className="bg-[#fffdf9] px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>Continue reading</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-normal">
              More from the journal.
            </h2>
          </div>

          <JournalBrowser
            articles={articles.filter((article) => article.slug !== slug)}
          />
        </section>

        <CTASection />
      </main>

      <Contact />
    </>
  );
}