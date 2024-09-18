import { t } from "@lingui/macro";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@reactive-resume/ui";

import { useLocations } from "@/client/services/location/locations";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "./section-icon";

export const WorkStatusSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const workStatus = useResumeStore((state) => state.resume.data.workStatus);
  const { locations, loading } = useLocations();

  return (
    <section id="workStatus" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("workStatus")}
          <h2 className="line-clamp-1 text-3xl font-bold">{t`Work Status`}</h2>
        </div>
      </header>

      <main className="flex flex-col gap-4">

        <div className="flex items-center gap-4 sm:col-span-2">
          <Label htmlFor="workStatus.openToWork">{t`Open To Work`}</Label>
          <Switch
            id="workStatus.openToWork"
            checked={workStatus.openToWork}
            onCheckedChange={(checked) => {
              setValue("workStatus.openToWork", checked);
            }}
          />
        </div>

        {workStatus.openToWork && (
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="workStatus.pricing">{t`Expected Pricing`}</Label>
              <div className="relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:content-['$']">
                <Input
                  id="workStatus.pricing"
                  type={"number"}
                  className="text-right"
                  value={Number(workStatus.pricing).toString()}
                  onChange={(event) => {
                    setValue("workStatus.pricing", Number(event.target.value));
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="workStatus.jobType">{t`Job Type`}</Label>
              <Select
                value={workStatus.jobType}
                onValueChange={(value) => {
                  setValue("workStatus.jobType", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t`Please select a job type`} />
                </SelectTrigger>
                <SelectContent>
                  {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                  <SelectItem value="remote">Remote</SelectItem>
                  {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                  <SelectItem value="onsite">Onsite</SelectItem>
                  {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="workStatus.jobLocation">{t`Job Location`}</Label>
              <Select
                value={workStatus.jobLocation}
                onValueChange={(value) => {
                  setValue("workStatus.jobLocation", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t`Please select a job location`} />
                </SelectTrigger>
                <SelectContent>
                  {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                  {/* <SelectItem value="hanoi">Ha Noi</SelectItem> */}
                  {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                  {/* <SelectItem value="danang">Da Nang</SelectItem> */}
                  {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                  {/* <SelectItem value="tpHCM">Tp Ho Chi Minh</SelectItem> */}
                  {locations?.map((location) => (
                    <SelectItem value={location.name}>{location.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

      </main>
    </section>
  );
};
