export async function getDomainAge(url: string) {

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5298";

    const response = await fetch(
        `${BASE_URL}/api/website/domain_age`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url,
            }),
        }
    );

    if (!response.ok) {

        if (response.status === 429) {
            throw new Error(
                "Too many requests. Please wait a minute and try again."
            );
        }

        const errorData = await response.json();

        throw new Error(
            errorData.error || "Server error"
        );
    }

    return response.json();
}