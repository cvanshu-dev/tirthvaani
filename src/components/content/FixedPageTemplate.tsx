import Image from "next/image";

type FixedPageTemplateProps = {
  data: {
    heroImage?: string;
    heroTitle?: string;
    articleHeading?: string;
    articleText?: string;
    articleImage?: string;
    imageCaption?: string;
    showArticle?: boolean;
    showArticleImage?: boolean;
  };
};

export function FixedPageTemplate({
  data,
}: FixedPageTemplateProps) {
  const hasHero = Boolean(data.heroImage || data.heroTitle);

  return (
    <main className="w-full bg-[#f7f3ec] text-[#302018]">
      {hasHero && (
        <section className="relative h-[300px] w-full overflow-hidden bg-[#211710] sm:h-[360px]">
          {data.heroImage && (
            <Image
              src={data.heroImage}
              alt={data.heroTitle || "Page hero image"}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-center"
            />
          )}

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,10,6,0.78),rgba(18,10,6,0.32),rgba(18,10,6,0.58))]" />

          <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
            <div className="max-w-5xl">
              {data.heroTitle && (
                <h1 className="font-serif text-4xl font-normal leading-tight tracking-[-0.04em] text-[#fff8ed] sm:text-6xl lg:text-7xl">
                  {data.heroTitle}
                </h1>
              )}

              <div className="mx-auto mt-6 flex max-w-xs items-center gap-3">
                <span className="h-px flex-1 bg-[#d6a276]" />
                <span className="text-sm text-[#e2bb82]">✦</span>
                <span className="h-px flex-1 bg-[#d6a276]" />
              </div>
            </div>
          </div>
        </section>
      )}

      {data.showArticle !== false && (
        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 flex items-center justify-center gap-3 text-[#b3834d]">
              <span className="h-px w-16 bg-[#d6b98f]" />
              <span className="text-lg">✥</span>
              <span className="h-px w-16 bg-[#d6b98f]" />
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
              {data.showArticleImage !== false &&
                data.articleImage && (
                  <figure className="m-0">
                    <div className="relative overflow-hidden border border-[#d6c1a5] bg-[#2c211a] p-2 shadow-[0_18px_40px_rgba(68,43,25,0.12)]">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={data.articleImage}
                          alt={
                            data.articleHeading ||
                            "Article image"
                          }
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {data.imageCaption && (
                      <figcaption className="mt-4 text-center font-serif text-sm italic leading-6 text-[#806f60]">
                        {data.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

              <article
                className={
                  data.showArticleImage !== false &&
                  data.articleImage
                    ? "lg:pt-5"
                    : "mx-auto max-w-3xl"
                }
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a97945]">
                  Sacred journeys · TirthVaani
                </span>

                {data.articleHeading && (
                  <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-[-0.035em] text-[#302018] sm:text-5xl">
                    {data.articleHeading}
                  </h2>
                )}

                <div className="mt-6 h-px w-20 bg-[#b3834d]" />

                {data.articleText && (
                  <div className="mt-7 whitespace-pre-line text-[16px] leading-8 text-[#62554b] sm:text-[17px] sm:leading-9">
                    {data.articleText}
                  </div>
                )}
              </article>
            </div>

            <div className="mx-auto mt-14 flex max-w-md items-center gap-3 text-[#b3834d]">
              <span className="h-px flex-1 bg-[#d6b98f]" />
              <span className="text-sm">✦</span>
              <span className="h-px flex-1 bg-[#d6b98f]" />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}