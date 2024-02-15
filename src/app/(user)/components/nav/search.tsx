'use client';

import React from 'react';

import { Input } from '~/components/ui/input';

import { useRouter } from 'next/navigation';

import { commandItems } from '~/lib/data';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command';

const SearchBox = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  React.useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const focus = () => setOpen(true);
    input.addEventListener('focus', focus);

    return () => {
      input.removeEventListener('focus', focus);
    };
  }, [inputRef]);

  return (
    <div className='flex flex-row items-center gap-2'>
      <Input
        placeholder='Search'
        className='hidden w-full max-w-sm rounded-xl md:block'
        ref={inputRef}
      />
      <kbd className='bg-muted text-muted-foreground pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded-lg border px-1.5 font-mono text-sm font-medium opacity-100'>
        <span className='text-lg'>⌘</span>K
      </kbd>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            {commandItems.map((item, index) => {
              return (
                <CommandItem
                  key={index}
                  value={item.href}
                  onSelect={(href) => {
                    router.prefetch(href);
                    setOpen(false);
                    router.push(href);
                  }}
                >
                  <item.Icon className='mr-2 text-neutral-700' />
                  <span>{item.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem
              value='/dashboard/account'
              onSelect={(href) => {
                router.prefetch(href);
                setOpen(false);
                router.push(href);
              }}
            >
              <span>Account</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBox;
