'use client';
import UpdateDetailsForm from '@/components/forms/UpdateDetailsForm';
import UpdatePasswordForm from '@/components/forms/UpdatePasswordForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();
  const { data } = useSession();

  data?.user;
  if (!data) return router.replace('/login');
  const { role, ...user } = data.user;

  return (
    <div className="flex flex-col items-center py-2 min-h-[90vh]">
      <div className="w-[90%] lg:w-[70%] mx-auto my-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <UpdateDetailsForm {...user} />
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
