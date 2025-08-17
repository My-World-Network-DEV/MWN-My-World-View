'use client';

import Comment from './Comment';

export default function ForumThread() {
    return (
        <div className="space-y-2">
            <Comment author="@demo" timestamp="just now" text="Thread starter">
                <Comment author="@reply" timestamp="1m" text="Nested reply" />
            </Comment>
        </div>
    );
}


