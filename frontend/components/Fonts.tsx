import { Inter, Caveat, Playfair_Display_SC, Playfair_Display, Saira, Open_Sans } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const caveat = Caveat({
    subsets: ["latin"],
    variable: "--font-caveat",
});

export const playfairDisplaySC = Playfair_Display_SC({
    weight: ["400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-playfair",
}); 
export const playfairDisplay = Playfair_Display({
    weight: ["400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-playfairDisplay",
});
export const saira = Saira({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    variable: "--font-Saira",
});
export const openSans = Open_Sans({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    variable: "--font-Saira",
});