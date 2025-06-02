import type { PropsWithChildren, HTMLAttributes } from "react";

type DivProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function Card(props: DivProps) {
  return (
    <div {...props} className='text-left cursor-pointer rounded-3xl p-8 w-full shadow-4xl bg-slate-200 dark:bg-zinc-900 text-2xl hover:text-white hover:bg-stone-900'>
      {props.children}
    </div>
  );
}
