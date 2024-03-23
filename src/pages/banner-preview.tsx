import { ChangeEvent, useState } from "react";
import { HeroBanner } from "../components/HeroBanner";
import clsx from "clsx";
import Layout from "@theme/Layout";

const BannerPreview = ({
  brandingColor,
  setBrandingColor,
  logo,
  name,
  summary,
  screenshot,
  isFullscreenApp,
  mode,
}: {
  brandingColor: string;
  setBrandingColor: (color: string) => void;
  logo: string;
  name: string;
  summary: string;
  screenshot: string;
  isFullscreenApp: boolean;
  mode: "Dark" | "Light";
}) => {
  return (
    <div
      className={clsx(
        "space-y-4 p-4",
        mode === "Dark" ? "rounded-b-md" : "rounded-t-md",
        mode === "Dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="flex flex-col gap-2">
        <label
          className="font-semibold"
          htmlFor="brandingColor"
        >{`${mode} Branding Color`}</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            id="brandingColor"
            name="brandingColor"
            className="cursor-pointer"
            value={brandingColor}
            onChange={(e) => setBrandingColor(e.target.value)}
          />
          <span className="">{brandingColor}</span>
        </div>
      </div>
      <HeroBanner
        theme={mode === "Dark" ? "dark" : "light"}
        brandingColor={brandingColor}
        logo={logo}
        name={name}
        summary={summary}
        screenshot={screenshot}
        isFullscreenApp={isFullscreenApp}
      />
    </div>
  );
};

function BannerPreviewPage() {
  const [name, setName] = useState<string>("Name");
  const [summary, setSummary] = useState<string>("Summary");

  const [logo, setLogo] = useState<string>();
  const [screenshot, setScreenshot] = useState<string>();

  const [isFullscreenApp, setIsFullscreenApp] = useState<boolean>(false);

  const [brandingColorLight, setBrandingColorLight] =
    useState<string>("#af7faf");

  const [brandingColorDark, setBrandingColorDark] = useState<string>("#a599a5");

  function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
    setLogo(URL.createObjectURL(e.target.files[0]));
  }

  function handleScreenshotChange(e: ChangeEvent<HTMLInputElement>) {
    setScreenshot(URL.createObjectURL(e.target.files[0]));
  }

  const code = `<branding>
  <color type="primary" scheme_preference="light">${brandingColorLight}</color>
  <color type="primary" scheme_preference="dark">${brandingColorDark}</color>
</branding>`;

  return (
    <Layout title="Brand color preview" description="Preview your brand color">
      <div className="flex flex-col max-w-11/12 mx-auto my-4 w-11/12 2xl:w-[1400px] 2xl:max-w-[1400px]">
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="rounded-md dark:bg-[#1f1f1f]"
              name="name"
              placeholder="Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="summary">
              Summary
            </label>
            <input
              type="text"
              id="summary"
              className="rounded-md dark:bg-[#1f1f1f]"
              name="summary"
              placeholder="Summary"
              defaultValue={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="logo">
                  Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/png, image/svg+xml"
                  onChange={(e) => handleLogoChange(e)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="screenshot">
                  Screenshot
                </label>
                <input
                  type="file"
                  id="screenshot"
                  name="screenshot"
                  accept="image/png"
                  onChange={(e) => handleScreenshotChange(e)}
                />
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="isFullscreenApp"
                  className="rounded-sm ring-black dark:ring-white ring-1 dark:bg-transparent"
                  name="isFullscreenApp"
                  checked={isFullscreenApp}
                  onChange={(e) => setIsFullscreenApp(e.target.checked)}
                />
                <label htmlFor="isFullscreenApp">Is Fullscreen App</label>
              </div>
            </div>

            <pre className="rounded-2xl border p-4">
              <code className="prose dark:prose-invert whitespace-break-spaces">
                {code}
              </code>
            </pre>
          </div>
        </div>

        <BannerPreview
          brandingColor={brandingColorLight}
          setBrandingColor={setBrandingColorLight}
          logo={logo}
          name={name}
          summary={summary}
          screenshot={screenshot}
          isFullscreenApp={isFullscreenApp}
          mode="Light"
        />

        <BannerPreview
          brandingColor={brandingColorDark}
          setBrandingColor={setBrandingColorDark}
          logo={logo}
          name={name}
          summary={summary}
          screenshot={screenshot}
          isFullscreenApp={isFullscreenApp}
          mode="Dark"
        />
      </div>
    </Layout>
  );
}

export default BannerPreviewPage;
