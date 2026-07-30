'use client';
import UpdateDetailsForm from '@/components/forms/UpdateDetailsForm';
import UpdatePasswordForm from '@/components/forms/UpdatePasswordForm';

export default function UserPage() {
  return (
    <div className="flex flex-col items-center py-2 min-h-[90vh]">
      <div className="w-[90%] lg:w-[70%] mx-auto my-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <UpdateDetailsForm />
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
