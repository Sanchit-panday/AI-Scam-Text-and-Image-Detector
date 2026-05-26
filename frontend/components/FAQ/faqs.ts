export interface FAQItem {
  id: number;
  title: string;
  description: string;
}
export const faqList: FAQItem[] = [
  {
    id: 1,
    title: "What is AI Scam Detector?",
    description: "AI Scam Detector is a security tool that analyzes suspicious messages, screenshots, and links to help identify potential scams, phishing attempts, and fraudulent online content. It uses machine learning and threat-detection techniques to provide risk assessments and explainable results."
  },
  {
    id: 2,
    title: "How does the scam detection system work?",
    description: "Our AI examines text patterns, suspicious language, urgency tactics, phishing indicators, and potentially risky links. For image uploads, OCR technology extracts text from screenshots before analysis, allowing threats hidden inside images to be detected as well."
  },
  {
    id: 3,
    title: "Can I analyze screenshots and images?",
    description: "Yes. You can upload screenshots of emails, messages, social media conversations, or websites. The system extracts visible text and scans it for scam-related indicators and phishing patterns."
  },
  {
    id: 4,
    title: "Is the analysis result always 100% accurate?",
    description: "No security tool can guarantee perfect accuracy. Cybercriminals constantly evolve their tactics, and some sophisticated scams may appear legitimate. We recommend using the results as guidance alongside your own judgment and security best practices."
  },
  {
    id: 5,
    title: "What does the confidence score mean?",
    description: "The confidence score indicates how strongly the AI believes its assessment is correct. Higher confidence generally means stronger evidence supporting the result, but it should not be treated as absolute certainty."
  },
  {
    id: 6,
    title: "What do the risk levels mean?",
    description: "Low Risk The content shows few or no common scam indicators.Medium RiskSome suspicious characteristics are present and additional caution is recommended.High Risk->Multiple indicators associated with scams or phishing attacks have been detected, suggesting a significant threat."
  },
  {
    id: 7,
    title: "What types of scams can be detected?",
    description: "AI Scam Detector is designed to identify a wide range of online threats by analyzing suspicious language, phishing indicators, risky links, and common fraud patterns. It can help detect phishing emails, fake banking notifications, account verification scams, lottery and prize fraud, job offer scams, investment schemes, cryptocurrency scams, tech support fraud, and impersonation attempts. While no detection system can identify every possible threat, our AI continuously looks for characteristics commonly associated with scams to help users make safer decisions online."
  },
  {
    id: 8,
    title: "Can the tool detect malicious links?",
    description: "The system can identify and analyze suspicious URLs and phishing-related link patterns. However, users should avoid clicking unknown links even if they appear safe, as attackers frequently change domains and tactics."
  },
  {
    id: 9,
    title: "Is my data stored permanently?",
    description: "Analysis data is processed to generate results. Any stored information is handled according to the platform's privacy practices. Users should avoid uploading highly sensitive personal information whenever possible."
  },
  {
    id: 10,
    title: "What should I do if a message is flagged as high risk?",
    description: "If a message is classified as high risk, it is important to proceed with caution. Avoid clicking any links, downloading attachments, or sharing sensitive information such as passwords, OTPs, banking details, or personal documents. Verify the sender through official channels whenever possible, especially if the message claims to be from a bank, government agency, or well-known company. A high-risk result indicates that multiple suspicious indicators have been detected, and taking a moment to verify the content can help protect you from fraud, identity theft, and financial loss."
  },
  {
    id: 11,
    title: "Can scammers bypass AI detection systems?",
    description: "Some advanced scams may attempt to evade automated detection by using new wording, images, or social engineering techniques. This is why cybersecurity awareness and careful verification remain important even when using security tools."
  },
  {
    id: 12,
    title: "Why should I verify suspicious messages before responding?",
    description: "Cybercrime continues to affect millions of people worldwide through phishing, identity theft, financial fraud, and account compromise. Taking a few seconds to verify a suspicious message can prevent significant financial and personal damage."
  },
  {
    id: 13,
    title: "Is AI Scam Detector free to use?",
    description: "The platform provides accessible scam analysis tools designed to help users make safer decisions online. Available features and usage limits may vary as the platform evolves."
  },
  {
    id: 14,
    title: "Who can benefit from this tool?",
    description: "AI Scam Detector is useful for: Everyday internet users / Students / Remote workers / Professionals / Small businesses / Elderly users / Elderly users"
  },
  {
    id: 15,
    title: "Why are phishing scams so successful?",
    description: "Phishing attacks often exploit human psychology rather than technical vulnerabilities. Attackers create urgency, fear, excitement, or trust to encourage victims to act before verifying the information."
  },
];