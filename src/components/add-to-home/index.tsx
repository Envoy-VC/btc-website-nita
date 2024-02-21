import React from 'react';

import { MdOutlineInstallMobile } from 'react-icons/md';

import { Button } from '../ui/button';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
  onClick: () => void;
}

export default function AddToMobile(props: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <Button className='flex flex-row gap-2' size='icon' variant='ghost'>
            <MdOutlineInstallMobile />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add to Home Screen</DrawerTitle>
            <DrawerDescription>
              Install the app on your device for a better experience.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
