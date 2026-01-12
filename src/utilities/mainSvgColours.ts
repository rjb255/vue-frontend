import { SPEED_UP } from "@/config";
import { ref } from "vue";

function chromatic(starting: number[], count: number, light: boolean = true) {
  const values = [];
  for (let i = 0; i < count; i++) {
    const lVal = light
      ? starting[2] + ((100 - starting[2]) * i) / count
      : starting[2] - (starting[2] / count) * i;
    values.push([starting[0], starting[1], lVal]);
  }
  return values.reverse();
}

const colourThemeSensitivity = SPEED_UP ? 10 : 1000 * 60; // 1 minute
const circleCount = 8;

const woodColour = ref([256, 50, 50]);
const leafColour = ref([256, 50, 50]);
const sunCircleColours = ref(chromatic([256, 40, 40], 6));
const moonCircleColours = ref(chromatic([256, 40, 40], 6));
const circleColours = ref(chromatic([256, 40, 40], 6));
const groundColour = ref([0, 0, 0]);

type ColourBounds = { [key: number]: number[] };

const woodColourBounds: ColourBounds = {
  6: [212, 100, 93],
  10: [0, 65, 7],
  14: [0, 68, 18],
  18: [0, 68, 18],
};

const leafColourBounds: ColourBounds = {
  1: [117, 100, 73],
  6: [118, 98, 50],
  10: [118, 93, 23],
};

const circleColoursBounds: { [key in keyof ColourBounds]: number[][] } = {
  1: chromatic([250, 35, 0], circleCount),
  6: chromatic([250, 54, 80], circleCount, false),
  10: chromatic([200, 100, 24], circleCount, false).reverse(),
  14: chromatic([67, 100, 18], circleCount),
  18: chromatic([13, 100, 60], circleCount),
  23: chromatic([270, 54, 18], circleCount).reverse(),
};
const moonColoursBounds: { [key in keyof ColourBounds]: number[][] } = {
  1: chromatic([250, 35, 0], circleCount),
  6: chromatic([250, 54, 80], circleCount, false),
  10: chromatic([200, 100, 24], circleCount, false).reverse(),
  14: chromatic([67, 100, 18], circleCount),
  18: chromatic([240, 30, 80], circleCount, false).reverse(),
  23: chromatic([270, 54, 18], circleCount).reverse(),
};
const sunColoursBounds: { [key in keyof ColourBounds]: number[][] } = {
  1: chromatic([10, 100, 5], circleCount, false),
  6: chromatic([270, 54, 18], circleCount, false),
  10: chromatic([200, 100, 60], circleCount).reverse(),
  14: chromatic([62, 80, 50], circleCount).reverse(),
  18: chromatic([13, 100, 60], circleCount),
  23: chromatic([270, 54, 18], circleCount, false).reverse(),
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
  let date = new Date();
  if (SPEED_UP) {
    date = new Date(2025, 10, 10, (new Date().getSeconds() / 60) * 24);
  }
  groundColour.value = getColourFromTime(date, groundColourBounds);
  woodColour.value = getColourFromTime(date, woodColourBounds);
  leafColour.value = getColourFromTime(date, leafColourBounds);
  circleColours.value = getColourFromTime(date, circleColoursBounds);
  moonCircleColours.value = getColourFromTime(date, moonColoursBounds);
  sunCircleColours.value = getColourFromTime(date, sunColoursBounds);
}

function startColourChangingInterval(): ReturnType<typeof setInterval> {
  colourChanging();
  return setInterval(colourChanging, colourThemeSensitivity);
}

function getColourFromTime<T>(time: Date, colourBounds: { [key: number]: T }) {
  const hr = time.getHours();
  for (const [key, bound] of Object.entries(colourBounds)) {
    if (hr < Number(key)) {
      return bound;
    }
  }
  return colourBounds[Number(Object.keys(colourBounds)[0])];
}

export {
  startColourChangingInterval,
  woodColour,
  leafColour,
  circleColours,
  moonCircleColours,
  sunCircleColours,
  groundColour,
};
