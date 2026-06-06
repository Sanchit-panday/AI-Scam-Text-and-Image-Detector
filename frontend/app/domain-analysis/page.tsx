import Link from "next/link"

function page() {
    return (
        <>
            <div className="flex gap-4 ">
                <Link href="/domain-analysis/domain-age" className="text-blue-500">Domain Age Analysis</Link>
                <Link href="/domain-analysis/dns-lookup" className="text-blue-500">DNS look up</Link>
            </div>
        </>
    )
}

export default page