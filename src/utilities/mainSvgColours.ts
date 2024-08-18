import { ref } from "vue";

function chromatic(starting: number[], count: number) {
  const values = [];
  for (let i = 0; i < count; i++) {
    values.push([starting[0], starting[1], starting[2] + ((100 - starting[2]) * i) / count]);
  }
  return values.reverse();
}

// const testTimes = timeBounds.map((hour) => new Date(2024, 31, 10, hour));
// let mockNow = new Date();

// type a = (typeof groundColourBounds)["length"];
// type b = (typeof bounds)["length"];

const colourThemeSensitivity = 60 * 1000; // 1 minute
const circleCount = 8;

const woodColour = ref([256, 50, 50]);
const leafColour = ref([256, 50, 50]);
const circleColours = ref(chromatic([256, 40, 40], 6));
const groundColour = ref([0, 0, 0]);

const timeBounds = [1, 6, 10, 14, 18, 23] as const;
type ColourBounds = { [key in (typeof timeBounds)[number]]: number[] };

const woodColourBounds: ColourBounds = {
  1: [212, 100, 93],
  6: [212, 100, 93],
  10: [0, 65, 7],
  14: [0, 68, 18],
  18: [0, 68, 18],
  23: [212, 100, 93],
};

const leafColourBounds: ColourBounds = {
  1: [117, 100, 73],
  6: [118, 98, 50],
  10: [118, 93, 23],
  14: [117, 100, 73],
  18: [117, 100, 73],
  23: [117, 100, 73],
};

const circleColoursBounds: { [key in keyof ColourBounds]: number[][] } = {
  1: chromatic([250, 35, 0], circleCount).reverse(),
  6: chromatic([270, 54, 18], circleCount),
  10: chromatic([13, 100, 60], circleCount),
  14: chromatic([176, 80, 18], circleCount).reverse(),
  18: chromatic([13, 100, 60], circleCount),
  23: chromatic([270, 54, 18], circleCount),
};

const groundColourBounds: ColourBounds = {
  1: [255, 100, 0],
  6: [0, 0, 0],
  10: [0, 41, 45],
  14: [60, 41, 90],
  18: [0, 41, 45],
  23: [0, 0, 0],
};

function colourChanging() {
  (
    [
      [groundColour, groundColourBounds],
      [woodColour, woodColourBounds],
      [leafColour, leafColourBounds],
    ] as const
  ).forEach(([colour, colourBound]) => {
    colour.value = calcValue(colourBound);
  });

  const entries = Object.entries(circleColoursBounds);
  circleColours.value = Array.from({ length: circleCount }, (_, i) => {
    const circleBound = entries.map((entry) => [entry[0], entry[1][i]]);
    return calcValue(Object.fromEntries(circleBound));
  });
}

function calcValue(_bounds: ColourBounds) {
  const now = new Date();
  // mockNow = new Date(mockNow.getTime() + 1000 * 60);
  // mockNow = testTimes[7];
  // const now = mockNow;
  let timeUpperIndex = timeBounds.findIndex((value) => value > now.getHours()) ?? 0;
  if (timeUpperIndex < 0) timeUpperIndex = 0;
  const timeUpperBound = timeBounds[timeUpperIndex];
  const timeLowerBound = timeBounds.at(timeUpperIndex - 1)!;

  let timeRange = timeUpperBound - timeLowerBound;
  let hoursUntilEndBound = timeUpperBound - now.getHours() - now.getMinutes() / 60;

  // I.e. changing date
  if (timeRange < 0) timeRange += 24;
  if (hoursUntilEndBound < 0) hoursUntilEndBound += 24;

  return _bounds[timeUpperBound];
}

function startColourChangingInterval(): ReturnType<typeof setInterval> {
  colourChanging();
  return setInterval(colourChanging, colourThemeSensitivity);
}

export { startColourChangingInterval, woodColour, leafColour, circleColours, groundColour };
