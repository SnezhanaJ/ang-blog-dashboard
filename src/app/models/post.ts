export interface Post {
    title: String,
    permalink: String,
    category:{
        category: string,
        id: string,
    },
    postImgPath: string,
    excerpt: string,
    content: string,
    isFeatured: boolean,
    views: number,
    status: string,
    createdAt: Date,
    dateString: string,
}
