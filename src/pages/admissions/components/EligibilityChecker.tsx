import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { eligibilityRules, testOptions } from "@/mocks/admissions";

const educationOptions = [
  { value: "master", label: "Master's degree" },
  { value: "bachelor", label: "Bachelor's degree" },
  { value: "in-progress", label: "Currently studying / in progress" },
  { value: "none", label: "Pre-university only" },
];

export default function EligibilityChecker() {
  const [programmeId, setProgrammeId] = useState(eligibilityRules[0].id);
  const [education, setEducation] = useState("bachelor");
  const [experience, setExperience] = useState("2");
  const [test, setTest] = useState("CAT");

  const rule = useMemo(
    () => eligibilityRules.find((item) => item.id === programmeId) ?? eligibilityRules[0],
    [programmeId],
  );

  const years = Number(experience);
  const validYears = Number.isFinite(years) && years >= 0;

  const checks = useMemo(() => {
    const educationMet = education === "bachelor" || education === "master";
    const experienceMet = validYears && years >= rule.minExperience;
    const testMet = !rule.requiresTest || test !== "None";
    return [
      {
        id: "education",
        label: "Bachelor's degree or higher",
        met: educationMet,
        detail: educationMet
          ? "Your qualification meets the academic requirement."
          : "A completed bachelor's degree is required for this programme.",
      },
      {
        id: "experience",
        label:
          rule.minExperience > 0
            ? `At least ${rule.minExperience} years of work experience`
            : "Work experience",
        met: Boolean(experienceMet),
        detail:
          rule.minExperience > 0
            ? experienceMet
              ? `You have ${validYears ? years : 0} years, which clears the ${rule.minExperience}-year bar.`
              : `You need at least ${rule.minExperience} years; you entered ${validYears ? years : 0}.`
            : "Work experience is welcome but not mandatory for this programme.",
      },
      {
        id: "test",
        label: rule.requiresTest ? "Valid entrance test score" : "Entrance test",
        met: testMet,
        detail: rule.requiresTest
          ? testMet
            ? `You selected ${test}, which is accepted.`
            : "Select the entrance test you have taken to confirm your eligibility."
          : "No entrance test is required for this programme.",
      },
    ];
  }, [education, experience, rule, test, validYears, years]);

  const metCount = checks.filter((check) => check.met).length;
  const eligible = metCount === checks.length;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="rounded-lg border border-background-200 bg-background-50 p-6 md:p-7">
          <h3 className="font-heading text-lg text-foreground-950">Tell us about yourself</h3>
          <p className="mt-2 text-sm text-foreground-600">
            A quick check — nothing is stored, and nothing is submitted anywhere.
          </p>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-foreground-800">Programme of interest</span>
              <select
                value={programmeId}
                onChange={(event) => setProgrammeId(event.target.value)}
                className="mt-2 w-full cursor-pointer rounded-md border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {eligibilityRules.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-800">Highest qualification completed</span>
              <select
                value={education}
                onChange={(event) => setEducation(event.target.value)}
                className="mt-2 w-full cursor-pointer rounded-md border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {educationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-800">Years of full-time work experience</span>
              <input
                type="number"
                min={0}
                max={50}
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                className="mt-2 w-full rounded-md border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-800">
                {rule.requiresTest ? "Entrance test taken" : "Entrance test (not required here)"}
              </span>
              <select
                value={test}
                onChange={(event) => setTest(event.target.value)}
                className="mt-2 w-full cursor-pointer rounded-md border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {testOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-6 flex items-start gap-2 rounded-md bg-background-100 p-4 text-xs leading-relaxed text-foreground-600">
            <i className="ri-information-line mt-0.5 text-accent-600" />
            {rule.note}
          </p>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div
          className={`rounded-lg border p-6 md:p-7 ${
            eligible ? "border-secondary-300 bg-secondary-100/60" : "border-background-200 bg-background-100"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-foreground-500">
                Your result
              </span>
              <h3 className="mt-2 font-heading text-2xl text-foreground-950">
                {eligible ? "Looks like a good fit" : "Not quite there yet"}
              </h3>
            </div>
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${
                eligible ? "bg-secondary-500 text-background-50" : "bg-background-200 text-foreground-500"
              }`}
            >
              <i className={`${eligible ? "ri-checkbox-circle-line" : "ri-error-warning-line"} text-2xl`} />
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-foreground-600">
            {eligible
              ? `You appear to meet the published criteria for ${rule.label}. Continue with your application to be considered.`
              : `You currently meet ${metCount} of ${checks.length} criteria for ${rule.label}. See what needs attention below.`}
          </p>

          <ul className="mt-6 space-y-3">
            {checks.map((check) => (
              <li
                key={check.id}
                className="flex items-start gap-3 rounded-lg border border-background-200 bg-background-50 p-4"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    check.met ? "bg-secondary-500 text-background-50" : "bg-accent-100 text-accent-900"
                  }`}
                >
                  <i className={`${check.met ? "ri-check-line" : "ri-close-line"} text-sm`} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground-900">{check.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-600">{check.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/programmes"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
            >
              Explore programmes
              <i className="ri-arrow-right-line text-base" />
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 bg-background-50 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
            >
              Compare options
              <i className="ri-scales-3-line text-base" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}