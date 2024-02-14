export interface Place {
    id: number,
    tags: number[]
    tagData?: Tag[]
    name: string,
    body: string,
    img_url: string
}

export interface Tag {
    id: number,
    name: string,
    type: string
}

export interface ChipProps {
    tag: string
}