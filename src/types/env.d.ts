/**
 * Module contains environment related application types.
 * @module types/env
 */

declare module '*.svg' {
    const content: never;
    export default content;
}

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}
