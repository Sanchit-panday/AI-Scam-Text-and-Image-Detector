"use client";
import { useScanStore } from "@/context/ScanContext";
import { Plus, Send, Sparkles } from 'lucide-react'
import { caveat, saira } from "@/components/Fonts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Faq from "./dashboard/Faq";
import StatsAndQuickActions from "./dashboard/StatsAndQuickActions";
import HowMildyWorks from "./dashboard/HowMildyWorks";

export default function Home() {
  const frameworks = [
    { id: "mildyv1.3", label: "Mildy v1.3", name: "Mildy", version: "1.3" }
  ];
  const [prompt, setPrompt] = useState<string>("");
  const router = useRouter();
  const { setPendingQuery } = useScanStore();
  const [uploadMenu, setUploadMenu] = useState<boolean>(false);
  const [promptAreaExpanded, setPromptAreaExpanded] = useState<boolean>(false);

  function handleInput(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
    const paddingTop = parseFloat(getComputedStyle(textarea).paddingTop) || 0;
    const paddingBottom = parseFloat(getComputedStyle(textarea).paddingBottom) || 0;
    const singleLineHeight = lineHeight + paddingTop + paddingBottom;
    const maxHeight = lineHeight * 10;
    console.log("mounted")
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';
    if (newHeight > (singleLineHeight + 5)) {
      setPromptAreaExpanded(true);
    } else if (textarea.value.trim() === '') {
      setPromptAreaExpanded(false);
    }

  }
  function handleUpload() {
    console.log('image upload')
  }
  const chipData = [
    { id: 1, label: "Congratulations! You've won $1,000,000..." },
    { id: 2, label: "Urgent: Your account will be suspended" },
    { id: 3, label: "Crypto investment opportunity" },
    { id: 4, label: "IRS tax refund notification" },
    { id: 5, label: "Free gift card giveaway" },
  ]
  // Fill textarea with example text when chip is clicked
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function fillExample(e: React.MouseEvent<HTMLButtonElement>) {
    const text = e.currentTarget.textContent ?? "";

    setPrompt(text);

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        handleInput(textareaRef.current);
        textareaRef.current.focus();
      }
    })
  }

  function handleSubmitPrompt() {
    setPendingQuery(prompt);
    router.push("/text-analysis");
  }

  const [mobileSize, setMobileSize] = useState<boolean>(false);
  useEffect(() => {
    const checkSize = () => {
      setMobileSize(window.innerWidth < 640);
    };

    checkSize();

    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);
  useEffect(() => {
    console.log("mounted")
    if (textareaRef.current) {
      handleInput(textareaRef.current);
    }
  }, []);

  return (
    <>
      <div className="space-y-8 max-w-6xl overflow-hidden">
        {/* Hero */}
        <div className="flex flex-col items-center pt-10 space-y-10 ">
          <div className="flex flex-col items-center text-center gap-y-4">
            <h1 className="bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent text-5xl font-bold">Is it a scam? Let AI decide.</h1>
            <p className="max-w-120 text-gray-200/50">Paste any message, link, or image and get an instant AI-powered scam analysis. Stay safe online.</p>
          </div>
          <div className="bg-[#2d2d2d] rounded-4xl p-2.5 w-full sm:w-xl md:min-w-xl">
            <div className={`grid 
              ${promptAreaExpanded || mobileSize
                ? "grid-cols-1 grid-rows-[auto_auto] gap-y-3 "
                : "grid-cols-[auto_1fr_auto] gap-x-2"
              }
               justify-center items-end`}>
              <div className={`flex h-full items-center
              ${promptAreaExpanded || mobileSize
                  ? "col-span-2 row-start-1 px-2 "
                  : "order-2"}
                `}>
                <textarea
                  ref={textareaRef}
                  name="Enter text"
                  id="textInput"
                  placeholder="Ask Anything"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    handleInput(e.currentTarget);
                  }}
                  rows={1}
                  className="resize-none w-full min-h-[1em] border-none p-0 outline-none"
                />
              </div>
              <div className={`p-2.5 bg-gray-500/90 rounded-xl -translate-y-8 translate-x-2 flex ${uploadMenu ? "absolute" : "hidden"}`}>
                <a href="/image-analysis"
                  className="text-sm"
                  onClick={handleUpload}
                >
                  Upload Files
                </a>
              </div>
              <button onClick={() => setUploadMenu(!uploadMenu)}
                title="Add Images and more" className={`p-2 rounded-full hover:bg-slate-500 ${promptAreaExpanded || mobileSize ? "row-start-2 justify-self-start" : "order-1"}`}>
                <Plus size={18} />
              </button>
              <div className={`flex gap-x-2 ${promptAreaExpanded || mobileSize ? "row-start-2 justify-self-end" : "order-3"}`}>
                <Select value="mildyv1.3">
                  <SelectTrigger className=" max-w-48">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectGroup>
                      <SelectLabel>Select framework</SelectLabel>
                      {frameworks.map((item) => (
                        <SelectItem key={item.id} value={item.id}><Sparkles />{mobileSize ? "v" + item.version : item.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <button className="p-2 rounded-full hover:bg-slate-500" title="Send Prompt" onClick={() => handleSubmitPrompt()}><Send size={18} /></button>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-center gap-y-8 max-w-3xl" >
            <p className="text-muted-foreground">Try an example</p>
            <div className="text-sm flex flex-wrap justify-center gap-x-3 gap-y-3" >
              {chipData.map((item) => (
                <button className="chip-button" key={item.id} onClick={(e) => fillExample(e)}>{item.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* quick actions */}
        <StatsAndQuickActions />

        {/* About Mildy AI */}
        {/* How it works */}
        <HowMildyWorks />

        {/* About scams in India */}
        <div className="mb-15">
          <div className={`mb-4 text-lg font-semibold text-slate-200 ${saira.className}`}>Made in India</div>
          <div className={`mb-10 text-5xl font-bold text-brand-400/90 ${caveat.className}`}>
            Cyber Threats Are Growing<br /><p className="text-red-500">Faster Than Ever</p>
          </div>
          <ul className="list-disc">
            <li>36+ lakh online financial fraud incidents were reported in India during 2024.</li>
            <li>₹22,845 crore was lost to cyber fraud in India in 2024, a 206% increase compared to 2023.</li>
            <li>80+ million phishing attempts were detected in India during 2024, making India one of the world's most targeted countries for phishing attacks.</li>
            <li>72.6% of registered cybercrime cases in 2024 were fraud-relate</li>
          </ul>
        </div>

        {/* FAQ */}
        <Faq />

        {/* Report to Government */}
        <div className="text-sm text-center mb-10">Found a suspicious link? Scan it free with Mildy AI or report to India's national cyber crime helpline:&ensp;
          <a href="tel:1930" className="underline text-red-500/80">1930</a>{" · "}
          <a href="https://cybercrime.gov.in/" className="underline text-red-500/80">cybercrime.gov.in</a></div>
      </div>
    </>
  );
}
