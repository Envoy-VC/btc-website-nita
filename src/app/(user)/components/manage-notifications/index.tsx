'use client';

import React from 'react';
import { Button } from '~/components/ui/button';

import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Switch } from '~/components/ui/switch';

import { useAuth } from '@clerk/nextjs';
import { updateUserNotifications } from '~/lib/supabase/user';

import type { User } from '~/types';
import toast from 'react-hot-toast';

interface EmailNotificationCardProps {
  title: string;
  description: string;
  key: keyof User;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailNotificationCard = ({
  title,
  description,
  key,
  value,
  setValue,
}: EmailNotificationCardProps) => {
  return (
    <div className='flex w-full max-w-3xl flex-row items-center justify-between gap-2 rounded-xl border-[1px] border-neutral-200 p-4 shadow-sm'>
      <div className='flex flex-col'>
        <div className='font-semibold text-neutral-800'>{title}</div>
        <div className='max-w-[256px] text-sm  text-neutral-600 sm:max-w-sm'>
          {description}{' '}
        </div>
      </div>
      <Switch
        name={key}
        checked={value}
        onCheckedChange={(val) => setValue(val)}
        aria-label={`Toggle ${title}`}
        className='text-primary'
      />
    </div>
  );
};

interface Props {
  server_communication_emails: boolean;
  server_marketing_emails: boolean;
  server_event_emails: boolean;
  server_social_emails: boolean;
}

const ManageNotifications = ({
  server_communication_emails,
  server_event_emails,
  server_marketing_emails,
  server_social_emails,
}: Props) => {
  const { userId } = useAuth();

  const [communication_emails, setCommEmails] = React.useState<boolean>(
    server_communication_emails
  );
  const [marketing_emails, setMarketingEmails] = React.useState<boolean>(
    server_marketing_emails
  );
  const [event_emails, setEventEmails] =
    React.useState<boolean>(server_event_emails);
  const [social_emails, setSocialEmails] =
    React.useState<boolean>(server_social_emails);

  const [loading, setLoading] = React.useState(false);

  const onAll = () => {
    setCommEmails(true);
    setMarketingEmails(true);
    setEventEmails(true);
    setSocialEmails(true);
  };

  const onMentions = () => {
    setCommEmails(false);
    setMarketingEmails(true);
    setEventEmails(true);
    setSocialEmails(true);
  };

  const onNone = () => {
    setCommEmails(false);
    setMarketingEmails(false);
    setEventEmails(false);
    setSocialEmails(false);
  };

  const onValueChange = (value: string) => {
    switch (value) {
      case 'all':
        onAll();
        break;
      case 'mentions':
        onMentions();
        break;
      case 'none':
        onNone();
        break;
      default:
        break;
    }
  };
  // prettier-ignore
  const currentVal = () => {
    if (communication_emails && marketing_emails && event_emails && social_emails) {
      return 'all';
    } else if (!communication_emails && marketing_emails && event_emails && social_emails) {
      return 'mentions';
    } else if (!communication_emails && !marketing_emails && !event_emails && !social_emails) {
      return 'none';
    } else {
      return 'custom';
    }
  }

  return (
    <div className='flex flex-col py-6'>
      <div className='flex flex-col gap-5'>
        <div className='font-medium text-neutral-800'>Notify me about...</div>
        <RadioGroup value={currentVal()} onValueChange={onValueChange}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='all' id='all' />
            <Label htmlFor='all'>All new messages</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='mentions' id='mentions' />
            <Label htmlFor='mentions'>Mentions only</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='none' id='none' />
            <Label htmlFor='none'>Nothing</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='custom' id='custom' />
            <Label htmlFor='custom'>Custom</Label>
          </div>
        </RadioGroup>
      </div>
      <div className='my-8 flex flex-col gap-5'>
        <div className='text-2xl font-medium text-neutral-800'>
          Email Notifications
        </div>
        <div className='flex flex-col gap-2'>
          <EmailNotificationCard
            title='Communication emails'
            description='Receive emails about your account activity.'
            key='communication_emails'
            value={communication_emails}
            setValue={setCommEmails}
          />
          <EmailNotificationCard
            title='Marketing emails'
            description='Receive an email when you are mentioned.'
            key='marketing_emails'
            value={marketing_emails}
            setValue={setMarketingEmails}
          />
          <EmailNotificationCard
            title='Event Emails'
            description='Receive emails for friend requests, follows, and more.'
            key='event_emails'
            value={event_emails}
            setValue={setEventEmails}
          />
          <EmailNotificationCard
            title='Social Emails'
            description='Receive emails about upcoming events.'
            key='social_emails'
            value={social_emails}
            setValue={setSocialEmails}
          />
        </div>
        <Button
          className='my-3 w-fit'
          disabled={loading}
          onClick={async () => {
            if (!userId) return;
            try {
              setLoading(true);
              const user = await updateUserNotifications(userId, {
                communication_emails,
                marketing_emails,
                event_emails,
                social_emails,
              });

              if (!user) return;

              toast.success('Notifications updated');

              setCommEmails(user.communication_emails);
              setMarketingEmails(user.marketing_emails);
              setEventEmails(user.event_emails);
              setSocialEmails(user.social_emails);
            } catch (error) {
              toast.error('Failed to update notifications');
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? 'Updating...' : 'Update notifications'}
        </Button>
      </div>
    </div>
  );
};

export default ManageNotifications;
