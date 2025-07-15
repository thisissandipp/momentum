import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { InsertStoryResponse } from '@/db/types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { z } from 'zod';

const storyResponseFormSchema = z.object({
  respondentName: z.string().optional(),
  contactInfo: z.string().optional(),
  response: z.string().min(10, {
    message: 'Response must be at least 10 characters long',
  }),
});

export const StoryResponseForm = () => {
  const [storyResponsesCount, setStoryResponsesCount] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const storyResponseForm = useForm<z.infer<typeof storyResponseFormSchema>>({
    resolver: zodResolver(storyResponseFormSchema),
    defaultValues: {
      respondentName: '',
      contactInfo: '',
      response: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof storyResponseFormSchema>) => {
    try {
      const response = await axios.post(
        '/api/story-response',
        values satisfies InsertStoryResponse,
      );

      storyResponseForm.reset();
      setFormSubmitted(true);
      setStoryResponsesCount((prevCount) => prevCount + 1);

      console.log('Story response created successfully:', response.data);
    } catch (error) {
      console.error('Failed to create story response', error);
    }
  };

  useEffect(() => {
    const fetchStoryResponsesCount = async () => {
      try {
        const response = await axios.get('/api/story-response/count');
        setStoryResponsesCount(response.data.count);
      } catch (error) {
        console.error('Failed to fetch story responses count', error);
      }
    };
    fetchStoryResponsesCount();
  }, []);

  return (
    <div className="mt-10 font-medium text-pretty">
      <div className="flex flex-row items-end justify-between space-x-3.5">
        <h2 className="mt-8 text-xl font-bold tracking-tight text-balance sm:text-2xl">
          Share Your Thoughts
        </h2>
        <Badge variant="secondary">{storyResponsesCount} Responses Submitted</Badge>
      </div>
      <p className="mt-4 text-base/8 font-medium text-pretty sm:text-base">
        I appreciate your willingness to share your insights and experiences. Your feedback is
        invaluable in shaping the future of Momentum.
      </p>

      {formSubmitted && (
        <p className="bg-chart-4 mt-8 rounded-md p-4 text-center text-base/8 font-medium text-pretty sm:text-base">
          Your insights are invaluable. Thank you for helping me build a system that truly works.
        </p>
      )}

      {!formSubmitted && (
        <Form {...storyResponseForm}>
          <form onSubmit={storyResponseForm.handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <FormField
              control={storyResponseForm.control}
              name="respondentName"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel>Your Name (Optional)</FormLabel>
                  <FormControl>
                    <Input className="mt-2" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will allow me to address you properly when I reach out.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={storyResponseForm.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel>Your Email or Contact Info (Optional)</FormLabel>
                  <FormControl>
                    <Input className="mt-2" {...field} />
                  </FormControl>
                  <FormDescription>
                    How do I reach out for a deeper conversation? This is optional, but it would be
                    helpful if you&apos;re comfortable sharing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={storyResponseForm.control}
              name="response"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel>
                    Share your thoughts and insights on personal growth, ambitious goals, and the
                    Aspiration-Action Gap.
                  </FormLabel>
                  <FormControl>
                    <Textarea className="mt-2 h-40" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tell me about your biggest challenges, what has helped you make progress, times
                    you&apos;ve felt stuck, and what you would wish for in a personal growth
                    companion. No need to answer every specific question, just share what resonates
                    most with you!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8 flex flex-row justify-end">
              <Button type="submit">Submit Feedback</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
