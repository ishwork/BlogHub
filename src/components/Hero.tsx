import { FC } from 'react';

const Hero: FC = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[30vh] text-center px-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-primary-800 dark:text-primary-100 mb-4 tracking-tight italic">
        Learn Something New Today
      </h1>
      <p className="text-xl sm:text-2xl text-primary-600 dark:text-primary-300 font-medium">
        Your go-to platform for amazing blog posts on tech, life, and more.
      </p>
    </section>
  );
};

export default Hero;
