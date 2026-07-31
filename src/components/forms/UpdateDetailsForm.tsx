'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateLoggedUserData } from '@/lib/user/updateLoggedUserData';
import {
  EmailSchemaType,
  NameSchemaType,
  updateEmailSchema,
  updateNameSchema,
} from '@/schema/userDetails.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function UpdateDetailsForm({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const nameForm = useForm({
    defaultValues: {
      name,
    },
    resolver: zodResolver(updateNameSchema),
  });
  const emailForm = useForm({
    defaultValues: {
      email,
    },
    resolver: zodResolver(updateEmailSchema),
  });

  async function handleClick(values: NameSchemaType | EmailSchemaType) {
    toast.promise(
      async () => {
        const { success, payload, error } = await updateLoggedUserData(values);

        if (success && payload) return true;

        throw new Error(error?.message);
      },
      {
        loading: 'Updating your profile...',
        success: 'Profile updated successfully!',
        error: (e) => e.message,
      },
    );
  }

  return (
    <div className="rounded-lg shadow-lg shadow-gray-200 py-4 px-8 w-full lg:w-1/2">
      <h1 className="font-bold text-center text-3xl mb-8">Update Details</h1>
      <Form {...nameForm}>
        <form onSubmit={nameForm.handleSubmit(handleClick)}>
          <FormField
            control={nameForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Name:</FormLabel>
                <FormControl className="flex gap-2">
                  <div>
                    <Input className="w-3/4" type="text" {...field} />
                    <Button type="submit" className="w-1/4 cursor-pointer">
                      Update
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(handleClick)}>
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email:</FormLabel>
                <FormControl className="flex gap-2">
                  <div>
                    <Input className="w-3/4" type="email" {...field} />
                    <Button type="submit" className="w-1/4 cursor-pointer">
                      Update
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
