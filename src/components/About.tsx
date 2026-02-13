import { aboutData } from '@/src/data/about';

const About = () => (
  <div className="space-y-8">
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">About BlogHub</h1>
      <p className="text-text/70 text-lg">
        Learn more about our mission, vision, and the values that drive us.
      </p>
    </div>

    <div className="grid gap-8">
      {aboutData.map((section) => (
        <div
          key={section.id}
          className="bg-background dark:bg-gray-900 p-6 border-primary pl-6  rounded-lg shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">{section.title}</h2>
          <p className="text-text/80 text-lg leading-relaxed">{section.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default About;
