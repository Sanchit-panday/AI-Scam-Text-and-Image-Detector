export interface BlogItem {
    id: number;
    slug: string;
    image?: string;
    title: string;
    description: string;
    date: Date;
}
export const blogList: BlogItem[] = [
    {
        id: 1,
        slug: "how-ai-is-making-phishing-attacks-more-dangerous-in-2026",
        image: "/Assets/images/how-ai-is-making-phishing-attacks-more-dangerous-in-2026.png",
        title: "How AI Is Making Phishing Attacks More Dangerous in 2026",
        description: "AI is supercharging phishing attacks in 2026 — from flawless scam emails to deepfake voice calls that sound like your loved ones. Learn how cybercriminals are misusing AI tools, how hyper-personalized scams work, and the practical steps you can take to stay protected.",
        date: new Date("2026-05-28")
    },
    // {
    //     id: 2,
    //     slug: "10-essential-tips-for-creating-stronger-passwords",
    //     image: "/Assets/images/blog1.png",
    //     title: "10 essential tips for creating stronger passwords",
    //     description: "Lorem ipsum dolor sit amet consectetur. Id sit quam nulla tellus nunc. Enim pretium nunc dignissim et.",
    //     date: new Date("2026-05-28")
    // },
    // {
    //     id: 3,
    //     slug: "ai-scam-detection3",
    //     image: "/Assets/images/blog1.png",
    //     title: "The role of artificial intelligence in enhancing cybersecurity",
    //     description: "Lorem ipsum dolor sit amet consectetur. Id sit quam nulla tellus nunc. Enim pretium nunc dignissim et.",
    //     date: new Date("2026-05-28")
    // },
    // {
    //     id: 4,
    //     slug: "ai-scam-detection4",
    //     image: "/Assets/images/blog1.png",
    //     title: "The role of artificial intelligence in enhancing cybersecurity",
    //     description: "Lorem ipsum dolor sit amet consectetur. Id sit quam nulla tellus nunc. Enim pretium nunc dignissim et.",
    //     date: new Date("2026-05-28")
    // },
] 