import { ArrowUpRight } from "lucide-react";
import { CTASection } from "../sections/CTASection";
import { Eyebrow, ImageBlock } from "../shared";
export function Travel() {
  const options = [
    [
      "01",
      "A place to stay",
      "Accommodation preferences can be discussed; availability and suitability require local confirmation.",
    ],
    [
      "02",
      "Getting around",
      "Ask about transport between the station, accommodation and ritual locations. Arrangements are subject to confirmation.",
    ],
    [
      "03",
      "Local context",
      "A local guide can help you navigate the area. Ask who will be available and what the visit includes.",
    ],
    [
      "04",
      "Pickup and drop",
      "Share arrival times and mobility needs when asking about transfers; confirm arrangements before travel.",
    ],
    [
      "05",
      "Family assistance",
      "Let your contact know about children, older travellers or accessibility needs so options can be discussed.",
    ],
    [
      "06",
      "A considered plan",
      "A simple itinerary can help balance ritual timings, rest and travel. Confirm each detail before departure.",
    ],
  ];
  return (
    <main>
      <section className="page-hero">
        <ImageBlock src="/hero.jpg" alt="A boat on the Ganga, Varanasi" />
        <div className="hero-shade" />
        <div className="page-hero-copy">
          <Eyebrow>THE JOURNEY AROUND THE RITUAL</Eyebrow>
          <h1>
            Travel with
            <br />
            <em>more ease.</em>
          </h1>
          <p>
            Planning a pilgrimage brings practical questions. Here are the kinds
            of support to ask about before you travel.
          </p>
        </div>
      </section>
      <section className="travel-intro section-pad">
        <Eyebrow>A USEFUL STARTING POINT</Eyebrow>
        <h2>
          Good planning leaves
          <br />
          more room for <em>meaning.</em>
        </h2>
        <p>
          Travel assistance options below are suggestions for discussion. They
          are not confirmed offerings. Please check availability, costs and
          details directly with the local provider before making plans.
        </p>
      </section>
      <section className="assistance-options section-pad">
        {options.map((x) => (
          <div key={x[0]}>
            <span>{x[0]}</span>
            <div>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
            <ArrowUpRight size={18} />
          </div>
        ))}
      </section>
      <CTASection />
    </main>
  );
}
