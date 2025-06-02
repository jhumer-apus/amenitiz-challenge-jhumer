import type { HTMLAttributes, PropsWithChildren } from "react";

type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
    label: string
};

export default function Box({ label, children, className = "", ...rest }: BoxProps) {
    return (
        <div className="text-xl p-4 flex items-center gap-2">
            <div id="label-box">{label}:</div>
            <div
                id="box-content"
                className={`border-b border-white ${className} w-fit`}
                {...rest}
            >
                {children}
            </div>
        </div>
    )
}