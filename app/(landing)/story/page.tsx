'use client';

import { StoryResponseForm } from '@/components/landing/story-response-form';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        The Momentum Story: Why and What
      </h1>
      <h2 className="mt-8 text-xl font-bold tracking-tight text-balance sm:text-2xl">
        The Gap Between Aspiration and Action
      </h2>
      <p className="mt-8 text-base/8 font-medium text-pretty sm:text-base">
        We&apos;ve all been there. That spark of inspiration for a new goal: learn a language, write
        a book, launch a side project, finally get fit. The initial enthusiasm is intoxicating. We
        plan, we dream, we imagine our ambitious selves.
      </p>
      <p className="mt-4 text-base/8 font-medium text-pretty sm:text-base">
        But then, reality sets in. The daily grind. The distractions. The comfort of old habits. The
        motivation wanes, the consistency falters, and soon, that brilliant aspiration is just
        another half-forgotten entry on a never-ending to-do list.
      </p>
      <p className="mt-4 text-base/8 font-medium text-pretty sm:text-base">
        It&apos;s the frustrating gap between knowing what we want to achieve and consistently
        taking the steps to actually do it. It&apos;s not a lack of desire, intelligence, or
        resources. It&apos;s the struggle with <strong>consistency</strong>,{' '}
        <strong>overwhelm</strong>, <strong>lack of clarity on next steps</strong>, and{' '}
        <strong>sustaining motivation</strong> in the face of inevitable setbacks. It&apos;s the
        silent battle against procrastination, the whispers of self-doubt, and the gravitational
        pull back to our comfort zones.
      </p>
      <h2 className="mt-8 text-xl font-bold tracking-tight text-balance sm:text-2xl">
        My Struggle, Your Struggle, Our Struggle
      </h2>
      <p className="mt-8 text-base/8 font-medium text-pretty sm:text-base">
        This isn&apos;t just a story about your potential struggles. It&apos;s deeply personal to
        me, too. As I work on building <strong>Momentum</strong> itself, I face this exact same
        chasm every single day. I have the vision for what this system could be, the desire to
        create something truly impactful, but I constantly battle my own inconsistencies. There are
        days I dive in with intense focus, and then days where I feel the pull to simply... not
        build. I want to build, then I also don&apos;t want to build. This very internal conflict,
        this aspiration-action chasm within myself, is what Momentum is being built to solve - both
        for me, and for you.
      </p>
      <h2 className="mt-8 text-xl font-bold tracking-tight text-balance sm:text-2xl">
        Momentum: A Vision for Bridging the Gap
      </h2>
      <p className="mt-8 text-base/8 font-medium text-pretty sm:text-base">
        So, <span className="underline underline-offset-4">what is Momentum?</span> At its heart,
        Momentum is a vision for a personal growth companion, designed to help you{' '}
        <strong>foster consistent actions</strong>. It&apos;s meant to be the system that guides you
        from your current self to your ambitious self, not just by tracking your actions, but by
        supporting you in consistently taking them.
      </p>
      <p className="mt-4 text-base/8 font-medium text-pretty sm:text-base">
        It&apos;s not just another habit tracker. The market is full of simple checklists that tell
        you what you did or didn&apos;t do. But they rarely address the why you stopped, or the how
        to get back on track. They lack the adaptive intelligence, the personalized guidance, and
        the motivational support needed when life inevitably throws you off course.
      </p>
      <p className="mt-4 text-base/8 font-medium text-pretty sm:text-base">
        Momentum aims to be the missing piece. A system that understands your &ldquo;why,&rdquo;
        helps you articulate your starting line, and then provides a structured, adaptable path
        forward.
      </p>
      <h2 className="mt-8 text-xl font-bold tracking-tight text-balance sm:text-2xl">
        Help Me Build the &ldquo;How&rdquo;
      </h2>
      <p className="mt-8 text-base/8 font-medium text-pretty sm:text-base">
        Here&apos;s the honest truth: I don&apos;t have all the answers on how to perfectly bridge
        this aspiration-action gap. I have a strong vision for what Momentum should be - a powerful
        force for personal transformation. But the exact solution, the perfect system that truly
        helps you go from your current self to your ambitious self, is something I want to discover
        with your help.
      </p>
      <p className="mt-4 text-base/8 font-medium text-pretty sm:text-base">
        I believe the most effective solutions are built by understanding the real experiences of
        people who are actively navigating their own growth journeys. Your insights, your successes,
        and your struggles are invaluable.
      </p>
      <p className="mt-8 text-base/8 font-semibold text-pretty sm:text-base">
        Please take a few moments to share your thoughts. You can engage with us in a way that works
        best for you:
      </p>
      <ul className="mt-8 list-disc pl-6 text-base/8 font-medium text-pretty sm:text-base">
        <li>
          <strong>Quick Thoughts on X (Twitter):</strong> If you have a quick insight or prefer a
          brief response, please Direct Message (DM) me on X{' '}
          <Link
            href="https://x.com/thisissandipp"
            target="_blank"
            className="text-chart-1 hover:underline hover:underline-offset-4"
          >
            @thisissandipp
          </Link>
          . If for any reason you can&apos;t DM, feel free to tag me with your thoughts, or fill out
          the form below.
        </li>
        <li className="mt-4">
          <strong>Detailed Insights via Form:</strong> For more comprehensive feedback, you can
          optionally fill out the short survey form below. It should not take more than 5-10
          minutes.
        </li>
      </ul>
      <p className="mt-8 text-base/8 font-semibold text-pretty sm:text-base">
        I might reach out to some of you directly for a deeper conversation, based on your
        responses.{' '}
        <span className="font-medium">
          Here are some prompts to get you thinking - feel free to address them in your Twitter
          reply or the survey form:
        </span>
      </p>
      <ul className="mt-8 list-decimal pl-6 text-base/8 font-medium text-pretty sm:text-base">
        <li>
          <strong>The &ldquo;Big Goal&rdquo; Challenge:</strong> Think about a significant personal
          or professional goal you&apos;ve tried to achieve (or are currently trying to achieve).
          What was the single biggest challenge you faced in consistently working towards it? (e.g.,
          getting started, staying motivated, knowing what to do next, overcoming procrastination).
        </li>
        <li className="mt-4">
          <strong>Current Strategies:</strong> What systems, tools, or mental frameworks (if any)
          have you used that did help you make progress towards your goals? What worked well about
          them? (Look for existing solutions, even unconventional ones).
        </li>
        <li className="mt-4">
          <strong>The &ldquo;Stuck&rdquo; Moment:</strong> Describe a time when you felt truly
          &lsquo;stuck&lrquo; or lost momentum on a goal. What typically happens when you lose
          motivation, and what (if anything) helps you get back on track?
        </li>
        <li className="mt-4">
          <strong>Desired Support:</strong> If you could design the perfect personal growth
          companion, what one feature or type of support would make the biggest difference in
          helping you consistently bridge the gap between where you are and where you want to be?
        </li>
        <li className="mt-4">
          <strong>Achiever Insights:</strong> For those who feel they&apos;ve successfully achieved
          big goals, what&apos;s your top piece of advice or the most crucial &lsquo;system&rsquo;
          you rely on to consistently push yourself from your &lsquo;current self&rsquo; to your
          &lsquo;ambitious self&rsquo;?
        </li>
        <li className="mt-4">
          <strong>Anything Else:</strong> Is there anything else you&apos;d like to share about your
          experience with personal growth, consistent action, or achieving ambitious goals?
        </li>
      </ul>
      <StoryResponseForm />
    </div>
  );
}
