import { doGet } from "./request";

export function getAlbums() {
    return doGet(`/interview/album/0`, null)
}

export function getAlbumDetail(id: string) {
    return doGet(`/interview/album/${id}`, null)
}