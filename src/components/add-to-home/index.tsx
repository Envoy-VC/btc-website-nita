import React from 'react';

import { MdOutlineInstallMobile } from 'react-icons/md';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
  onClick: () => void;
}

export default function AddToMobile(props: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex flex-row gap-2' size='icon' variant='ghost'>
          <MdOutlineInstallMobile />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xs rounded-xl p-4'>
        <DialogHeader className='flex justify-start'>
          <DialogTitle className=' text-start'>Add to Home Screen</DialogTitle>
          <DialogDescription className='text-start'>
            Install the app on your device for a better experience.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex flex-row justify-end gap-3'>
            <Button
              onClick={() => {
                props.doNotShowAgain();
                setOpen(false);
              }}
              variant='outline'
              size='sm'
            >
              Don&lsquo;t show again
            </Button>
            <Button
              onClick={props.onClick}
              variant='primary'
              size='sm'
              className='flex flex-row items-center gap-1'
            >
              <MdOutlineInstallMobile />
              Install
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
