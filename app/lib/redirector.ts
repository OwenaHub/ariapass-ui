import type { MessageType, MsgCode } from "~/components/custom/toaster/dictionary";

export function withMsg(path: string, type: MessageType, code: MsgCode) {
    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}${type}=${code}`;
}