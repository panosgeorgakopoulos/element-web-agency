import { createFileRoute } from "@tanstack/react-router";
import { AGENCY, STUDIOS } from "@/data/site";
import { useLocalTime } from "@/hooks/useLocalTime";
import { Magnetic } from "@/components/elementweb/Magnetic";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Element Web" },
      {
        name: "description",
        content: "Begin a project with Element Web. We respond to every brief within 48 hours.",
      },
      { property: "og:title", content: "Contact — Element Web" },
      {
        property: "og:description",
        content: "Begin a project with Element Web. We respond within 48 hours.",
      },
    ],
  }),
  component: ContactPage,
});

type FormValues = {
  name: string;
  email: string;
  budget: string;
  project: string;
  message: string;
};

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      budget: "$500 – $1000",
      project: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "4592b27e-5c27-42fa-9dfe-59819eb1b2f2",
          ...data,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Message sent successfully. We will get back to you soon.");
        reset();
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="pb-24 pt-32 md:pt-44">
      <header className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          Index — Begin
        </p>
        <h1 className="mt-6 font-display text-[16vw] font-semibold leading-[0.85] tracking-[-0.04em] md:text-[12vw]">
          Let's <span className="text-silver">talk</span><span className="text-primary">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground">
          Tell us what you're building. We respond to every brief within 48 hours — even the ones we can't take on.
        </p>
      </header>

      <section className="mx-auto mt-24 grid max-w-[1600px] gap-16 px-5 md:grid-cols-12 md:px-10">
        <form
          className="md:col-span-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-8">
            <Field label="Name" type="text" {...register("name", { required: true })} />
            <Field label="Email" type="email" {...register("email", { required: true })} />
            <SelectField
              label="Budget"
              options={["< $500", "$500 – $1000", "$1000 – $1500", "$1500 – $2000", "$2000+"]}
              register={register("budget")}
            />
            <Field label="Project" type="text" placeholder="One sentence is enough" {...register("project")} />
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Brief
              </label>
              <textarea
                rows={5}
                className="mt-3 w-full resize-none border-b border-border bg-transparent py-3 text-lg text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Goals, timeline, links — whatever's useful."
                {...register("message", { required: true })}
              />
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              End-to-end encrypted
            </span>
            <Magnetic strength={0.4}>
              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor-label="Send"
                className="group inline-flex items-center gap-4 rounded-full border border-primary/60 bg-primary/10 px-7 py-4 font-mono text-xs uppercase tracking-[0.28em] text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Brief"}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </button>
            </Magnetic>
          </div>
        </form>

        <aside className="md:col-span-4 md:col-start-9">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Direct</p>
            <a
              href={`mailto:${AGENCY.email}`}
              data-cursor="magnetic"
              className="mt-3 block font-display text-2xl text-foreground hover:text-primary"
            >
              {AGENCY.email}
            </a>
          </div>

          <div className="mt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Studios</p>
            <div className="mt-4 space-y-3">
              {STUDIOS.map((s) => (
                <StudioRow key={s.city} city={s.city} tz={s.tz} />
              ))}
            </div>
          </div>

        </aside>
      </section>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  ...rest
}: {
  label: string;
  type: string;
  placeholder?: string;
  [x: string]: any;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-border bg-transparent py-3 text-lg text-foreground outline-none transition-colors focus:border-primary"
        {...rest}
      />
    </div>
  );
}

function SelectField({
  label,
  options,
  register,
}: {
  label: string;
  options: string[];
  register: any;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" value={o} className="peer sr-only" {...register} />
            <span
              data-cursor="magnetic"
              className="block rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary"
            >
              {o}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function StudioRow({ city, tz }: { city: string; tz: string; }) {
  const t = useLocalTime(tz);
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
      <div>
        <div className="text-foreground">{city}</div>
      </div>
      <span className="font-mono text-sm text-primary">{t}</span>
    </div>
  );
}
