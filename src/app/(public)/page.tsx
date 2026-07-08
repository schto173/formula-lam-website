import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getSiteSettings } from '@/lib/settings';

// Topic rows for the "What It's All About" section.
// To add a real photo, set `image` to an uploaded path (e.g. '/api/uploads/xxx.jpg')
// or a file placed in /public (e.g. '/home/competition.jpg'). Leave it empty for a placeholder.
const projectTopics: { title: string; description: string; image?: string }[] = [
  {
    title: 'The Challenge',
    description:
      "It's not about speed — it's about efficiency. In the Shell Eco-marathon, teams from across Europe answer one question: who can travel the furthest on the energy of a single litre of fuel? Every single millilitre counts.",
  },
  {
    title: 'Designing & Building the Car',
    description:
      'We build our prototype from the ground up — chassis, bodywork and a lightweight, aerodynamic shell shaped for minimum drag and maximum efficiency.',
  },
  {
    title: 'Mechanical & Electrical Engineering',
    description:
      'Powertrain, drivetrain, steering and brakes on the mechanical side; wiring, sensors, motor control and safety systems on the electrical side. Every component is tuned to save energy.',
  },
  {
    title: 'Informatics & Telemetry',
    description:
      'Our own software and live telemetry system stream data straight from the car — GPS position, engine data, lap times and fuel consumption — so we can follow every run in real time and analyse it afterwards.',
  },
  {
    title: 'Race Week at the Track',
    description:
      'For one intense week we live at the circuit, camping right next to the racetrack and working out of our paddock from early morning until late evening.',
  },
  {
    title: 'Technical Inspection & Prep',
    description:
      'Before we can compete, the car must pass a strict technical inspection. Between runs we are constantly maintaining, repairing and fine-tuning to keep it race-ready.',
  },
  {
    title: 'Driving, Strategy & Competition',
    description:
      'Drivers complete timed attempts within tight limits while the team refines strategy lap by lap. Every touch of throttle and every metre of coasting shapes the final result.',
  },
  {
    title: 'The Journey',
    description:
      'Getting there and back is part of the adventure — long road trips across Europe with the car, the tools and the whole team on board.',
  },
  {
    title: 'Life at Camp',
    description:
      "It's not all work. Building tents, cooking barbecue, evenings around the fire and the friendships that form are what make the experience unforgettable.",
  },
  {
    title: 'Beyond the Race',
    description:
      'Alongside the efficiency runs, we take part in other awards and challenges — from design and communication to teamwork and innovation.',
  },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const latestNews = await prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return (
    <div className="space-y-16">
      {settings.heroImageUrl && (
        <div className="overflow-hidden rounded-xl bg-neutral-200">
          <Image
            src={settings.heroImageUrl}
            alt={settings.teamName}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      <section className="text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          {settings.teamName}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">{settings.tagline}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/join" className="btn-primary">Join the Team</Link>
          <Link href="/team" className="btn-secondary">Meet the Team</Link>
        </div>
      </section>

      {settings.aboutText && (
        <section className="card">
          <h2 className="mb-3 text-xl font-bold">About Us</h2>
          <p className="whitespace-pre-line text-neutral-700">{settings.aboutText}</p>
        </section>
      )}

      <section>
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">What It&apos;s All About</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
            From the first sketch to the finish line — here&apos;s a look at everything that goes into
            our Shell Eco-marathon project, on and off the track.
          </p>
        </div>

        <div className="space-y-12">
          {projectTopics.map((topic, i) => (
            <div
              key={topic.title}
              className={`flex flex-col gap-6 md:items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="md:w-1/2">
                {topic.image ? (
                  <div className="overflow-hidden rounded-xl bg-neutral-200">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-100">
                    <div className="px-4 text-center text-sm text-neutral-400">
                      <p className="font-medium text-neutral-500">{topic.title}</p>
                      <p className="mt-1">Photo coming soon</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="md:w-1/2">
                <h3 className="font-display text-xl font-bold text-neutral-900">{topic.title}</h3>
                <p className="mt-3 text-neutral-600">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Latest News</h2>
          <Link href="/news" className="text-sm font-medium text-brand-600 hover:underline">View all</Link>
        </div>
        {latestNews.length === 0 ? (
          <p className="text-neutral-500">No news posted yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {latestNews.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="card block hover:shadow-md">
                <h3 className="font-semibold text-neutral-900">{post.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Link href="/car" className="card block hover:shadow-md">
          <h2 className="text-xl font-bold">Our Car</h2>
          <p className="mt-2 text-sm text-neutral-600">See the vehicle we're building &mdash; specs, photos, and progress.</p>
        </Link>
        <Link href="/sponsors" className="card block hover:shadow-md">
          <h2 className="text-xl font-bold">Our Sponsors</h2>
          <p className="mt-2 text-sm text-neutral-600">The partners who make this project possible.</p>
        </Link>
      </section>
    </div>
  );
}
