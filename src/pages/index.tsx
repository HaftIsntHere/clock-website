/*import puppeteer from "puppeteer-extra";
import adBlock from "puppeteer-extra-plugin-adblocker";*/

//puppeteer.use(adBlock());

/*const browser = await puppeteer.launch({
  headless: false,
  args: ["--window-position=-32000,-32000"],
});
const page = await browser.newPage();
const url = "https://time.is/tel aviv";
await page.goto(url.replace(/\s/g, "_"));

const clockContents = await page.evaluate(() => {
  const digits: number[] = [];
  let i = 1;
  while (i < 7) {
    const clockElement = document.querySelector(`#bcdigit${i}`);
    if (clockElement) digits.push(Number(clockElement.textContent) ?? "none");
    i++;
  }
  return digits ? digits : null;
});*/

interface CityTime {
  city: string;
  time: string;
  timezone: string;
}

export default function Home() {
  /*if (clockContents) {
    await page.close();
    await browser.close();
    let newContent =
      clockContents.join("").slice(0, 2) +
      ":" +
      clockContents.join("").slice(2, 4) +
      ":" +
      clockContents.join("").slice(4);
    if (newContent) {
      timer.update = () => {
        if (Number(newContent[7]) < 9) {
          const newNum = Number(newContent[7]) + 1;
          newContent = newContent.slice(0, 7) + newNum;
        } else {
          if (Number(newContent[6]) < 5) {
            const newNum = Number(newContent[6]) + 1;
            newContent = newContent.slice(0, 6) + newNum + "0";
          } else {
            if (Number(newContent[4]) < 9) {
              const newNum = Number(newContent[4]) + 1;
              newContent = newContent.slice(0, 4) + newNum + ":00";
            } else {
              if (Number(newContent[3]) < 5) {
                const newNum = Number(newContent[3]) + 1;
                newContent = newContent.slice(0, 3) + newNum + "0:00";
              } else {
                if (Number(newContent.slice(0, 2)) < 24) {
                  const newNum = Number(newContent.slice(0, 2)) + 1;
                  newContent = newNum + ":00:00";
                } else {
                  newContent = "00:00:00";
                }
              }
            }
          }
        }

        timer.text = newContent;
      };
    }

    // eslint-disable-next-line @typescript-eslint/unbound-method
    setInterval(timer.update, 1_000); // 1 minute

    //console.log(clockContents.join(""));
  } else {
    console.log("No <clock> element found on the page.");
  }*/
  const [got, setGot] = useState<boolean | false>(false);
  const [data, setData] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [res, setRes] = useState<boolean>(false);
  const [lastData, setLastData] = useState<string | undefined>();
  const [isBig, setBig] = useState<boolean>(false);

  function updateTime() {
    //console.log(data)
    // Split the timestamp into date and time parts
    let dataToSplit = time?.split("T") ?? data!.split("T");
    if (lastData !== data) {
      dataToSplit = data!.split("T");
      setLastData(data);
    }
    let [datePart, timePart] = dataToSplit;

    // Split the date part
    let [year, month, day] = datePart!.split("-").map(Number)!;

    // Split the time part
    let [hours, minutes, seconds] = timePart!.split(":");

    // Convert to numbers
    let sec = parseInt(seconds!);
    let min = parseInt(minutes!);
    let hr = parseInt(hours!);

    // Add one second
    sec++;

    // Handle carry-over
    if (sec >= 60) {
      sec = 0;
      min++;
      if (min >= 60) {
        min = 0;
        hr++;
        if (hr >= 24) {
          hr = 0;
          // Date rollover
          day!++;

          // Check for month/year rollover
          let daysInMonth = new Date(year!, month!, 0).getDate();
          if (day! > daysInMonth) {
            day = 1;
            month!++;
            if (month! > 12) {
              month = 1;
              year!++;
            }
          }
        }
      }
    }

    // Format back to string
    let newDatePart = `${year}-${month!.toString().padStart(2, "0")}-${day!.toString().padStart(2, "0")}`;

    // Format back to string
    let newTimePart = `${newDatePart}T${hr.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    //console.log(newTimePart);
    if (data === lastData) setLastData(data);
    setTime(newTimePart);
  }

  let id = setTimeout(() => {
    //console.log(data)
    if (data) updateTime();
  }, 1000);
  function inputChange(event: any) {
    console.log("change");
    const value = event.target.value;
    main(value).then((result) => {
      //console.log(result)
      clearTimeout(id);
      if (result === false) setRes(false);
      if (!result) return result;
      setData(result.time);
      setGot(true);
      setRes(true);
    });
  }

  function bigClock() {
    setBig(!isBig);
  }

  const text = !res ? "Not Found" : time?.split("T")[1]!.split(".")[0]!;
  return (
    <>
      <title>Clock Time</title>
      <meta name="description" content="Generated by create-t3-app" />
      <link rel="icon" href="/favicon.ico" />

      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#5c4cee] to-[#691c1c]">
        {isBig === false ? (
          <div className=" transition-all text-shadow select-none bg-gradient-to-tr from-red-500 to-amber-300 bg-clip-text pt-9 text-center font-sans text-7xl font-extrabold uppercase text-transparent">
          Date Time Viewer
        </div>
        ) : <div className="text-[0rem] transition-all text-shadow select-none bg-gradient-to-tr from-red-500 to-amber-300 bg-clip-text pt-9 text-center font-sans text-7xl font-extrabold uppercase text-transparent">
        Date Time Viewer
      </div>}
      <div className="absolute text-md top-1 left-1 text-white font-mono font-black">
        Made by <a href="https://youtube.com" className="text-blue-200">Haft</a> • <a href="https://youtube.com">Source code</a>
      </div>
        <div
          className="grid h-[70vh] grid-rows-3 place-items-center justify-center"
          id="timeZone"
        >
            {isBig === false ? (
              <input
              type="text"
              placeholder="Type your city here!"
              //onBlur={inputChange}
              //onSubmit={inputChange}
              onInput={inputChange}
              className="rounded-xl text-center font-sans font-extrabold transition-all hover:bg-white/90 hover:transition-all"
            ></input>) : (
              <input
              type="text"
              placeholder="Type your city here!"
              //onBlur={inputChange}
              //onSubmit={inputChange}
              onInput={inputChange}
              className="rounded-xl text-center font-sans font-extrabold hover:transition-all transition-all hover:bg-white/90 -translate-y-8"
            ></input>
            )}
          

          {isBig === false ? (
            <div
              className="select-none rounded-xl bg-white/10 p-4 font-sans text-[3rem] xl:text-[10rem] lg:text-[8rem] sm:text-[3rem] md:text-[5rem] font-black text-white transition-all hover:bg-white/20 hover:transition-all"
              onClick={bigClock}
            >
              {got ? text : ""}
            </div>
          ) : (
            <div
              className="select-none rounded-xl leading-none p-4 flex top-1/4 font-sans line-h text-[5rem] lg:text-[13rem] xl:text-[17rem] 2xl:text-[20rem]  sm:text-[5rem] md:text-[10rem]  font-black text-white transition-all hover:bg-white/10 bg-white/20 hover:transition-all"
              onClick={bigClock}
            >
              {got ? text : ""}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

import axios from "axios";
import fuzzysort from "fuzzysort";
import { useEffect, useState } from "react";

interface TimeData {
  dateTime: string;
  timeZone: string;
}

class FuzzyTimeSearch {
  private cities: string[];

  constructor(cities: string[]) {
    this.cities = cities;
  }

  async search(input: string): Promise<CityTime | null> {
    const results = fuzzysort.go(input, this.cities);

    if (results.length > 0) {
      const bestMatch = results[0]!.target;
      //console.log(bestMatch)
      try {
        const timeData = await this.fetchTime(bestMatch);
        //console.log(timeData)
        if (!timeData) return null;
        //console.log(timeData)
        return {
          city: bestMatch,
          time: timeData.dateTime,
          timezone: timeData.timeZone,
        };
      } catch (error) {
        console.error("Error fetching time:", error);
        return null;
      }
    } else {
      return null;
    }
  }

  private async fetchTime(city: string): Promise<TimeData | undefined> {
    let cities: string[] = (
      await axios.get("https://timeapi.io/api/timezone/availabletimezones")
    ).data;
    cities = cities.map((x) => x.toLowerCase());
    //console.log(cities)
    const name = cities.find((x) => x.includes(city));
    //console.log(name)
    if (!name) return;
    const response = await axios.get<TimeData>(
      `https://timeapi.io/api/time/current/zone?timeZone=${encodeURIComponent(name)}`,
    );
    return response.data;
  }
}

async function main(url: string) {
  const cities: string[] = (
    await axios.get("https://timeapi.io/api/timezone/availabletimezones")
  ).data.map((x: string) => x.split("/")[1]?.toLowerCase());
  const fuzzySearch = new FuzzyTimeSearch(cities);
  try {
    const result = await fuzzySearch.search(
      url.replace(" ", "_").toLowerCase(),
    );
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return null;
  }
}
