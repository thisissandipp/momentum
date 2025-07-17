import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { type CreateGoalsBodySchema } from '@/app/api/goals/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { formatDateToString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { domains } from '@/lib/domains';
import { useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';

const createGoalFormSchema = z.object({
  title: z.string().min(3, { message: 'needs a name! what are you working towards?' }),
  domain: z.string().optional(),
  targetDate: z.date({
    message: 'setting up a target date can significantly boost your motivation.',
  }),
  emoji: z.string().optional(),
  whyReason: z.string().optional(),
  currentState: z.string().optional(),
});

export const goalCreationFormId = 'goal-creation-form';

export const GoalCreationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const createGoalForm = useForm<z.infer<typeof createGoalFormSchema>>({
    resolver: zodResolver(createGoalFormSchema),
    defaultValues: {
      title: '',
      domain: '',
      targetDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      emoji: '🎯',
      whyReason: '',
      currentState: '',
    },
  });

  const domain = createGoalForm.watch('domain');

  const onSubmit = async (values: z.infer<typeof createGoalFormSchema>) => {
    console.log('Submitting goal creation form with values:', values);
    try {
      const response = await axios.post('/api/goals', values satisfies CreateGoalsBodySchema);
      createGoalForm.reset();
      console.log('Goal created successfully:', response.data.goal);
      onSuccess();
    } catch (error) {
      console.error('Failed to create goal', error);
    }
  };

  useEffect(() => {
    const matchedDomain = domains.find((d) => d.name == domain);
    createGoalForm.setValue('emoji', matchedDomain?.emoji ?? '🎯', {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [createGoalForm, domain]);

  return (
    <Form {...createGoalForm}>
      <form
        id={goalCreationFormId}
        onSubmit={createGoalForm.handleSubmit(onSubmit)}
        className="mx-4 space-y-8"
      >
        <FormField
          control={createGoalForm.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <div className="bg-card mr-auto rounded-lg border px-2.5 py-1.5 text-3xl">
                {field.value}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={createGoalForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What&apos;s your next big goal?
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Run a marathon, Get a promotion"
                  className="mt-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createGoalForm.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which area of your life does this goal belong to?</FormLabel>
              <Select {...field} onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="mt-2 w-[var(--radix-select-trigger-width)]">
                    <SelectValue placeholder="Select an area" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {domains.map((domain) => (
                      <SelectItem key={domain.name} value={domain.name}>
                        {domain.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={createGoalForm.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                By when would you like to achieve this?
                <span className="text-destructive">*</span>
              </FormLabel>
              <Popover>
                <FormControl className="mt-2">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-[var(--radix-select-trigger-width)] justify-between font-normal"
                    >
                      {field.value ? formatDateToString(field.value) : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    buttonVariant="outline"
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={createGoalForm.control}
          name="whyReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why is this goal important to you?</FormLabel>
              <FormDescription>
                Articulating your &ldquo;why&rdquo; can be your most powerful motivator.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="This is your personal fuel. Momentum will use this to keep you inspired."
                  className="mt-2 h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createGoalForm.control}
          name="currentState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where are you starting from right now?</FormLabel>
              <FormDescription>
                Reinforces the importance of accurate self-assessment at a later stage.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Write your current reality regarding this goal. What are you doing now (or not doing)?"
                  className="mt-2 h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
