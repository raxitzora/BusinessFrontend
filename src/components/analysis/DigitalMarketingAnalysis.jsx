function DigitalMarketingAnalysis({

    loading,

    data,

}) {

    if (loading) {

        return (

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

                <p className="text-zinc-400">

                    Analyzing Digital Marketing...

                </p>

            </div>

        );

    }

    if (!data) {

        return null;

    }

    const {

        tracking,

        socialPresence,

        contactOptions,

        trustSignals,

        marketingTools,

        summary,

        aiOpportunities,

    } = data;

    return (

        <div className="space-y-6">

            {/* Tracking */}

            <Section title="Tracking">

                <BooleanRow
                    title="Google Analytics"
                    value={tracking.googleAnalytics}
                />

                <BooleanRow
                    title="Google Tag Manager"
                    value={tracking.googleTagManager}
                />

                <BooleanRow
                    title="Meta Pixel"
                    value={tracking.metaPixel}
                />

            </Section>

            {/* Social Presence */}

            <Section title="Social Presence">

                <SocialRow
                    title="Facebook"
                    value={socialPresence.facebook}
                />

                <SocialRow
                    title="Instagram"
                    value={socialPresence.instagram}
                />

                <SocialRow
                    title="LinkedIn"
                    value={socialPresence.linkedin}
                />

                <SocialRow
                    title="Twitter"
                    value={socialPresence.twitter}
                />

            </Section>

            {/* Contact */}

            <Section title="Contact Options">

                <ContactRow
                    title="Phone"
                    value={contactOptions.phone}
                />

                <ContactRow
                    title="Email"
                    value={contactOptions.email}
                />

                <ContactRow
                    title="WhatsApp"
                    value={contactOptions.whatsapp}
                />

            </Section>

            {/* Trust */}

            <Section title="Trust Signals">

                <BooleanRow
                    title="Testimonials"
                    value={trustSignals.testimonials}
                />

                <BooleanRow
                    title="Client Logos"
                    value={trustSignals.clientLogos}
                />

                <BooleanRow
                    title="Awards"
                    value={trustSignals.awards}
                />

            </Section>

            {/* Marketing Tools */}

            <Section title="Marketing Tools">

                <ToolRow
                    title="HubSpot"
                    value={marketingTools.hubspot}
                />

                <ToolRow
                    title="Mailchimp"
                    value={marketingTools.mailchimp}
                />

                <ToolRow
                    title="Calendly"
                    value={marketingTools.calendly}
                />

            </Section>

            {/* Summary */}

            <Section title="Summary">

                <p className="text-zinc-300">

                    Tracking Score :
                    {" "}
                    {summary.trackingScore}

                </p>

                <p className="text-zinc-300">

                    Marketing Score :
                    {" "}
                    {summary.marketingScore}

                </p>

                <div className="mt-4">

                    <p className="mb-2 font-semibold text-white">

                        Missing

                    </p>

                    <ul className="list-disc space-y-1 pl-5 text-zinc-400">

                        {

                            summary.missing.map(item => (

                                <li key={item}>

                                    {item}

                                </li>

                            ))

                        }

                    </ul>

                </div>

            </Section>

            {/* AI */}

            <Section title="AI Opportunities">

                <ul className="list-disc space-y-2 pl-5 text-zinc-300">

                    {

                        aiOpportunities.opportunities.map(item => (

                            <li key={item}>

                                {item}

                            </li>

                        ))

                    }

                </ul>

            </Section>

        </div>

    );

}

function Section({

    title,

    children,

}) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-5 text-xl font-semibold text-white">

                {title}

            </h2>

            <div className="space-y-3">

                {children}

            </div>

        </div>

    );

}

function BooleanRow({

    title,

    value,

}) {

    const exists =
        typeof value === "object"
            ? value.exists
            : value;

    return (

        <div className="flex items-center justify-between">

            <span className="text-zinc-300">

                {title}

            </span>

            <span>

                {exists ? "✅" : "❌"}

            </span>

        </div>

    );

}

function SocialRow({

    title,

    value,

}) {

    return (

        <div className="flex items-center justify-between">

            <span className="text-zinc-300">

                {title}

            </span>

            <span>

                {value?.exists ? "✅" : "❌"}

            </span>

        </div>

    );

}

function ContactRow({

    title,

    value,

}) {

    return (

        <div className="flex items-center justify-between">

            <span className="text-zinc-300">

                {title}

            </span>

            <span>

                {value?.exists ? "✅" : "❌"}

            </span>

        </div>

    );

}

function ToolRow({

    title,

    value,

}) {

    return (

        <div className="flex items-center justify-between">

            <span className="text-zinc-300">

                {title}

            </span>

            <span>

                {value?.exists ? "✅" : "❌"}

            </span>

        </div>

    );

}

export default DigitalMarketingAnalysis;