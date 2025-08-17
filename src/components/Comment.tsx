type Props = { author: string; timestamp: string; text: string; children?: React.ReactNode };

export default function Comment({ author, timestamp, text, children }: Props) {
    return (
        <div className="rounded border bg-white p-3">
            <div className="text-sm">
                <span className="font-medium">{author}</span>{' '}
                <span className="text-gray-500">{timestamp}</span>
            </div>
            <p className="mt-1 text-sm text-gray-800">{text}</p>
            {children ? <div className="mt-2 space-y-2 pl-4">{children}</div> : null}
        </div>
    );
}


